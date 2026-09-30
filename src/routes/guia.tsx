import { createFileRoute, Outlet } from "@tanstack/react-router";

// Layout da seção /guia: só existe porque guia.index.tsx (venda) e
// guia.obrigado.tsx (pós-compra) precisam de um ancestral comum no
// roteamento por arquivo. Sem o <Outlet /> aqui, /guia/obrigado renderizava
// o conteúdo de /guia em vez do seu próprio (o título da aba ficava certo,
// vindo do head da rota filha, mas o corpo da página era o errado).
export const Route = createFileRoute("/guia")({
  component: Outlet,
});
