import { Award, GraduationCap, Quote, Star, Users } from "lucide-react";
import autoraImg from "@/assets/guia/mariana-betioli.png.asset.json";
import { Reveal } from "../Reveal";

const credentials = [
  { icon: GraduationCap, text: "Obstetriz, doula e educadora perinatal" },
  { icon: Users, text: "Centenas de famílias acompanhadas na gestação e no parto" },
  { icon: Award, text: "Compromisso com informação baseada em evidências e parto respeitoso" },
];

const testimonials = [
  {
    name: "Marina R.",
    role: "32 semanas · São Paulo",
    text: "Imprimi o checklist e levei na consulta. Pela primeira vez meu médico parou, sentou e explicou tudo. Saí de lá chorando — do jeito bom.",
  },
  {
    name: "Juliana P.",
    role: "Primeira gestação · Recife",
    text: "A pergunta número 7 mudou todo o meu plano de parto. Eu nem sabia que podia perguntar aquilo, e minha obstetra ainda me agradeceu por trazer o assunto.",
  },
  {
    name: "Camila S.",
    role: "28 semanas · Belo Horizonte",
    text: "Eu saía de toda consulta me sentindo burra. Agora entro com o celular aberto e pergunto. Minha ansiedade caiu tanto que meu marido percebeu.",
  },
  {
    name: "Patrícia L.",
    role: "Segunda gestação · Curitiba",
    text: "Queria ter tido isso na primeira gravidez. Só a parte de sinais de alerta já me fez ir para a maternidade na noite certa.",
  },
  {
    name: "Aline M.",
    role: "38 semanas · Porto Alegre",
    text: "R$27 por algo que me deu segurança durante nove meses. O bônus da mala da maternidade sozinho já valeu o preço.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="size-4 fill-brand text-brand" aria-hidden="true" />
      ))}
    </div>
  );
}

export function AuthorityTestimonials() {
  return (
    <>
      <section className="bg-brand-soft py-14 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-5 md:grid-cols-[0.8fr_1.2fr] md:gap-14">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] shadow-lift">
              <img
                src={autoraImg.url}
                alt="Dra. Mariana Betioli, obstetriz, doula e educadora perinatal, autora do guia"
                width={294}
                height={300}
                loading="lazy"
                className="aspect-[4/5] w-full bg-card object-cover object-top"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-accent">
              Quem criou este guia
            </span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-[2.4rem]">
              Dra. Mariana Betioli
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-secondary-foreground sm:text-lg">
              <p>
                Sou Mari Betioli, há 19 anos trabalho com gestantes oferecendo assistência durante o
                pré-natal, parto, pós-parto e amamentação. Sou mãe de três filhos e apaixonada por
                ajudar mulheres a viverem partos transformadores.
              </p>
              <p>
                Já atuei como obstetriz no Brasil, Portugal e EUA, e já acompanhei centenas de
                partos em hospitais, casas de parto e partos domiciliares.
              </p>
              <p>
                Criei o Poder do Parto para estar com você, mesmo que à distância, te guiando e te
                preparando para viver o momento mais importante da sua vida com segurança, amor e
                confiança.
              </p>
            </div>
            <ul className="mt-7 space-y-4">
              {credentials.map((c) => (
                <li key={c.text} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-background text-brand-accent shadow-soft">
                    <c.icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium leading-snug sm:text-base">{c.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 font-display text-lg italic text-brand-accent">
              Informação para decidir. Confiança para viver.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold leading-tight sm:text-[2.5rem]">
              Mães que pararam de sair da consulta com dúvidas
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 0.06}>
                <figure className="glass-card flex h-full flex-col rounded-3xl p-7">
                  <Quote className="size-7 text-brand/40" aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                    “{t.text}”
                  </blockquote>
                  <figcaption className="mt-6 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2 border-t border-border pt-5">
                    <span
                      aria-hidden="true"
                      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-display text-lg font-semibold text-brand-foreground"
                    >
                      {t.name.charAt(0)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-semibold">{t.name}</span>
                      <span className="block truncate text-sm text-muted-foreground">{t.role}</span>
                    </span>
                    <span className="col-span-2">
                      <Stars />
                    </span>
                  </figcaption>

                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
