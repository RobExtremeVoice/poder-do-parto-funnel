import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  LockKeyhole,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { createGhlLead } from "@/lib/ghl.functions";

const LOGO = "/media/quiz/logo-o-poder-do-parto.png";
const MARI = "/media/quiz/mari-betioli.webp";
const TESTIMONIAL_ONE = "/media/quiz/depoimento-aluna-1.jpg";
const TESTIMONIAL_TWO = "/media/quiz/depoimento-aluna-2.jpg";
const OFFER_PATH = "/aula-offer";
const STORAGE_KEY = "opp-quiz-state";

type Screen = "intro" | "quiz" | "preview" | "lead" | "result";
type Answer = { label: string; score: number };
type QuizState = { screen: Screen; current: number; answers: number[] };

type AnalyticsWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  fbq?: (action: string, event: string, data?: Record<string, unknown>) => void;
  gtag?: (action: string, event: string, data?: Record<string, unknown>) => void;
};

const questions: Array<{ question: string; answers: Answer[] }> = [
  { question: "Em que fase da gestação você está?", answers: ["Até 20 semanas", "De 21 a 30 semanas", "De 31 a 36 semanas", "37 semanas ou mais"].map((label, index) => ({ label, score: index + 1 })) },
  { question: "Quando pensa no parto, qual sentimento aparece primeiro?", answers: ["Confiança e tranquilidade", "Curiosidade, mas ainda tenho dúvidas", "Ansiedade ou insegurança", "Medo de perder o controle"].map((label, index) => ({ label, score: index + 1 })) },
  { question: "Você reconhece as fases do trabalho de parto?", answers: ["Sim, consigo explicar cada fase", "Conheço algumas", "Já ouvi falar, mas confundo", "Ainda não conheço"].map((label, index) => ({ label, score: index + 1 })) },
  { question: "Seu acompanhante sabe como apoiar você?", answers: ["Sim, estamos preparados juntos", "Sabe um pouco, mas precisa aprender mais", "Ainda não conversamos sobre isso", "Não sei quem será meu acompanhante"].map((label, index) => ({ label, score: index + 1 })) },
  { question: "Você já definiu suas preferências para o parto?", answers: ["Sim, tenho um plano de parto", "Tenho ideias, mas nada organizado", "Ainda não sei quais escolhas existem", "Prefiro decidir somente na hora"].map((label, index) => ({ label, score: index + 1 })) },
  { question: "Como está sua compreensão sobre intervenções?", answers: ["Conheço e sei o que perguntar", "Conheço as principais", "Tenho muitas dúvidas", "Ainda não estudei esse tema"].map((label, index) => ({ label, score: index + 1 })) },
  { question: "O que mais ajudaria você neste momento?", answers: ["Um passo a passo organizado", "Diminuir o medo e fortalecer a mente", "Preparar meu acompanhante", "Ter apoio para dúvidas específicas"].map((label, index) => ({ label, score: index + 1 })) },
  { question: "Quanto tempo você consegue dedicar à preparação?", answers: ["20 minutos por dia", "Algumas vezes por semana", "Somente aos finais de semana", "Preciso de uma rota bem direta"].map((label, index) => ({ label, score: index + 1 })) },
];

const faqs = [
  ["Ainda dá tempo se eu estiver na reta final?", "Sim. A organização por módulos permite priorizar os conteúdos mais importantes para o seu momento e seguir uma rota direta."],
  ["O curso serve para parto pelo SUS e particular?", "Sim. O conteúdo ajuda você a compreender fases, escolhas, direitos e conversas importantes em diferentes contextos de assistência."],
  ["Meu acompanhante também pode assistir?", "Sim. A preparação do acompanhante faz parte do curso e ajuda a transformar informação em apoio prático."],
  ["Qual a diferença entre Essencial e Completo?", "O Essencial reúne o curso, 8 módulos e 7 bônus. O Completo inclui tudo isso e também o Mari com Você, um canal direto pelo WhatsApp para dúvidas educativas durante a gestação, até o parto."],
  ["Por quanto tempo tenho acesso?", "O acesso ao curso O Poder do Parto é vitalício."],
  ["O curso substitui o acompanhamento médico?", "Não. O curso é educativo e complementa — nunca substitui — seu pré-natal e as orientações da equipe responsável pela sua assistência."],
];

