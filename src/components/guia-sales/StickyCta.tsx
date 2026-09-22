import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { CtaButton } from "./CtaButton";

/** Barra de compra flutuante que aparece após a dobra e acompanha a rolagem. */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="glass-card mx-auto mb-[max(0.75rem,env(safe-area-inset-bottom))] flex max-w-3xl items-center gap-3 rounded-3xl px-3 py-3 sm:gap-4 sm:px-6">
        <div className="hidden min-w-0 flex-1 sm:block">
          <p className="truncate font-display text-lg font-semibold">18 Perguntas ao Obstetra</p>
          <p className="text-sm text-muted-foreground">
            <span className="line-through">R$97</span>{" "}
            <span className="font-bold text-brand-accent">R$27</span> · acesso imediato
          </p>
        </div>
        <div className="min-w-0 flex-1 sm:max-w-xs sm:flex-none">
          <CtaButton
            size="md"
            className="w-full max-w-none"
            label="Comprar o guia agora por R$27"
          >
            QUERO MEU GUIA — R$27
          </CtaButton>
          <p className="mt-1.5 text-center text-[0.7rem] font-medium text-muted-foreground sm:hidden">
            <span className="line-through">R$97</span>{" "}
            <span className="font-bold text-brand-accent">R$27</span> · garantia de 7 dias
          </p>
        </div>
        <Lock className="hidden size-5 shrink-0 text-success sm:block" aria-hidden="true" />
      </div>

    </div>
  );
}
