import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const RESOURCES_ABS_PATH = resolve(__dirname, 'resources.js');

/**
 * Vite plugin that serves per-locale JSON assets instead of bundling all locale
 * translations into the JS bundle.
 *
 * Dev mode:  intercepts GET /locales/:locale/translation.json via ssrLoadModule
 *            so HMR works when locale files change.
 * Build mode: emits one JSON asset per locale into dist/locales/:locale/translation.json
 *             via generateBundle so they land in the output directory.
 */
export function localeJsonSplitPlugin() {
  return {
    name: 'locale-json-split',

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const match = req.url?.match(/^\/locales\/([^/?#]+)\/translation\.json/);
        if (!match) return next();

        const locale = decodeURIComponent(match[1]);
        try {
          // Load through Vite's SSR pipeline so HMR invalidation propagates
          const mod = await server.ssrLoadModule('/src/locales/resources.js');
          const localeData = mod.resources?.[locale];
          if (!localeData) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end('{}');
            return;
          }
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          });
          res.end(JSON.stringify(localeData.translation));
        } catch (err) {
          console.error('[locale-json-split] dev serve error:', err.message);
          res.writeHead(500);
          res.end();
        }
      });
    },

    async generateBundle() {
      // Use Node.js native ESM import — runs in the Rollup/Node.js process,
      // not in the browser bundle, so it's fine to import the full resources here.
      const { resources } = await import(pathToFileURL(RESOURCES_ABS_PATH).href);
      for (const [locale, { translation }] of Object.entries(resources)) {
        this.emitFile({
          type: 'asset',
          fileName: `locales/${locale}/translation.json`,
          source: JSON.stringify(translation)
        });
      }
    }
  };
}
