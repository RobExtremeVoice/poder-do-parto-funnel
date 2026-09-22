import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logoBranca from "@/assets/guia/logo-branca.png.asset.json";
import { Reveal } from "../Reveal";
import { CtaButton } from "../CtaButton";
import { FAQS } from "../data";

export function FaqFinal() {
  return (
    <>
      <section className="bg-background py-14 sm:py-28">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold leading-tight sm:text-[2.5rem]">
              Dúvidas antes de começar a perguntar
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Accordion type="single" collapsible className="mt-12 w-full space-y-3">
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`item-${i}`}
                  className="rounded-2xl border border-border bg-card px-5 shadow-soft"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-gradient py-20 text-brand-foreground sm:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <Reveal>
            <img
              src={logoBranca.url}
              alt="O Poder do Parto"
              width={320}
              height={116}
              loading="lazy"
              className="mx-auto h-14 w-auto"
            />
            <h2 className="mt-8 text-3xl font-semibold leading-tight sm:text-[2.6rem]">
              A sua próxima consulta está chegando. Você decide como vai sair dela.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed opacity-95 sm:text-lg">
              Com os mesmos dez minutos, o mesmo médico e a mesma sala de espera — mas com 18
              perguntas na mão, um checklist na pasta e a certeza de que nada importante ficou por
              dizer. É isso que R$27 compram hoje.
            </p>
            <div className="mt-10 flex justify-center">
              <CtaButton className="bg-[oklch(1_0_0)] bg-none text-brand" />
            </div>
            <p className="mt-4 text-sm opacity-90">
              Acesso imediato · garantia de 7 dias · leia hoje no celular
            </p>
          </Reveal>
        </div>
      </section>

      <footer className="bg-background py-10">
        <div className="mx-auto max-w-3xl px-5 text-center text-xs leading-relaxed text-muted-foreground">
          <p>
            Este guia é material educativo e não substitui consulta, diagnóstico ou tratamento
            médico. Siga sempre as orientações do seu obstetra.
          </p>
          <p className="mt-3">
            © {new Date().getFullYear()} O Poder do Parto · Dra. Mariana Betioli · Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
