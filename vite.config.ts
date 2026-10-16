import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import type {Plugin} from 'vite';

// Serves api/mae.js during `npm run dev` (Vercel does this in production).
function maeApiDev(mode: string): Plugin {
  return {
    name: 'mae-api-dev',
    configureServer(server) {
      Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
      server.middlewares.use('/api/mae', (req, res) => {
        const chunks: Buffer[] = [];
        req.on('data', (c) => chunks.push(c));
        req.on('end', async () => {
          const mock = Object.assign(res, {
            status(code: number) { res.statusCode = code; return mock; },
            json(body: unknown) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(body));
            },
          });
          try {
            const {default: handler} = await server.ssrLoadModule('/api/mae.js');
            await handler(Object.assign(req, {body: Buffer.concat(chunks).toString()}), mock);
          } catch (error) {
            console.error(error);
            mock.status(500).json({success: false, message: 'Mae failed to start.'});
          }
        });
      });
    },
  };
}

export default defineConfig(({mode}) => {
  return {
    plugins: [react(), tailwindcss(), maeApiDev(mode)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // File watching is disabled to prevent flickering during automated edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
