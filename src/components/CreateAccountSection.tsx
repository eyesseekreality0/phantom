import React, { useState } from 'react';
import { KeyRound, Loader2, ShieldCheck, Wallet } from 'lucide-react';

type CreatedAccount = {
  username: string;
  password: string;
  credits: string;
};

export default function CreateAccountSection() {
  const [account, setAccount] = useState<CreatedAccount | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  interface CreatePlayerResponse {
    success: boolean;
    username?: string;
    password?: string;
    credits?: number | string;
    error?: string;
  }

  const handleCreate = async () => {
    setLoading(true);
    setError(null);
    setAccount(null);

    try {
      const response = await fetch('/.netlify/functions/create-player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let data: CreatePlayerResponse | null = null;
      try {
        data = await response.json();
      } catch {
        // Fallback for non-JSON responses (e.g. proxy errors)
        const text = await response.text();
        throw new Error(text || 'Unexpected response from server');
      }

      if (!response.ok || !data?.success) {
        throw new Error(data?.error || 'Request failed');
      }

      setAccount({
        username: data.username,
        password: data.password,
        credits: String(data.credits ?? '')
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to create account.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-black to-gray-950 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-200 text-sm font-medium mb-4">
            <ShieldCheck className="w-4 h-4 mr-2" />
            Automated Account Creation
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Get a Casino Account Instantly</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Generate a secure Ultrapanda player profile with one click. We will create
            a random username and password for you and load it with starting credits when configured.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3 text-white">
                <div className="p-3 rounded-xl bg-purple-600/20 border border-purple-500/30">
                  <KeyRound className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Step 1</p>
                  <p className="text-lg font-semibold">Provision your Ultrapanda login</p>
                </div>
              </div>
              <button
                onClick={handleCreate}
                disabled={loading}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/20 border border-purple-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-2" />
                    Get Casino Account
                  </>
                )}
              </button>
            </div>

            <div className="bg-black/40 border border-white/5 rounded-xl p-5 min-h-[180px]">
              {account ? (
                <div className="space-y-3">
                  <p className="text-sm text-green-400 font-semibold">Success! Save these credentials to log in.</p>
                  <div className="grid sm:grid-cols-2 gap-4 text-white">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-xs uppercase text-gray-400 mb-1">Username</p>
                      <p className="font-mono break-all">{account.username}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-xs uppercase text-gray-400 mb-1">Password</p>
                      <p className="font-mono break-all">{account.password}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:col-span-2">
                      <p className="text-xs uppercase text-gray-400 mb-1">Starting Credits</p>
                      <p className="font-semibold text-green-300">{account.credits}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  {loading ? 'Talking to Ultrapanda...' : 'Click the button above to create your casino account.'}
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 text-red-200 px-4 py-3 text-sm">
                {error}
              </div>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur space-y-4 text-gray-200">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-300" />
              How it works
            </h3>
            <ol className="space-y-3 list-decimal list-inside text-sm text-gray-300">
              <li>We call the secure Netlify function <code>create-player</code>.</li>
              <li>The function provisions a player on Ultrapanda using server-side secrets.</li>
              <li>Credentials and initial credits are returned to you instantly.</li>
            </ol>
            <p className="text-xs text-gray-400">
              Make sure your Netlify environment variables are set with the Ultrapanda values from your Network tab.
              They stay safe on the server and are never exposed to the browser.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
    </section>
  );
}
