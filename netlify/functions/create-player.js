// netlify/functions/create-player.js
// AUTO TOKEN REFRESH ENABLED

const BASE_URL = process.env.ULTRAPANDA_BASE_URL;
const FINGERPRINT = process.env.ULTRAPANDA_FINGERPRINT;

async function getFreshToken() {
  const loginBody = {
    sign: process.env.ULTRAPANDA_LOGIN_SIGN,
    stime: Number(process.env.ULTRAPANDA_LOGIN_STIME),
    username: process.env.ULTRAPANDA_LOGIN_USERNAME,
    password: process.env.ULTRAPANDA_LOGIN_PASSWORD,
    auth_code: ""
  };

  const res = await fetch(`${BASE_URL}/api/user/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
      accept: "application/json, text/plain, */*",
      origin: BASE_URL,
      referer: BASE_URL + "/",
      "x-fingerprint": FINGERPRINT
    },
    body: JSON.stringify(loginBody)
  });

  const json = await res.json().catch(() => null);
  
  if (!res.ok || json.code !== 20000) {
    throw new Error("Login failed: " + JSON.stringify(json));
  }

  return json.token; // encoded token
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" }
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: { "Access-Control-Allow-Origin": "*" } };
  }

  try {
    // 1. Fetch fresh token
    const token = await getFreshToken();

    // 2. Process request
    const { account, password, initialScore, remark } = JSON.parse(event.body);

    if (!account || !password) throw new Error("Missing account/password");

    const commonHeaders = {
      accept: "application/json, text/plain, */*",
      "content-type": "application/json;charset=UTF-8",
      origin: BASE_URL,
      referer: BASE_URL + "/",
      "x-fingerprint": FINGERPRINT,
      "x-token": token
    };

    // 3. Create player
    const savePlayerRes = await fetch(`${BASE_URL}/api/account/savePlayer`, {
      method: "POST",
      headers: { ...commonHeaders, "x-time": Date.now().toString() },
      body: JSON.stringify({
        sign: process.env.ULTRAPANDA_SAVEPLAYER_SIGN,
        stime: Number(process.env.ULTRAPANDA_SAVEPLAYER_STIME),
        token: token,
        account,
        pwd: password,
        score: "0",
        remark
      })
    });

    const savePlayerJson = await savePlayerRes.json();

    if (!savePlayerRes.ok) throw new Error("savePlayer error");

    // 4. Credit starting score
    let enterScoreJson = null;
    if (initialScore > 0) {
      const enterScoreRes = await fetch(`${BASE_URL}/api/account/enterScore`, {
        method: "POST",
        headers: { ...commonHeaders, "x-time": Date.now().toString() },
        body: JSON.stringify({
          sign: process.env.ULTRAPANDA_ENTERSCORE_SIGN,
          stime: Number(process.env.ULTRAPANDA_ENTERSCORE_STIME),
          token: token,
          account,
          score: String(initialScore),
          remark,
          user_type: "player"
        })
      });
      enterScoreJson = await enterScoreRes.json();
    }

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        success: true,
        account,
        password,
        credited: initialScore,
        savePlayerResponse: savePlayerJson,
        enterScoreResponse: enterScoreJson,
        freshTokenUsed: token
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: error.message })
    };
  }
};
