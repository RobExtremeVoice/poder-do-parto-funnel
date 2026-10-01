import { createServerFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";

// Domínios "vanity" que devem cair direto numa página específica do app.
const HOST_REDIRECTS: Record<string, string> = {
  "guia.poderdoparto.com.br": "https://www.poderdoparto.com.br/guia",
  "www.guia.poderdoparto.com.br": "https://www.poderdoparto.com.br/guia",
};

// Só pode rodar no servidor (getRequestHost lê o header Host da requisição).
export const resolveHostRedirect = createServerFn({ method: "GET" }).handler(async () => {
  return HOST_REDIRECTS[getRequestHost()] ?? null;
});
