import {
  AlertTriangle,
  BadgeCheck,
  Baby,
  ClipboardList,
  HeartHandshake,
  Languages,
  MessageCircleQuestion,
  NotebookPen,
  Search,
  Smartphone,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import capaLivro from "@/assets/guia/capa-livro.jpeg.asset.json";
import { Reveal } from "../Reveal";
import { CtaButton } from "../CtaButton";

const pillars = [
  { icon: ClipboardList, text: "18 perguntas organizadas em 4 blocos da gestação ao pós-parto" },
  { icon: MessageCircleQuestion, text: "Exemplos de resposta alinhada às boas práticas" },
  { icon: AlertTriangle, text: "Sinais de atenção que merecem uma conversa mais profunda" },
  { icon: Search, text: "O que perguntar em seguida quando a resposta for vaga" },
  { icon: NotebookPen, text: "Espaço para anotar as respostas de cada consulta" },
  { icon: Smartphone, text: "Abre no celular, na própria sala de espera" },
];

const topics = [
  {
    icon: HeartHandshake,
    title: "Bloco 1 · Escolha da equipe",
    text: "Como o profissional enxerga parto normal, cesárea, doula e plano de parto — inclusive a taxa de cesárea dele.",
  },
  {
    icon: Stethoscope,
    title: "Bloco 2 · Condutas e decisões",
    text: "Indução, bolsa rota, tempo de espera, comer e beber no trabalho de parto e analgesia.",
  },
  {
    icon: ClipboardList,
    title: "Bloco 3 · Durante o parto",
    text: "Posições, como fazer força, episiotomia e o momento do clampeamento do cordão.",
  },
  {
    icon: Baby,
    title: "Bloco 4 · Nascimento e pós-parto",
    text: "Pele a pele na primeira hora, presença do acompanhante e como as decisões são tomadas em uma intercorrência.",
  },
];

const answerKeys = [
  {
    icon: BadgeCheck,
    title: "Alinhada às boas práticas",
    text: "Você reconhece na hora quando a resposta mostra uma abordagem atualizada.",
  },
  {
    icon: Search,
    title: "Vale investigar mais",
    text: "Respostas vagas do tipo “depende de cada caso” — com o que pedir em seguida.",
  },
  {
    icon: AlertTriangle,
    title: "Sinal de atenção",
    text: "Frases que indicam que aquele ponto precisa de conversa antes de você decidir.",
  },
];

const benefits = [
  "Entender como o seu obstetra realmente trabalha — antes do dia do parto.",
  "Perceber respostas vagas e saber exatamente o que perguntar depois.",
  "Escolher (ou trocar) a sua equipe com informação, não com achismo.",
  "Chegar à consulta com as perguntas prontas, mesmo com 10 minutos.",
  "Registrar as respostas e comparar profissionais com calma em casa.",
  "Reduzir o risco de intervenções desnecessárias e de violência obstétrica.",
];


export function SolutionInside() {
  return (
    <>
      <section className="bg-background py-14 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] bg-brand-soft p-4 shadow-lift sm:p-8">
              <img
                src={capaLivro.url}
                alt="Capa do guia 18 perguntas para fazer ao obstetra, de Dra. Mariana Betioli"
                width={1129}
                height={1412}
                loading="lazy"
                className="w-full rounded-2xl object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-accent">
              <Sparkles className="size-3.5" aria-hidden="true" /> A solução
            </span>
            <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-[2.6rem]">
              O guia que diz o que perguntar — e como interpretar a resposta.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Sem teoria. Sem enciclopédia de 300 páginas sobre gravidez. São 18 perguntas para você
              entender como o profissional trabalha, aprofundar respostas vagas e escolher sua
              equipe com informação — cada uma com exemplos de resposta comentados.
            </p>

            <ul className="mt-8 space-y-4">
              {pillars.map((p) => (
                <li key={p.text} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand-accent">
                    <p.icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-base font-medium">{p.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <CtaButton />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-brand-soft py-14 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold leading-tight sm:text-[2.5rem]">
              O que tem dentro do guia
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-secondary-foreground sm:text-lg">
              Quatro blocos. Dezoito perguntas. Todas escritas para serem feitas em menos de um
              minuto — e todas com exemplos de resposta comentados.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5">
            {topics.map((t, i) => (
              <Reveal key={t.title} delay={(i % 2) * 0.06}>
                <article className="glass-card h-full rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-7">
                  <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-brand-gradient text-brand-foreground sm:size-12">
                    <t.icon className="size-5 sm:size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold sm:mt-5 sm:text-lg">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:mt-2">
                    {t.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <p className="mx-auto mt-12 max-w-2xl text-center font-display text-xl font-semibold sm:mt-16 sm:text-2xl">
              E em cada pergunta você vê três tipos de resposta:
            </p>
          </Reveal>
          <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-5">
            {answerKeys.map((a, i) => (
              <Reveal key={a.title} delay={(i % 3) * 0.06}>
                <div className="flex h-full items-start gap-3 rounded-2xl bg-background/80 p-4 shadow-soft backdrop-blur sm:flex-col sm:gap-3 sm:p-6">
                  <a.icon className="mt-0.5 size-5 shrink-0 text-brand-accent" aria-hidden="true" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold sm:text-base">{a.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      <section className="bg-background py-14 sm:py-28">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold leading-tight sm:text-[2.5rem]">
              O que muda de verdade para você
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal as="li" key={b} delay={(i % 2) * 0.06}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-success text-[oklch(1_0_0)]">
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
                      <path
                        d="m5 13 4 4L19 7"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <p className="text-base font-medium leading-snug">{b}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1}>
            <div className="mt-12 flex justify-center">
              <CtaButton />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