function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const analytics = window as AnalyticsWindow;
  const payload = { event, ...data };
  analytics.dataLayer?.push(payload);
  analytics.gtag?.("event", event, data);
  analytics.fbq?.("trackCustom", event, data);
}

function checkoutUrl(plan: "essencial" | "completo") {
  if (typeof window === "undefined") return OFFER_PATH;
  const destination = new URL(OFFER_PATH, window.location.origin);
  const current = new URLSearchParams(window.location.search);
  current.forEach((value, key) => {
    if (key.startsWith("utm_") || ["fbclid", "gclid"].includes(key)) destination.searchParams.set(key, value);
  });
  destination.searchParams.set("plano", plan);
  return destination.toString();
}

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz gratuito | O Poder do Parto" },
      { name: "description", content: "Descubra em 8 perguntas o próximo passo ideal para se preparar para o parto com informação, clareza e confiança." },
      { property: "og:title", content: "Quão preparada você se sente para viver o seu parto?" },
      { property: "og:description", content: "Faça o quiz gratuito de O Poder do Parto e receba uma recomendação educativa personalizada." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuizPage,
});

// O tema do quiz (roxo/Playfair) é isolado em .quiz-theme para não afetar as páginas de venda.
function QuizPage() {
  return <div className="quiz-theme"><QuizFlow /></div>;
}

