import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Expose Supabase variables even when they are provided without the
  // VITE_ prefix (e.g., Netlify UI env vars). We still prefer VITE_
  // variables when present.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      'import.meta.env.SUPABASE_URL': JSON.stringify(env.SUPABASE_URL),
      'import.meta.env.SUPABASE_ANON_KEY': JSON.stringify(env.SUPABASE_ANON_KEY),
      'import.meta.env.SUPABASE_SERVICE_ROLE_KEY': JSON.stringify(
        env.SUPABASE_SERVICE_ROLE_KEY
      ),
    },
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      hmr: {
        overlay: false
      }
    }
  };
});