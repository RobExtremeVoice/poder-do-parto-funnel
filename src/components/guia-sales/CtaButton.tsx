import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CtaButtonProps = {
  children?: React.ReactNode;
  className?: string;
  size?: "md" | "lg";
  label?: string;
};

export const CHECKOUT_URL =
  "https://pay.hotmart.com/L106951951S?off=n58qbcio&bid=1790046431759";

/** Botão principal de conversão, usado em todos os blocos de CTA. */
export function CtaButton({
  children = (
    <>
      <span className="block text-xs font-bold tracking-[0.22em] opacity-90">SIM!</span>
      <span className="block">QUERO MEU GUIA AGORA</span>
    </>
  ),
  className,
  size = "lg",
  label = "Quero meu guia agora",
}: CtaButtonProps) {
  return (
    <a
      href={CHECKOUT_URL}
      aria-label={label}
      className={cn(
        "group inline-flex w-full max-w-md items-center justify-center gap-3 rounded-full bg-brand-gradient text-center font-bold uppercase leading-tight text-brand-foreground shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 active:translate-y-0",
        size === "lg" ? "min-h-16 px-8 py-4 text-base sm:text-lg" : "min-h-12 px-6 py-3 text-sm",
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}
