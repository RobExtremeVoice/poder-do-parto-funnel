import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import {
  ArrowRight,
  Baby,
  BookOpen,
  Check,
  HeartHandshake,
  MessageCircleHeart,
  Play,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { offerConfig } from "@/config/offers";
import { goToCheckout, trackEvent } from "@/lib/tracking";
import mariPortrait from "@/assets/oferta/mariana-betioli.png.asset.json";
import brandLogo from "@/assets/oferta/o-poder-do-parto.png.asset.json";
import brandLogoWhite from "@/assets/oferta/o-poder-do-parto-white.png.asset.json";
import testimonial1 from "@/assets/oferta/testimonials/testimonial-1.jpg.asset.json";
import testimonial2 from "@/assets/oferta/testimonials/testimonial-2.jpg.asset.json";
import testimonial3 from "@/assets/oferta/testimonials/testimonial-3.jpg.asset.json";
import testimonial4 from "@/assets/oferta/testimonials/testimonial-4.jpg.asset.json";
import testimonial5 from "@/assets/oferta/testimonials/testimonial-5.jpg.asset.json";
import testimonial6 from "@/assets/oferta/testimonials/testimonial-6.jpg.asset.json";
import testimonial7 from "@/assets/oferta/testimonials/testimonial-7.jpg.asset.json";
import testimonial8 from "@/assets/oferta/testimonials/testimonial-8.jpg.asset.json";
import testimonial9 from "@/assets/oferta/testimonials/testimonial-9.jpg.asset.json";
import videoPoster from "@/assets/oferta/video-poster.webp.asset.json";
import module1 from "@/assets/oferta/course/modulo-1.jpg.asset.json";
import module2 from "@/assets/oferta/course/modulo-2.jpg.asset.json";
import module3 from "@/assets/oferta/course/modulo-3.jpg.asset.json";
import module4 from "@/assets/oferta/course/modulo-4.jpg.asset.json";
import module6 from "@/assets/oferta/course/modulo-6.jpg.asset.json";
import module7 from "@/assets/oferta/course/modulo-7.jpg.asset.json";
import module8 from "@/assets/oferta/course/modulo-8.jpg.asset.json";
import bonus1 from "@/assets/oferta/course/bonus-1.jpg.asset.json";
import bonus2 from "@/assets/oferta/course/bonus-2.jpg.asset.json";
import bonus3 from "@/assets/oferta/course/bonus-3.jpg.asset.json";
import bonus4 from "@/assets/oferta/course/bonus-4.jpg.asset.json";
import bonus5 from "@/assets/oferta/course/bonus-5.jpg.asset.json";
import bonus6 from "@/assets/oferta/course/bonus-6.jpg.asset.json";
import bonus7 from "@/assets/oferta/course/bonus-7.jpg.asset.json";

// Abaixo da dobra: carregadas sob demanda para não pesar o bundle inicial.
const SiteFooter = lazy(() => import("@/components/SiteFooter").then((m) => ({ default: m.SiteFooter })));

// VSL (/aula_g): player via iframe (embed.html), formato vertical 9:16.
const VIDEO_SCRIPT_URL = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js";
const VIDEO_EMBED_URL = "https://scripts.converteai.net/639563c1-cf70-4484-8d65-6fd485e96ab9/players/6ae14be75a97daff67820c6e/v4/embed.html";

export const Route = createFileRoute("/aula_g")({
  head: () => ({
    meta: [
      { title: "O Poder do Parto | Preparação para um parto consciente" },
      { name: "description", content: "Prepare-se emocional, física e praticamente para viver o nascimento com mais consciência, confiança e protagonismo." },
      { property: "og:title", content: "O Poder do Parto | Preparação completa" },
      { property: "og:description", content: "Conhecimento e ferramentas práticas para gestantes e acompanhantes, no SUS ou na rede particular." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "preload", as: "image", href: videoPoster.url, fetchPriority: "high" }],
  }),
  component: Index,
});

const modules = [
  ["Módulo 1", "Primeiros Passos", "Entenda tudo sobre a jornada que está começando.", module1.url],
  ["Módulo 2", "A Realidade do Parto", "Descubra como funciona o sistema e garanta um parto respeitoso.", module2.url],
  ["Módulo 3", "Preparo Emocional", "Trabalhe o medo, a ansiedade e fortaleça sua confiança.", module3.url],
  ["Módulo 4", "Como Funciona o Parto", "Identifique e saiba o que fazer em cada fase do trabalho de parto.", module4.url],
  ["Módulo 5", "O Corpo na Gravidez", "Cuide de si e prepare-se fisicamente para o parto.", module4.url],
  ["Módulo 6", "Indução & Cesárea", "Entenda indicações, intervenções e parto normal após cesárea.", module6.url],
  ["Módulo 7", "Técnicas de Alívio da Dor", "Respiração, massagem, acupressão e outros métodos naturais.", module7.url],
  ["Módulo 8", "Plano de Parto", "Crie um plano de parto que funciona e seja respeitado.", module8.url],
] as const;

const bonuses = [
  ["Bônus 1", "Posições para encaixar o bebê", bonus1.url],
  ["Bônus 2", "Massagem com convidada especialista", bonus2.url],
  ["Bônus 3", "Preparando o seu acompanhante", bonus3.url],
  ["Bônus 4", "Comunidade no WhatsApp", bonus4.url],
  ["Bônus 5", "O pós-parto", bonus5.url],
  ["Bônus 6", "Respiração na gravidez e no parto", bonus6.url],
  ["Bônus 7", "10 ensinamentos para o bebê dormir melhor", bonus7.url],
];

const painPoints = [
  "Não saber se já é a hora de ir para a maternidade",
  "Sentir medo de intervenções que você não compreende",
  "Ter um acompanhante que quer ajudar, mas não sabe como",
  "Não conseguir organizar e comunicar seu plano de parto",
  "Chegar ao nascimento sem conhecer seus direitos e escolhas",
];

// Dimensões intrínsecas reais dos arquivos (ver asset.json) — usadas só para
// o navegador reservar o espaço certo (evita layout shift no masonry), o
// tamanho exibido continua controlado pelo CSS (h-auto w-full).
const testimonials = [
  { image: testimonial1, width: 739, height: 1256 },
  { image: testimonial2, width: 900, height: 615 },
  { image: testimonial3, width: 900, height: 523 },
  { image: testimonial4, width: 900, height: 293 },
  { image: testimonial5, width: 900, height: 286 },
  { image: testimonial6, width: 900, height: 485 },
  { image: testimonial7, width: 900, height: 912 },
  { image: testimonial8, width: 900, height: 297 },
  { image: testimonial9, width: 900, height: 380 },
];

// Plano único (sem Essencial/Completo) — perguntas ajustadas para não
// mencionar comparação entre planos.
const faqs: Array<[string, string]> = [
  ["O que está incluído no Poder do Parto?", "Acesso ao curso completo, com 9 módulos e mais de 70 aulas, além dos 7 bônus exclusivos e materiais de apoio para download."],
  ["Por quanto tempo tenho acesso?", "O acesso é vitalício, para você rever o conteúdo sempre que precisar."],
  ["Posso fazer mesmo estando no final da gestação?", "Sim. As aulas são organizadas para você priorizar os temas mais importantes conforme o momento da sua gestação."],
  ["O curso substitui o acompanhamento médico?", "Não. O conteúdo é educativo e não substitui pré-natal, consulta, diagnóstico ou orientação da equipe responsável pela sua assistência."],
  ["Como funciona a garantia?", "Você tem sete dias após a compra para conhecer o conteúdo e solicitar o reembolso, conforme as condições apresentadas no checkout."],
];


function SectionTitle({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14"><p className={`mb-3 text-xs font-extrabold uppercase ${light ? "text-warm" : "text-primary"}`}>{eyebrow}</p><h2 className={`text-3xl font-extrabold leading-tight md:text-5xl ${light ? "text-primary-foreground" : "text-plum"}`}>{title}</h2>{text && <p className={`mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg ${light ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{text}</p>}</div>;
}

function Brand({ light = false }: { light?: boolean }) {
  const logo = light ? brandLogoWhite : brandLogo;
  return <a href="#inicio" className="inline-flex shrink-0" aria-label="O Poder do Parto — início"><img src={logo.url} alt="O Poder do Parto" width={1600} height={531} className="h-10 w-auto object-contain md:h-12" /></a>;
}

function Index() {
  const [videoStatus, setVideoStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [slowConnection, setSlowConnection] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    trackEvent("page_view", { page_path: window.location.pathname });
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    setSlowConnection(Boolean(connection?.saveData || connection?.effectiveType?.includes("2g")));
  }, []);

  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    targets.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const loadVideo = () => {
    if (videoStatus === "loading" || videoStatus === "ready") return;
    setVideoStatus("loading");
    trackEvent("video_load_requested", { connection: slowConnection ? "slow_or_data_saver" : "standard" });

    // SDK do player (não bloqueia a renderização do iframe — ele carrega o
    // próprio conteúdo via embed.html independente disso).
    if (!document.querySelector<HTMLScriptElement>(`script[src="${VIDEO_SCRIPT_URL}"]`)) {
      const script = document.createElement("script");
      script.src = VIDEO_SCRIPT_URL;
      script.async = true;
      document.head.appendChild(script);
    }

    setVideoStatus("ready");
  };

  const scrollToOffers = (location: string) => {
    trackEvent("cta_click", { location });
    document.getElementById("ofertas")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const buyNow = () => {
    trackEvent("plan_selected", { plan: "essential", location: "pricing" });
    goToCheckout(offerConfig.essential.checkoutUrl, "essential");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 md:h-20 md:px-8">
          <Brand />
        </div>
      </header>

      <main>
        <section id="inicio" className="relative px-4 pb-14 pt-2 md:px-8 md:pb-20 md:pt-3">
          <div className="absolute inset-x-0 top-0 -z-10 h-3/4 bg-gradient-to-b from-secondary/80 to-background" />
          <div className="mx-auto max-w-5xl text-center">
            <h1 className="mx-auto max-w-4xl text-[1.4rem] font-extrabold leading-[1.15] text-plum sm:text-3xl lg:text-4xl">Prepare-se para viver o nascimento do seu bebê com mais consciência, confiança e protagonismo</h1>
            <p className="mx-auto mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-primary sm:text-sm"><Users className="size-4" />Mais de 1.700 mulheres já se prepararam com a Mari</p>
            <div className="relative mx-auto mt-2 aspect-[9/16] w-full max-w-[320px] overflow-hidden rounded-2xl border-4 border-background bg-plum shadow-2xl">
              {videoStatus !== "idle" && (
                <iframe
                  title="Vídeo: O Poder do Parto"
                  // O iframe só é montado depois do clique (lazy por natureza),
                  // então já renderiza direto com a URL final — nada de
                  // about:blank + swap no onLoad (esse evento não é confiável
                  // em iframe via React: o load do about:blank pode disparar
                  // antes do listener ser anexado, perdendo o troca).
                  src={`${VIDEO_EMBED_URL}${window.location.search || "?"}&vl=${encodeURIComponent(window.location.href)}`}
                  frameBorder={0}
                  allowFullScreen
                  referrerPolicy="origin"
                  className="absolute inset-0 block h-full w-full"
                />
              )}
              {videoStatus !== "ready" && <div className="absolute inset-0 bg-plum text-primary-foreground">
                <img src={videoPoster.url} alt="Mariana Betioli apresentando O Poder do Parto" width={640} height={360} fetchPriority="high" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-foreground/25" />
                <div className="absolute inset-0 grid place-items-center px-4">
                  {videoStatus === "loading" ? <div className="text-center" role="status" aria-live="polite"><span className="mx-auto block size-10 animate-spin rounded-full border-4 border-primary-foreground/40 border-t-primary-foreground" /><p className="mt-3 text-sm font-bold">Preparando o vídeo...</p></div> : <Button type="button" variant="ghost" onClick={loadVideo} aria-label={videoStatus === "error" ? "Tentar carregar o vídeo novamente" : "Reproduzir vídeo: O Poder do Parto"} className="h-auto flex-col gap-2 rounded-xl p-3 text-primary-foreground hover:bg-foreground/20 hover:text-primary-foreground">
                    <span className="grid size-16 place-items-center rounded-full bg-accent text-accent-foreground shadow-lg"><Play className="ml-1 size-7 fill-current" /></span>
                    <span className="text-sm font-extrabold">{videoStatus === "error" ? "Tentar novamente" : "Assistir ao vídeo"}</span>
                  </Button>}
                </div>
                {slowConnection && videoStatus === "idle" && <p className="absolute inset-x-3 bottom-2 text-center text-[11px] font-semibold drop-shadow">Modo econômico: o vídeo só será carregado ao tocar em assistir.</p>}
                {videoStatus === "error" && <p className="absolute inset-x-3 bottom-2 text-center text-[11px] font-semibold drop-shadow">A conexão está lenta. A capa permanece disponível enquanto você tenta novamente.</p>}
              </div>}
            </div>
            <Button onClick={() => scrollToOffers("hero")} className="mt-6 min-h-14 w-full rounded-2xl bg-accent text-accent-foreground px-6 text-sm font-extrabold shadow-xl hover:bg-accent/90 sm:w-auto sm:text-base">QUERO ME PREPARAR PARA O MEU PARTO <ArrowRight /></Button>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">Acesso vitalício • Garantia de 7 dias • No seu próprio ritmo</p>
          </div>
        </section>

        <section data-reveal className="bg-plum px-4 py-16 text-primary-foreground md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl"><SectionTitle light eyebrow="Você não está sozinha" title="Você deseja viver esse momento com mais segurança e menos medo?" text="É comum sentir insegurança diante do desconhecido. Preparação não é controlar o parto — é chegar com recursos para compreender, perguntar e participar." />
            <div className="grid gap-3 md:grid-cols-5">{painPoints.map((item, i) => <div key={item} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/8 p-4 transition-colors hover:bg-primary-foreground/15 md:p-5"><span className="mb-2 block text-3xl font-extrabold text-warm md:mb-5">0{i + 1}</span><p className="font-semibold leading-relaxed">{item}</p></div>)}</div>
          </div>
        </section>

        <section data-reveal className="px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-6xl"><SectionTitle eyebrow="A transformação" title="Informação muda a forma como você atravessa essa experiência" />
          <div className="grid overflow-hidden rounded-2xl border bg-card shadow-sm md:grid-cols-2">
            <div className="p-7 md:p-10"><p className="mb-6 text-sm font-extrabold uppercase text-muted-foreground">Sem preparação</p>{["Medo do que pode acontecer", "Dúvidas que ficam sem resposta", "Acompanhante inseguro", "Preferências difíceis de comunicar"].map(x => <p key={x} className="mb-4 flex gap-3 text-muted-foreground"><X className="mt-0.5 size-5 shrink-0 text-destructive" />{x}</p>)}</div>
            <div className="bg-secondary p-7 md:p-10"><p className="mb-6 text-sm font-extrabold uppercase text-primary">Com O Poder do Parto</p>{["Conhecimento para reconhecer cada fase", "Recursos práticos de conforto", "Acompanhante preparado e presente", "Plano alinhado e diálogo consciente"].map(x => <p key={x} className="mb-4 flex gap-3 font-semibold text-plum"><Check className="mt-0.5 size-5 shrink-0 text-primary" />{x}</p>)}</div>
          </div>
          </div>
        </section>

        <section data-reveal id="metodo" className="bg-muted px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="O método" title="Três pilares para uma preparação completa" text="Ciência, prática e diálogo — sem fórmulas mágicas e sem substituir seu acompanhamento pré-natal." />
          <div className="grid gap-5 md:grid-cols-3">{[[BookOpen,"Conhecimento fisiológico e científico","Entenda o que acontece no corpo e reconheça as fases do nascimento."],[HeartHandshake,"Preparação prática","Corpo, mente, alívio da dor e plano de parto em ferramentas aplicáveis."],[MessageCircleHeart,"Protagonismo e diálogo","Construa perguntas, preferências e conversas mais conscientes com sua equipe."]].map(([Icon,title,text],i) => { const IconComponent = Icon as typeof BookOpen; return <article key={String(title)} className="rounded-2xl border bg-background p-7"><div className="mb-7 grid size-14 place-items-center rounded-2xl bg-secondary text-primary"><IconComponent className="size-7" /></div><span className="text-xs font-bold text-warm">PILAR {i+1}</span><h3 className="mt-2 text-xl font-extrabold text-plum">{String(title)}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{String(text)}</p></article>})}</div>
        </div></section>

        <section data-reveal id="modulos" className="bg-muted px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Por dentro do curso" title="Uma preparação completa, passo a passo" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{modules.map(([number,title,description,image]) => <article key={number} className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg"><div className="aspect-video w-full overflow-hidden bg-secondary"><img src={image} alt={`Capa do ${number}: ${title}`} width={1024} height={576} loading="lazy" decoding="async" className="h-full w-full object-contain" /></div><div className="p-4 md:p-5"><span className="text-xs font-bold uppercase text-primary">{number}</span><h3 className="mt-1 text-lg font-extrabold text-plum">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p></div></article>)}</div>
        </div></section>

        <section data-reveal id="bonus" className="bg-plum px-4 py-16 text-primary-foreground md:px-8 md:py-24"><div className="mx-auto max-w-7xl"><SectionTitle light eyebrow="Bônus incríveis" title="Recursos extras para você se sentir ainda mais segura" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{bonuses.map(([number,title,image]) => <article key={number} className="overflow-hidden rounded-lg bg-primary-foreground/10"><div className="aspect-video w-full overflow-hidden bg-primary-foreground/10"><img src={image} alt={`Capa do ${number}: ${title}`} width={1600} height={900} loading="lazy" decoding="async" className="h-full w-full object-contain" /></div><div className="p-3 text-center md:p-4"><p className="text-xs font-bold uppercase text-primary-foreground/90">{number}</p><h3 className="mt-1 text-sm font-bold leading-snug md:text-base">{title}</h3></div></article>)}</div>
        </div></section>

        <section data-reveal className="bg-secondary px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Histórias de transformação" title="Depoimentos reais de quem se preparou para esse momento" />
          <div className="columns-2 gap-3 md:columns-3 md:gap-6">{testimonials.map(({ image, width, height }, index) => <figure key={image.asset_id} className="mb-3 break-inside-avoid overflow-hidden rounded-lg bg-background shadow-sm md:mb-6"><img src={image.url} alt={`Depoimento real de aluna do O Poder do Parto ${index + 1}`} width={width} height={height} loading="lazy" className="h-auto w-full" /></figure>)}</div>
        </div></section>

        <section data-reveal id="mari" className="px-4 py-16 md:px-8 md:py-24"><div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div className="relative"><div className="absolute -inset-3 -z-10 rounded-2xl bg-secondary" /><img src={mariPortrait.url} alt="Mariana Betioli, especialista em preparação para o parto" loading="lazy" width={294} height={300} className="aspect-[4/5] w-full rounded-2xl object-cover" /></div>
          <div><p className="text-xs font-extrabold uppercase text-primary">Sua especialista</p><h2 className="mt-3 text-4xl font-extrabold text-plum md:text-5xl">Mari Betioli</h2><p className="mt-3 text-lg font-bold text-primary">19 anos dedicados à assistência ao parto e à saúde da mulher</p><p className="mt-6 leading-relaxed text-muted-foreground">Com experiência no Brasil, em Portugal e nos Estados Unidos, Mariana acompanhou mulheres em casas de parto, hospitais e partos domiciliares. Sua missão é tornar o conhecimento acessível para que cada família participe do nascimento com mais consciência e respeito.</p><blockquote className="mt-7 border-l-4 border-warm pl-5 text-xl font-semibold leading-relaxed text-plum">“Preparar-se não é buscar um parto perfeito. É construir recursos para viver cada escolha com informação, apoio e protagonismo.”</blockquote></div>
        </div></section>

        <section data-reveal id="ofertas" className="scroll-mt-20 px-4 py-8 md:px-8 md:py-16"><div className="mx-auto max-w-5xl">
          <div className="mx-auto mb-5 max-w-3xl text-center">
            <p className="mb-2 text-xs font-extrabold uppercase text-primary">Escolha sua experiência</p>
            <h2 className="text-2xl font-extrabold leading-tight text-plum sm:text-3xl">Qual preparação combina com você?</h2>
          </div>
          <div className="mx-auto max-w-md">
            <article className="relative flex flex-col rounded-2xl border-2 border-border bg-card p-5 md:p-9">
              <p className="text-sm font-bold text-primary">PLANO ÚNICO</p>
              <h3 className="mt-1 text-2xl font-extrabold">Poder do Parto</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Para compreender o parto, reconhecer escolhas e chegar mais preparada.</p>
              <div className="mt-4"><div className="flex flex-wrap items-baseline gap-2"><span className="text-lg font-bold">{offerConfig.essential.installmentCount}x</span><span className="text-4xl font-extrabold md:text-5xl">R$ {offerConfig.essential.installmentPrice}<span className="align-top text-base md:text-lg">*</span></span></div><p className="mt-1 text-sm">ou <strong>R$ {offerConfig.essential.price},00</strong> à vista</p></div>
              <div className="my-4 h-px bg-current opacity-15" />
              <ul className="flex-1 space-y-2">{offerConfig.essential.features.map(feature => <li key={feature} className="flex gap-2 text-sm leading-snug"><Check className="mt-0.5 size-5 shrink-0 text-primary" />{feature}</li>)}</ul>
              <Button onClick={buyNow} className="mt-5 min-h-14 rounded-2xl bg-accent text-accent-foreground font-extrabold hover:bg-accent/90">Compra Agora!</Button>
            </article>
          </div><p className="mt-3 text-center text-xs text-muted-foreground">*Parcelamento com acréscimo da plataforma. Consulte as condições no checkout.</p>
        </div></section>

        <section data-reveal className="bg-warm-soft px-4 py-14 md:px-8"><div className="mx-auto flex max-w-5xl flex-col items-center gap-7 text-center md:flex-row md:text-left"><div className="grid size-24 shrink-0 place-items-center rounded-full border-4 border-primary bg-background text-primary"><ShieldCheck className="size-12" /></div><div><p className="text-xs font-extrabold uppercase text-primary">Seu risco é zero</p><h2 className="mt-2 text-3xl font-extrabold text-plum">Garantia incondicional de 7 dias</h2><p className="mt-3 leading-relaxed text-muted-foreground">Entre, assista às primeiras aulas e conheça a metodologia. Se o curso não fizer sentido para você, solicite o reembolso dentro do prazo, sem burocracia.</p></div></div></section>

        <section data-reveal className="bg-muted px-4 py-16 md:px-8 md:py-24"><div className="mx-auto max-w-4xl"><SectionTitle eyebrow="Dúvidas frequentes" title="Antes de escolher" />
          <Accordion type="single" collapsible className="rounded-2xl border bg-card px-5 md:px-8" onValueChange={(value) => value && trackEvent("faq_open", { question: value })}>{faqs.map(([q,a],i) => <AccordionItem key={q} value={`faq_${i+1}`}><AccordionTrigger className="py-5 text-base font-bold text-plum md:text-lg">{q}</AccordionTrigger><AccordionContent className="pb-5 leading-relaxed text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion>
        </div></section>

        <section data-reveal className="bg-plum px-4 py-16 text-center text-primary-foreground md:px-8 md:py-24"><div className="mx-auto max-w-4xl"><Baby className="mx-auto size-12 text-warm" /><h2 className="mt-6 text-3xl font-extrabold leading-tight md:text-5xl">Você não precisa chegar ao parto sem saber o que esperar.</h2><p className="mx-auto mt-5 max-w-2xl text-primary-foreground/75 md:text-lg">Prepare-se com informação confiável, ferramentas práticas e acolhimento para viver esse momento com mais segurança.</p><Button onClick={() => scrollToOffers("final_cta")} className="mt-8 min-h-14 w-full rounded-2xl bg-accent text-accent-foreground px-7 font-extrabold hover:bg-accent/90 sm:w-auto">QUERO COMEÇAR AGORA <ArrowRight /></Button></div></section>
      </main>

      <Suspense fallback={null}><SiteFooter /></Suspense>

      <div
        className={`safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 px-4 pt-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 lg:hidden ${showStickyCta ? "translate-y-0" : "translate-y-full"}`}
        aria-hidden={!showStickyCta}
      >
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold text-muted-foreground">A partir de</p>
            <p className="truncate text-sm font-extrabold text-plum">12x R$ {offerConfig.essential.installmentPrice}*</p>
          </div>
          <Button onClick={() => scrollToOffers("sticky_mobile")} tabIndex={showStickyCta ? 0 : -1} className="min-h-12 shrink-0 rounded-2xl bg-accent text-accent-foreground px-5 text-sm font-extrabold hover:bg-accent/90">
            Garantir minha vaga <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
