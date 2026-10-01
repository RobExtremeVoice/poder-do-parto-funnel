// Footer padrão do site, usado em todas as páginas de venda/funil.
// Fonte original: /oferta — ver histórico de commits se precisar comparar.
const FOOTER_LOGO = "/media/aula-offer/d9f30f85-8b33-43a6-8f83-90883a241efd-logo-o-poder-do-parto-white.png";

export function SiteFooter() {
  return (
    <footer className="bg-foreground px-4 pb-32 pt-12 text-background/70 md:px-8 lg:pb-12">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <img
            src={FOOTER_LOGO}
            alt="O Poder do Parto"
            width={1600}
            height={531}
            className="h-10 w-auto object-contain"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Educação para uma experiência de nascimento mais consciente, respeitosa e informada.
          </p>
        </div>
        <div>
          <p className="font-bold text-background">Atendimento</p>
          <p className="mt-3 text-sm">Suporte: atendimento@poderdoparto.com.br</p>
          <p className="mt-2 text-sm">Dados cadastrais e CNPJ: consulte no checkout</p>
        </div>
        <div>
          <p className="font-bold text-background">Informações legais</p>
          <div className="mt-3 flex gap-4 text-sm">
            <a href="https://www.poderdoparto.com.br/termos" className="underline">
              Termos de Uso
            </a>
            <a href="https://www.poderdoparto.com.br/privacidade" className="underline">
              Política de Privacidade
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-background/15 pt-7 text-xs leading-relaxed">
        <p>
          O conteúdo possui finalidade educacional e não substitui consultas, diagnóstico,
          orientação ou acompanhamento de profissionais de saúde. © 2026 O Poder do Parto. Todos
          os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
