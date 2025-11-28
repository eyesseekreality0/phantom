// netlify/functions/create-player.js

async function getFetch() {
  if (globalThis.fetch) {
    return globalThis.fetch;
  }

  try {
    const { default: nodeFetch } = await import("node-fetch");
    return nodeFetch;
  } catch (err) {
    const error = new Error("Fetch API is not available in this runtime.");
    error.statusCode = 500;
    error.cause = err;
    throw error;
  }
}

// Allow overriding the permitted front-end origin without code changes
const ALLOWED_ORIGIN =
  process.env.PUBLIC_SITE_ORIGIN || "https://phantomsfortune.netlify.app";

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

/**
 * Helper: generate a random username & password so players don't choose them.
 * You can change the patterns if you want.
 */
function generateUsername() {
  // e.g. pf_12345678
  const suffix = Math.floor(Math.random() * 1e8)
    .toString()
    .padStart(8, "0");
  return `pf_${suffix}`;
}

function generatePassword(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let pw = "";
  for (let i = 0; i < length; i++) {
    pw += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pw;
}

const BASE_URL = process.env.ULTRAPANDA_BASE_URL || "https://ht.ultrapanda.club";
const FINGERPRINT = process.env.ULTRAPANDA_FINGERPRINT;

// SavePlayer constants from your captured request
const SAVEPLAYER_SIGN = process.env.ULTRAPANDA_SAVEPLAYER_SIGN;
const SAVEPLAYER_STIME = Number(process.env.ULTRAPANDA_SAVEPLAYER_STIME);
const SAVEPLAYER_TOKEN = process.env.ULTRAPANDA_SAVEPLAYER_TOKEN;
const SAVEPLAYER_X_TOKEN = process.env.ULTRAPANDA_SAVEPLAYER_X_TOKEN;

// EnterScore constants from your captured request
const ENTERSIGN = process.env.ULTRAPANDA_ENTERSCORE_SIGN;
const ENTERSTIME = Number(process.env.ULTRAPANDA_ENTERSCORE_STIME);
const ENTERTOKEN = process.env.ULTRAPANDA_ENTERSCORE_TOKEN;
const ENTER_X_TOKEN = process.env.ULTRAPANDA_ENTERSCORE_X_TOKEN;

const REQUIRED_ENV_VARS = {
  ULTRAPANDA_BASE_URL: BASE_URL,
  ULTRAPANDA_FINGERPRINT: FINGERPRINT,
  ULTRAPANDA_SAVEPLAYER_SIGN: SAVEPLAYER_SIGN,
  ULTRAPANDA_SAVEPLAYER_STIME: SAVEPLAYER_STIME,
  ULTRAPANDA_SAVEPLAYER_TOKEN: SAVEPLAYER_TOKEN,
  ULTRAPANDA_SAVEPLAYER_X_TOKEN: SAVEPLAYER_X_TOKEN,
  ULTRAPANDA_ENTERSCORE_SIGN: ENTERSIGN,
  ULTRAPANDA_ENTERSCORE_STIME: ENTERSTIME,
  ULTRAPANDA_ENTERSCORE_TOKEN: ENTERTOKEN,
  ULTRAPANDA_ENTERSCORE_X_TOKEN: ENTER_X_TOKEN,
};

function validateEnv() {
  const missing = Object.entries(REQUIRED_ENV_VARS)
    .filter(([, value]) => value === undefined || value === null || value === "" || Number.isNaN(value))
    .map(([key]) => key);

  if (missing.length) {
    const message = `Missing required environment variables: ${missing.join(", ")}`;
    const error = new Error(message);
    error.statusCode = 500;
    throw error;
  }
}

// How many credits to give new players
const INITIAL_CREDITS =
  typeof process.env.ULTRAPANDA_INITIAL_CREDITS === "string"
    ? process.env.ULTRAPANDA_INITIAL_CREDITS
    : "0";

/**
 * Create a player on Ultrapanda, then optionally apply starting credits.
 */
async function createPlayerOnUltrapanda(fetchFn, account, password, credits) {
  // 1) Call /api/account/savePlayer
  const savePlayerBody = {
    sign: SAVEPLAYER_SIGN,
    stime: SAVEPLAYER_STIME,
    token: SAVEPLAYER_TOKEN,
    account,
    pwd: password,
    score: "0", // start with zero score; we'll add credits separately
    name: "",
    phone: "",
    tel_area_code: "",
    remark: "",
  };

  const savePlayerRes = await fetchFn(`${BASE_URL}/api/account/savePlayer`, {
    method: "POST",
    headers: {
      accept: "application/json, text/plain, */*",
      "content-type": "application/json;charset=UTF-8",
      "x-fingerprint": FINGERPRINT,
      "x-token": SAVEPLAYER_X_TOKEN,
      origin: BASE_URL,
      referer: `${BASE_URL}/`,
      cookie: "language=en",
    },
    body: JSON.stringify(savePlayerBody),
  });

  const savePlayerJson = await savePlayerRes.json().catch(() => ({}));

  if (!savePlayerRes.ok || savePlayerJson.code !== 20000) {
    throw new Error(
      `savePlayer failed: status ${savePlayerRes.status}, code=${savePlayerJson.code}, msg=${savePlayerJson.msg}`
    );
  }

  let enterScoreJson = null;

  // 2) Call /api/account/enterScore if credits > 0
  if (Number(credits) > 0) {
    const enterScoreBody = {
      sign: ENTERSIGN,
      stime: ENTERSTIME,
      token: ENTERTOKEN,
      account,
      score: String(credits),
      remark: "",
      user_type: "player",
    };

    const enterRes = await fetchFn(`${BASE_URL}/api/account/enterScore`, {
      method: "POST",
      headers: {
        accept: "application/json, text/plain, */*",
        "content-type": "application/json;charset=UTF-8",
        "x-fingerprint": FINGERPRINT,
        "x-token": ENTER_X_TOKEN,
        origin: BASE_URL,
        referer: `${BASE_URL}/`,
        cookie: "language=en",
      },
      body: JSON.stringify(enterScoreBody),
    });

    enterScoreJson = await enterRes.json().catch(() => ({}));

    if (!enterRes.ok || enterScoreJson.code !== 20000) {
      throw new Error(
        `enterScore failed: status ${enterRes.status}, code=${enterScoreJson.code}, msg=${enterScoreJson.msg}`
      );
    }
  }

  return {
    savePlayer: savePlayerJson,
    enterScore: enterScoreJson,
  };
}

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: "",
    };
  }

  // Only allow POST from your website
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
      headers: CORS_HEADERS,
    };
  }

  try {
    validateEnv();

    // Optional: allow a client to send "credits"; otherwise use default
    let requestedCredits = INITIAL_CREDITS;
    if (event.body) {
      try {
        const parsed = JSON.parse(event.body);
        if (parsed && parsed.credits != null) {
          requestedCredits = String(parsed.credits);
        }
      } catch {
        // ignore bad JSON, use default
      }
    }

    const username = generateUsername();
    const password = generatePassword();

    const fetchFn = await getFetch();

    const upstreamResult = await createPlayerOnUltrapanda(
      fetchFn,
      username,
      password,
      requestedCredits
    );

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        username,
        password,
        credits: requestedCredits,
        upstream: upstreamResult,
      }),
    };
  } catch (err) {
    console.error("create-player error:", err);

    return {
      statusCode: err.statusCode || 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        error: err.message || "Unknown error",
      }),
    };
  }
}
