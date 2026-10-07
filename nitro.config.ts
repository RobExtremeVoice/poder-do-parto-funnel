import { defineConfig } from "nitro/config";

// ISR nativo do Nitro para Vercel (vira uma Prerender Function lá).
// /oferta é igual para toda visitante (sem personalização) — serve do
// cache da borda e só roda o SSR de novo a cada 1h, sem mudar o modelo
// de rota (diferente do pages[].prerender do TanStack Start, que gera
// arquivos estáticos à parte e quebrou o roteamento em produção).
export default defineConfig({
  routeRules: {
    "/oferta": { isr: { expiration: 3600 } },
  },
});