function QuizFlow() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [variant, setVariant] = useState<"A" | "B">("A");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [consent, setConsent] = useState(false);
  const questionHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const state = JSON.parse(saved) as QuizState;
        if (["intro", "quiz", "preview", "lead", "result"].includes(state.screen) && Array.isArray(state.answers)) {
          setScreen(state.screen);
          setCurrent(Math.min(state.current, 7));
          setAnswers(state.answers.slice(0, 8));
        }
      }
      const savedVariant = sessionStorage.getItem("opp-ab-variant");
      const nextVariant = savedVariant === "B" ? "B" : savedVariant === "A" ? "A" : Math.random() > 0.5 ? "B" : "A";
      setVariant(nextVariant);
      sessionStorage.setItem("opp-ab-variant", nextVariant);
    } catch { /* Session storage is an enhancement, not a requirement. */ }
  }, []);

  useEffect(() => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ screen, current, answers })); } catch { /* Ignore unavailable storage. */ }
  }, [screen, current, answers]);

  useEffect(() => {
    if (screen === "quiz") questionHeading.current?.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [screen, current]);

  const score = answers.reduce((sum, answerIndex, questionIndex) => sum + (questions[questionIndex]?.answers[answerIndex]?.score ?? 0), 0);
  const result = score <= 14 ? "A" : score <= 23 ? "B" : "C";
  const resultCopy = {
    A: { eyebrow: "Base consolidada", title: "Você já construiu uma boa base.", text: "Seu resultado indica que você já buscou informação e começou a organizar suas escolhas. O próximo passo é transformar conhecimento em um plano prático para o dia do parto.", plan: "Essencial" },
    B: { eyebrow: "Preparação em construção", title: "Sua preparação está em construção.", text: "Você já deu passos importantes, mas ainda existem pontos que podem gerar insegurança na hora de decidir. Uma rota organizada pode conectar as informações e preparar também o acompanhante.", plan: "Completo" },
    C: { eyebrow: "Hora de criar uma base", title: "Informação pode mudar a forma como você chega ao parto.", text: "Seu resultado mostra que há dúvidas importantes ainda abertas — e isso é mais comum do que parece. Começar agora por uma rota direta pode trazer clareza para as próximas conversas e decisões.", plan: answers[6] === 3 ? "Completo" : "Essencial" },
  }[result];

  const personalInsights = useMemo(() => {
    const insights: string[] = [];
    if ((answers[1] ?? 0) >= 2) insights.push("fortalecer a confiança ao pensar no parto");
    if ((answers[2] ?? 0) >= 2) insights.push("reconhecer com clareza as fases do trabalho de parto");
    if ((answers[3] ?? 0) >= 2) insights.push("preparar quem estará ao seu lado");
    if ((answers[4] ?? 0) >= 2) insights.push("organizar suas preferências e escolhas");
    if ((answers[5] ?? 0) >= 2) insights.push("entender intervenções e saber o que perguntar");
    return insights.slice(0, 3);
  }, [answers]);

  function startQuiz() {
    setScreen("quiz"); setCurrent(0); setAnswers([]); setSelected(null);
    track("quiz_start", { variant });
  }

  function chooseAnswer(answerIndex: number) {
    setSelected(answerIndex);
    const next = answers.slice();
    next[current] = answerIndex;
    setAnswers(next);
    track("quiz_answer", { question: current + 1, answer: answerIndex + 1 });
    window.setTimeout(() => {
      setSelected(null);
      if (current === 7) {
        setScreen("preview");
        track("quiz_complete", { score: next.reduce((sum, index, qIndex) => sum + (questions[qIndex]?.answers[index]?.score ?? 0), 0) });
      } else setCurrent(current + 1);
    }, 280);
  }

  function goBack() {
    if (current === 0) setScreen("intro");
    else { setCurrent(current - 1); setSelected(null); }
  }

  function revealResult() {
    setScreen("lead");
    track("result_view", { result, recommended_plan: resultCopy.plan });
  }

  function showOffer() {
    setScreen("result");
    track("offer_click", { result, recommended_plan: resultCopy.plan, lead_consent: consent });
    // Só envia ao GoHighLevel com consentimento marcado; falha não bloqueia o funil.
    if (consent && (email.trim() || whatsapp.trim())) {
      createGhlLead({ data: { name, email, phone: whatsapp } }).catch(() => {});
    }
  }

  if (screen === "intro") return <Intro variant={variant} onStart={startQuiz} />;
  if (screen === "quiz") return <QuestionScreen current={current} answers={answers} selected={selected} headingRef={questionHeading} onAnswer={chooseAnswer} onBack={goBack} />;
  if (screen === "preview") return <ResultPreview result={result} title={resultCopy.title} onReveal={revealResult} />;
  if (screen === "lead") return <LeadCapture name={name} email={email} whatsapp={whatsapp} consent={consent} setName={setName} setEmail={setEmail} setWhatsapp={setWhatsapp} setConsent={setConsent} onContinue={showOffer} />;
  return <Results result={result} copy={resultCopy} insights={personalInsights} variant={variant} name={name} />;
}

function BrandHeader() {
  return <header className="mx-auto flex w-full max-w-6xl items-center justify-center px-5 py-5 sm:justify-start"><img src={LOGO} alt="O Poder do Parto" className="h-auto w-44 sm:w-52" /></header>;
}

