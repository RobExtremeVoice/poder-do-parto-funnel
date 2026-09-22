import { AlertTriangle, Brain, Clock, HeartCrack, ShieldOff, Timer } from "lucide-react";
import { Reveal } from "../Reveal";
import { CtaButton } from "../CtaButton";

const problems = [
  {
    icon: Clock,
    title: "As consultas são curtas",
    text: "A consulta média de pré-natal dura menos de 12 minutos. Pressão, altura uterina, uma olhada rápida nos exames — e a porta já está aberta de novo.",
  },
  {
    icon: Brain,
    title: "As respostas vêm vagas",
    text: "“Depende de cada caso.” “Na hora a gente vê.” “Eu faço os dois.” Você sai sem saber, de verdade, como aquele profissional conduz um parto.",
  },
  {
    icon: Timer,
    title: "Você só descobre no dia",
    text: "Taxa de cesárea, indução, episiotomia, doula, acompanhante, pele a pele. Muitas mulheres descobrem a posição real da equipe quando já estão em trabalho de parto.",
  },
];

const agitations = [
  { icon: AlertTriangle, label: "Cesárea marcada “por precaução”" },
  { icon: HeartCrack, label: "Plano de parto que ninguém leu" },
  { icon: ShieldOff, label: "Procedimentos que você nunca autorizou" },
  { icon: Brain, label: "Decisões tomadas sem você" },
];


export function ProblemAgitate() {
  return (
    <>
      <section className="bg-background py-14 sm:py-28">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold leading-tight sm:text-[2.6rem]">
              Escolher a equipe é a decisão mais importante da sua gestação — e quase ninguém sabe o
              que perguntar.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
              Você esperou três semanas por aqueles dez minutos. Ficou na sala de espera ensaiando o
              que dizer. E no caminho de volta percebeu: continua sem saber como esse profissional
              conduz um parto de verdade.
            </p>

          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {problems.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="glass-card h-full rounded-3xl p-7">
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand-accent">
                    <p.icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-soft py-14 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold leading-tight sm:text-[2.5rem]">
              O problema não é a pergunta esquecida. É tudo o que acontece no lugar dela.
            </h2>
            <div className="mx-auto mt-7 max-w-2xl space-y-4 text-base leading-relaxed text-secondary-foreground sm:text-lg">
              <p>
                Quando a resposta vaga passa batida, ela vira conduta no dia do parto. O “a gente vê
                na hora” vira indução sem indicação, episiotomia de rotina, acompanhante do lado de
                fora, bebê levado antes do primeiro contato.
              </p>
              <p className="font-semibold text-foreground">
                E então o parto acontece do jeito que outra pessoa decidiu.
              </p>
            </div>

          </Reveal>

          <ul className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
            {agitations.map((a, i) => (
              <Reveal as="li" key={a.label} delay={i * 0.06}>
                <div className="flex items-center gap-3 rounded-2xl bg-background/80 px-5 py-4 text-left shadow-soft backdrop-blur">
                  <a.icon className="size-5 shrink-0 text-brand-accent" aria-hidden="true" />
                  <span className="text-sm font-medium">{a.label}</span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <p className="mt-10 font-display text-xl font-semibold sm:text-2xl">
              Você não precisa virar médica. Você só precisa das perguntas certas.
            </p>
            <div className="mt-7 flex justify-center">
              <CtaButton />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
