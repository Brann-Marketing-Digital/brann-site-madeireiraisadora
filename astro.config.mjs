// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// Site 100% estático (sem adapter) para GitHub Pages, com domínio próprio.
export default defineConfig({
  site: "https://madeireiraisadora.com.br",
  // Só definido no workflow enquanto o site roda na URL provisória do GitHub Pages.
  // @ts-ignore — `process` é do Node; o projeto não tem @types/node.
  base: process.env.BASE_PATH || "/",
  integrations: [icon()],
  vite: {
    plugins: [
      tailwindcss(),
      // O site é o public/index.html; no `astro dev` a raiz "/" passa pelo
      // roteador do Astro (sem páginas → 404), então serve o arquivo direto.
      {
        name: "raiz-public-index",
        configureServer(server) {
          server.middlewares.use((req, _res, next) => {
            if (req.url === "/" || req.url?.startsWith("/?")) {
              req.url = "/index.html" + req.url.slice(1);
            }
            next();
          });
        },
      },
    ],
  },
});