function Intro({ variant, onStart }: { variant: "A" | "B"; onStart: () => void }) {
  const headline = variant === "A" ? "Quão preparada você se sente para viver o seu parto?" : "Descubra o que falta para você chegar mais confiante ao parto.";
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      <BrandHeader />
      <section className="relative mx-auto grid min-h-[calc(100vh-88px)] max-w-6xl items-center gap-10 px-5 pb-14 pt-6 lg:grid-cols-[1.06fr_.94fr] lg:py-16">
        <div className="relative z-10 mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-accent/35 px-4 py-2 text-xs font-bold uppercase text-primary"><Sparkles className="size-4" /> Quiz gratuito • 2 minutos</span>
          <h1 className="mt-6 font-display text-4xl leading-[1.08] font-semibold text-foreground sm:text-5xl lg:text-6xl">{headline}</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg lg:mx-0">Responda 8 perguntas rápidas e descubra o próximo passo ideal para se preparar com mais informação, clareza e confiança.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm font-medium text-foreground lg:justify-start">
            {['Resultado personalizado', 'Sem julgamento', 'Conteúdo educativo'].map((item) => <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" />{item}</span>)}
          </div>
          <Button onClick={onStart} size="lg" className="mt-8 h-14 w-full rounded-xl bg-brand-gradient px-7 text-base font-bold shadow-brand hover:opacity-95 sm:w-auto">COMEÇAR O QUIZ <ArrowRight /></Button>
          <p className="mt-4 text-sm text-muted-foreground">Mais de 1.700 mulheres já passaram pela preparação da Mari.</p>
        </div>
        <div className="relative mx-auto hidden h-[510px] w-full max-w-md lg:block" aria-hidden="true">
          <div className="organic-shape absolute inset-4 bg-accent/50" />
          <div className="absolute inset-10 grid place-items-center rounded-full border border-primary/10 bg-lavender/70"><HeartHandshake className="size-36 stroke-[1] text-primary/80" /></div>
          <div className="absolute bottom-10 left-0 max-w-[220px] rounded-lg border border-border bg-background/95 p-4 shadow-soft"><p className="font-display text-lg text-foreground">Informação acolhe.</p><p className="mt-1 text-sm text-muted-foreground">Clareza ajuda você a fazer perguntas melhores.</p></div>
        </div>
      </section>
    </main>
  );
}

function QuestionScreen({ current, answers, selected, headingRef, onAnswer, onBack }: { current: number; answers: number[]; selected: number | null; headingRef: React.RefObject<HTMLHeadingElement | null>; onAnswer: (index: number) => void; onBack: () => void }) {
  const question = questions[current];
  if (!question) return null;
  return (
    <main className="flex min-h-[100dvh] flex-col bg-quiz-wash">
      <BrandHeader />
      <section className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-5 pb-6 pt-1 sm:pt-10">
        <div className="mb-4 sm:mb-10">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground sm:mb-3 sm:text-sm"><span>Pergunta {current + 1} de 8</span><span>{Math.round(((current + 1) / 8) * 100)}%</span></div>
          <div className="h-1.5 overflow-hidden rounded-full bg-accent sm:h-2"><div className="h-full rounded-full bg-brand-gradient transition-[width] duration-500" style={{ width: `${((current + 1) / 8) * 100}%` }} /></div>
        </div>
        <Button variant="ghost" onClick={onBack} className="mb-2 -ml-3 h-8 text-muted-foreground sm:mb-5 sm:h-9"><ArrowLeft /> Voltar</Button>
        <div key={current} className="animate-question-in">
          <p className="text-xs font-bold uppercase text-primary sm:text-sm">Sobre a sua preparação</p>
          <h1 ref={headingRef} tabIndex={-1} className="mt-2 font-display text-2xl leading-tight font-semibold text-foreground outline-none sm:mt-3 sm:text-4xl">{question.question}</h1>
          <div className="mt-4 grid gap-2.5 sm:mt-8 sm:gap-3" role="radiogroup" aria-label={question.question}>
            {question.answers.map((answer, index) => {
              const active = selected === index || (selected === null && answers[current] === index);
              return <Button key={answer.label} variant="outline" role="radio" aria-checked={active} onClick={() => onAnswer(index)} className={`h-auto min-h-12 w-full justify-between whitespace-normal rounded-xl border px-4 py-3 text-left text-[15px] font-medium shadow-none transition-all sm:min-h-16 sm:px-5 sm:text-base ${active ? "border-primary bg-accent text-primary ring-2 ring-primary/20" : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-accent/30"}`}><span>{answer.label}</span><span className={`grid size-5 shrink-0 place-items-center rounded-full border sm:size-6 ${active ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{active && <Check className="size-3.5 sm:size-4" />}</span></Button>;
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function ResultPreview({ result, title, onReveal }: { result: string; title: string; onReveal: () => void }) {
  return <main className="min-h-screen bg-quiz-wash"><BrandHeader /><section className="mx-auto flex max-w-2xl flex-col items-center px-5 pb-20 pt-8 text-center"><div className="grid size-20 place-items-center rounded-full bg-accent text-primary"><Sparkles className="size-9" /></div><p className="mt-7 text-sm font-bold uppercase text-primary">Seu resultado está pronto</p><h1 className="mt-3 font-display text-4xl leading-tight font-semibold text-foreground sm:text-5xl">{title}</h1><p className="mt-5 max-w-lg text-lg leading-8 text-muted-foreground">Analisamos suas respostas e identificamos o próximo passo mais indicado para o seu momento.</p><div className="mt-8 w-full max-w-md rounded-lg border border-border bg-background p-5 text-left shadow-soft"><p className="text-sm font-semibold text-muted-foreground">Diagnóstico educativo</p><div className="mt-3 flex items-center gap-3"><div className="h-2 flex-1 overflow-hidden rounded-full bg-accent"><div className={`h-full rounded-full bg-brand-gradient ${result === "A" ? "w-1/3" : result === "B" ? "w-2/3" : "w-full"}`} /></div><span className="text-sm font-bold text-primary">Concluído</span></div></div><Button onClick={onReveal} size="lg" className="mt-8 h-14 w-full rounded-xl bg-brand-gradient text-base font-bold shadow-brand sm:w-auto">VER MEU RESULTADO <ArrowRight /></Button><p className="mt-3 text-xs text-muted-foreground">Leitura imediata e sem julgamento.</p></section></main>;
}

function LeadCapture({ name, email, whatsapp, consent, setName, setEmail, setWhatsapp, setConsent, onContinue }: { name: string; email: string; whatsapp: string; consent: boolean; setName: (v: string) => void; setEmail: (v: string) => void; setWhatsapp: (v: string) => void; setConsent: (v: boolean) => void; onContinue: () => void }) {
  return <main className="min-h-screen bg-quiz-wash"><BrandHeader /><section className="mx-auto max-w-xl px-5 pb-20 pt-5"><p className="text-sm font-bold uppercase text-primary">Antes da recomendação completa</p><h1 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">Quer receber este conteúdo para consultar depois?</h1><p className="mt-4 leading-7 text-muted-foreground">Os campos são opcionais. Você pode continuar sem preencher.</p><div className="mt-8 grid gap-4"><label className="grid gap-2 text-sm font-semibold text-foreground">Nome <span className="sr-only">opcional</span><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Como você gostaria de ser chamada?" autoComplete="name" className="h-12 rounded-lg bg-background" /></label><label className="grid gap-2 text-sm font-semibold text-foreground">E-mail <span className="text-xs font-normal text-muted-foreground">(opcional)</span><Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="voce@exemplo.com" type="email" autoComplete="email" className="h-12 rounded-lg bg-background" /></label><label className="grid gap-2 text-sm font-semibold text-foreground">WhatsApp <span className="text-xs font-normal text-muted-foreground">(opcional)</span><Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="(00) 00000-0000" type="tel" autoComplete="tel" className="h-12 rounded-lg bg-background" /></label><label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-background p-4 text-sm leading-6 text-muted-foreground"><Checkbox checked={consent} onCheckedChange={(value) => setConsent(value === true)} className="mt-1" /><span>Autorizo o contato por e-mail e/ou WhatsApp com conteúdos sobre preparação para o parto. Posso cancelar quando quiser.</span></label></div><Button onClick={onContinue} size="lg" className="mt-7 h-auto min-h-14 w-full rounded-xl bg-brand-gradient px-4 py-3 text-sm font-bold leading-snug whitespace-normal shadow-brand sm:text-base">CONTINUAR PARA MINHA RECOMENDAÇÃO <ArrowRight /></Button><Button onClick={onContinue} variant="ghost" className="mt-2 w-full text-muted-foreground">Continuar sem preencher</Button></section></main>;
}

function Results({ result, copy, insights, variant, name }: { result: string; copy: { eyebrow: string; title: string; text: string; plan: string }; insights: string[]; variant: "A" | "B"; name: string }) {
  const finalCta = variant === "A" ? "QUERO A PREPARAÇÃO COMPLETA" : "QUERO ME PREPARAR COM A MARI";
  const recommendedComplete = copy.plan === "Completo";
  return <main className="min-h-screen bg-background pb-20 md:pb-0">
    <BrandHeader />
    <section className="border-y border-border bg-quiz-wash"><div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:py-20"><div><span className="inline-flex rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase text-primary">{copy.eyebrow}</span><h1 className="mt-5 font-display text-4xl leading-tight font-semibold text-foreground sm:text-5xl">{name ? `${name}, ${copy.title.charAt(0).toLowerCase()}${copy.title.slice(1)}` : copy.title}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{copy.text}</p>{insights.length > 0 && <div className="mt-7"><p className="font-semibold text-foreground">Pelas suas respostas, vale priorizar:</p><ul className="mt-3 grid gap-2">{insights.map((item) => <li key={item} className="flex gap-3 text-muted-foreground"><CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" /><span>{item}</span></li>)}</ul></div>}</div><div className="overflow-hidden rounded-lg border border-border bg-background shadow-soft"><div className="bg-primary px-6 py-3 text-center text-sm font-bold text-primary-foreground">Recomendação para o seu momento</div><div className="p-7"><p className="text-sm font-semibold text-muted-foreground">Plano indicado</p><p className="mt-1 font-display text-4xl font-semibold text-primary">{copy.plan}</p><p className="mt-3 leading-7 text-muted-foreground">Uma preparação estruturada para transformar informação em decisões mais conscientes.</p><Button asChild size="lg" className="mt-6 h-13 w-full rounded-xl bg-brand-gradient font-bold"><a href="#oferta" onClick={() => track("offer_click", { result, recommended_plan: copy.plan })}>CONHECER MINHA RECOMENDAÇÃO <ArrowRight /></a></Button></div></div></div></section>
    <section id="oferta" className="scroll-mt-4 px-5 py-16 sm:py-24"><div className="mx-auto max-w-6xl"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase text-primary">O próximo passo</p><h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-5xl">Sua preparação recomendada: O Poder do Parto</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">O curso organiza corpo, mente, acompanhante e decisões em uma sequência prática para você avançar com mais clareza.</p></div><div className="mt-12 grid items-stretch gap-6 lg:grid-cols-2"><PlanCard type="essencial" recommended={!recommendedComplete} /><PlanCard type="completo" recommended={recommendedComplete} finalCta={finalCta} /></div><p className="mt-4 text-center text-xs text-muted-foreground">*Valores e condições sujeitos às regras da plataforma de pagamento.</p></div></section>
    <section className="bg-secondary px-5 py-16 sm:py-20"><div className="mx-auto max-w-6xl"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div className="overflow-hidden rounded-lg bg-accent"><img src={MARI} alt="Mariana Betioli apresentando conteúdos sobre parto" className="aspect-[4/5] h-full w-full object-cover" /></div><div><p className="text-sm font-bold uppercase text-primary">Com Mariana Betioli</p><h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">Uma preparação acolhedora, prática e sem julgamentos.</h2><p className="mt-5 leading-7 text-muted-foreground">Mais de 1.700 mulheres já passaram pela preparação da Mari para compreender melhor o próprio corpo, envolver o acompanhante e chegar às conversas importantes com mais repertório.</p><div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"><Trust icon={<HeartHandshake />} label="+1.700 mulheres" /><Trust icon={<ShieldCheck />} label="7 dias de garantia" /><Trust icon={<LockKeyhole />} label="Pagamento seguro" /><Trust icon={<Clock3 />} label="Acesso imediato" /></div></div></div><div className="mt-14 grid gap-5 md:grid-cols-2"><figure className="overflow-hidden rounded-lg border border-border bg-background shadow-soft"><img src={TESTIMONIAL_ONE} alt="Depoimento real de aluna sobre sua experiência com o curso" className="h-[420px] w-full object-contain bg-muted" /><figcaption className="p-4 text-sm font-semibold text-foreground">Relato real de uma aluna de O Poder do Parto</figcaption></figure><figure className="overflow-hidden rounded-lg border border-border bg-background shadow-soft"><img src={TESTIMONIAL_TWO} alt="Depoimento real de aluna agradecendo pelas orientações" className="h-[420px] w-full object-contain bg-muted" /><figcaption className="p-4 text-sm font-semibold text-foreground">Experiência compartilhada por uma aluna</figcaption></figure></div></div></section>
    <section className="px-5 py-16 sm:py-24"><div className="mx-auto max-w-3xl"><div className="text-center"><p className="text-sm font-bold uppercase text-primary">Dúvidas frequentes</p><h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">Antes de escolher sua preparação</h2></div><Accordion type="single" collapsible className="mt-10 border-t border-border">{faqs.map(([question, answer], index) => <AccordionItem key={question} value={`faq-${index}`}><AccordionTrigger className="py-5 text-base text-foreground hover:no-underline">{question}</AccordionTrigger><AccordionContent className="pb-5 text-base leading-7 text-muted-foreground">{answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>
    <footer className="border-t border-border bg-secondary px-5 py-10"><div className="mx-auto max-w-5xl text-center"><img src={LOGO} alt="O Poder do Parto" className="mx-auto w-40" /><p className="mx-auto mt-6 max-w-3xl text-sm leading-6 text-muted-foreground">Este conteúdo é educativo e não substitui pré-natal, consulta, diagnóstico ou orientação da equipe responsável pela sua assistência.</p></div></footer>
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 shadow-sticky backdrop-blur md:hidden"><Button asChild size="lg" className="h-13 w-full rounded-xl bg-brand-gradient font-bold"><a href={checkoutUrl(recommendedComplete ? "completo" : "essencial")} onClick={() => track("checkout_click", { plan: recommendedComplete ? "completo" : "essencial", placement: "sticky" })}>{recommendedComplete ? finalCta : "QUERO O PLANO ESSENCIAL"}</a></Button></div>
  </main>;
}

function PlanCard({ type, recommended, finalCta }: { type: "essencial" | "completo"; recommended: boolean; finalCta?: string }) {
  const complete = type === "completo";
  const features = complete ? ["Tudo do Essencial", "Mari com Você: canal direto pelo WhatsApp", "Mensagens de texto e áudio para dúvidas educativas", "Acompanhamento durante a gestação, até o parto"] : ["Curso O Poder do Parto", "8 módulos", "7 bônus", "Acesso vitalício"];
  return <article className={`relative flex flex-col rounded-lg border bg-background p-6 shadow-soft sm:p-8 ${recommended ? "border-primary ring-2 ring-primary/15" : "border-border"}`}>{complete && <span className="absolute right-5 top-0 -translate-y-1/2 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase text-primary-foreground">Mais escolhido</span>}<div className="flex items-start justify-between gap-4"><div><p className="text-sm font-bold uppercase text-primary">Plano</p><h3 className="mt-1 font-display text-3xl font-semibold text-foreground">{complete ? "Completo" : "Essencial"}</h3></div>{recommended && <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">Recomendado</span>}</div><ul className="mt-7 flex-1 space-y-3">{features.map((feature) => <li key={feature} className="flex gap-3 text-sm leading-6 text-foreground"><CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" />{feature}</li>)}</ul><div className="mt-8 border-t border-border pt-6"><p className="text-sm text-muted-foreground">12x de <strong className="text-xl text-foreground">R$ {complete ? "41,06" : "30,72"}</strong></p><p className="mt-1 text-sm text-muted-foreground">ou R$ {complete ? "397,00" : "297,00"} à vista*</p></div><Button asChild size="lg" variant={complete ? "default" : "outline"} className={`mt-6 h-13 w-full rounded-xl font-bold ${complete ? "bg-brand-gradient shadow-brand" : "border-primary text-primary hover:bg-accent"}`}><a href={checkoutUrl(type)} onClick={() => track("checkout_click", { plan: type, placement: "card" })}>{complete ? (finalCta ?? "QUERO A PREPARAÇÃO COMPLETA") : "QUERO O PLANO ESSENCIAL"}</a></Button></article>;
}

function Trust({ icon, label }: { icon: React.ReactNode; label: string }) { return <div className="rounded-lg border border-border bg-background p-4 text-center"><div className="mx-auto mb-2 flex justify-center text-primary">{icon}</div><p className="text-xs font-bold text-foreground">{label}</p></div>; }
