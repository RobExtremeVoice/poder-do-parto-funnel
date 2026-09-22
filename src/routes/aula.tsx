import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Check, Heart, ShieldCheck, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

import logo from "@/assets/aula/imgi_30_o-poder-do-parto-2048x680-1.png.asset.json";
import footerLogo from "@/assets/aula/o-poder-do-parto_white-scaled-1-1536x509-1.png.asset.json";
import guarantee from "@/assets/aula/garantia-parto.png.asset.json";
import women from "@/assets/aula/depoimentos_mulheres-removebg-preview.png.asset.json";
import module1 from "@/assets/aula/imgi_6_modulo-1-parto.jpg.asset.json";
import module2 from "@/assets/aula/imgi_7_modulo-2-parto.jpg.asset.json";
import module3 from "@/assets/aula/imgi_8_modulo-3-mente.jpg.asset.json";
import module5 from "@/assets/aula/imgi_10_modulo-5-parto.jpg.asset.json";
import module6 from "@/assets/aula/imgi_3_modulo-6-parto.jpg.asset.json";
import module7 from "@/assets/aula/imgi_4_modulo-7-parto.jpg.asset.json";
import module8 from "@/assets/aula/imgi_5_modulo-8-parto.jpg.asset.json";
import bonus1 from "@/assets/aula/imgi_14_bonus-1-parto.jpg.asset.json";
import bonus2 from "@/assets/aula/imgi_13_bonus-2-parto.jpg.asset.json";
import bonus3 from "@/assets/aula/imgi_12_bonus-3-parto.jpg.asset.json";
import bonus4 from "@/assets/aula/imgi_11_bonus-4-parto.jpg.asset.json";
import bonus5 from "@/assets/aula/imgi_16_bonus-5-parto.jpg.asset.json";
import bonus6 from "@/assets/aula/imgi_18_bonus-6-parto.jpg.asset.json";
import bonus7 from "@/assets/aula/imgi_17_bonus-7-parto.jpg.asset.json";
import proof1 from "@/assets/aula/imgi_54_Imagem-do-WhatsApp-de-2025-10-15-as-08.17.45_d5170d8d.jpg.asset.json";
import proof2 from "@/assets/aula/imgi_55_Imagem-do-WhatsApp-de-2025-10-15-as-08.18.45_1497838d.jpg.asset.json";
import proof3 from "@/assets/aula/imgi_56_Imagem-do-WhatsApp-de-2025-10-15-as-08.17.59_39927bba.jpg.asset.json";
import proof4 from "@/assets/aula/imgi_57_Imagem-do-WhatsApp-de-2025-10-15-as-08.18.51_5a13307f.jpg.asset.json";

declare module "react" { namespace JSX { interface IntrinsicElements { "vturb-smartplayer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>; } } }

const CHECKOUT = "https://pay.hotmart.com/X88395451D?off=o69s199w&checkoutMode=10&bid=1752756480235&fromExitPopup=true";
const COMPLETE_CHECKOUT = "https://pay.hotmart.com/X88395451D?off=7skbnr37&checkoutMode=10";
const COMPLETE_UPSELL_CHECKOUT = "https://pay.hotmart.com/X88395451D?off=y194vq5g&checkoutMode=10";
const DELAY = 1080 * 1000;
const STORAGE_KEY = "poder-do-parto-aula-started-at-v3";
const trackingKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "campaign_id", "adset_id", "ad_id"];

const modules = [
  ["Módulo 1", "Primeiros Passos", "Entenda tudo sobre a jornada que está começando.", module1.url],
  ["Módulo 2", "A Realidade do Parto", "Descubra como funciona o sistema e garanta um parto respeitoso.", module2.url],
  ["Módulo 3", "Preparo Emocional", "Trabalhe o medo, a ansiedade e fortaleça sua confiança.", module3.url],
  ["Módulo 4", "Como Funciona o Parto", "Identifique e saiba o que fazer em cada fase do trabalho de parto.", module5.url],
  ["Módulo 5", "O Corpo na Gravidez", "Cuide de si e prepare-se fisicamente para o parto.", module5.url],
  ["Módulo 6", "Indução & Cesárea", "Entenda indicações, intervenções e parto normal após cesárea.", module6.url],
  ["Módulo 7", "Técnicas de Alívio da Dor", "Respiração, massagem, acupressão e outros métodos naturais.", module7.url],
  ["Módulo 8", "Plano de Parto", "Crie um plano de parto que funciona e seja respeitado.", module8.url],
];
const bonuses = [bonus1, bonus2, bonus3, bonus4, bonus5, bonus6, bonus7];
const essentialFeatures = [
  "8 módulos de preparação para o parto",
  "Preparo físico e emocional",
  "Indução, cesárea e intervenções",
  "Técnicas de alívio da dor",
  "Construção do plano de parto",
  "Acesso vitalício ao conteúdo",
];
const completeFeatures = [
  "Tudo o que está no plano Essencial",
  "Mari com Você: canal direto pelo WhatsApp",
  "Mensagens de texto e áudio para tirar dúvidas",
  "Apoio educativo durante toda a gestação",
  "Acesso ao acompanhamento até o parto",
];
const comparison = [
  ["Curso O Poder do Parto", true, true],
  ["8 módulos de preparação", true, true],
  ["Acesso vitalício", true, true],
  ["Mari com Você: canal direto pelo WhatsApp", false, true],
  ["Mensagens de texto e áudio", false, true],
  ["Acompanhamento durante a gestação, até o parto", false, true],
] as const;
const faqs = [
  ["Qual é a diferença entre Essencial e Completo?", "O Essencial dá acesso ao curso O Poder do Parto. O Completo inclui todo o conteúdo do Essencial e também o Mari com Você: um canal direto pelo WhatsApp para falar com a Mari durante a gestação, até o parto."],
  ["Por quanto tempo tenho acesso?", "Os dois planos foram estruturados com acesso vitalício, para você rever o conteúdo sempre que precisar."],
  ["Posso fazer mesmo estando no final da gestação?", "Sim. As aulas são organizadas para você priorizar os temas mais importantes conforme o momento da sua gestação."],
  ["O curso substitui o acompanhamento médico?", "Não. O conteúdo é educativo e não substitui pré-natal, consulta, diagnóstico ou orientação da equipe responsável pela sua assistência."],
  ["Como funciona a garantia?", "Você tem sete dias após a compra para conhecer o conteúdo e solicitar o reembolso, conforme as condições apresentadas no checkout."],
];

export const Route = createFileRoute("/aula")({
  head: () => ({ meta: [
    { title: "O Poder do Parto | Mari Betioli" },
    { name: "description", content: "O Poder do Parto com Mari Betioli: preparação para um parto seguro, respeitoso e cheio de amor." },
    { property: "og:title", content: "O Poder do Parto | Mari Betioli" },
    { property: "og:description", content: "Preparação para um parto seguro, respeitoso e cheio de amor." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function trackedCheckout(base = CHECKOUT) {
  if (typeof window === "undefined") return base;
  const source = new URLSearchParams(window.location.search);
  const url = new URL(base);
  const values: string[] = [];
  trackingKeys.forEach((key) => { const value = source.get(key); if (value) { url.searchParams.set(key, value); values.push(value); } });
  if (values.length) { const code = values.join("|"); url.searchParams.set("sck", code); url.searchParams.set("xcod", code); }
  return url.toString();
}

function CTA() {
  return <Button asChild className="h-auto w-full max-w-xl whitespace-normal rounded-md bg-success px-6 py-4 text-center text-base font-extrabold uppercase text-success-foreground shadow-lg transition hover:-translate-y-1 hover:bg-success/90 sm:text-lg"><a href="#planos">Quero me preparar para o meu parto!</a></Button>;
}

function Index() {
  const [revealed, setRevealed] = useState(false);
  const checkout = useMemo(trackedCheckout, []);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const force = query.get("show") === "all";
    const stored = Number(localStorage.getItem(STORAGE_KEY));
    const started = Number.isFinite(stored) && stored > 0 ? stored : Date.now();
    if (!stored) localStorage.setItem(STORAGE_KEY, String(started));
    const wait = Math.max(DELAY - (Date.now() - started), 0);
    if (force || wait === 0) setRevealed(true);
    const timer = window.setTimeout(() => setRevealed(true), wait);
    trackingKeys.forEach((key) => { const value = query.get(key); if (value) sessionStorage.setItem(key, value); });
    const fb = document.createElement("script");
    fb.text = "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','340206031120534');fbq('track','PageView');";
    document.head.appendChild(fb);
    const smartplayer = document.createElement("script");
    smartplayer.src = "https://scripts.converteai.net/lib/js/smartplayer-wc/v4/smartplayer.js";
    smartplayer.async = true;
    document.body.appendChild(smartplayer);
    const player = document.createElement("script");
    player.src = "https://scripts.converteai.net/639563c1-cf70-4484-8d65-6fd485e96ab9/players/6a28849f56303c2b198f3c7b/v4/player.js";
    player.async = true;
    document.body.appendChild(player);
    return () => { window.clearTimeout(timer); fb.remove(); smartplayer.remove(); player.remove(); };
  }, []);

  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>('a[href*="hotmart.com"]').forEach((link) => { link.href = trackedCheckout(link.href); });
  }, [checkout, revealed]);

  return <>
    <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-background focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-primary focus:shadow-lg">Ir para o conteúdo principal</a>
    <main id="conteudo" className="min-h-screen overflow-hidden bg-background text-foreground">
    <section aria-labelledby="hero-title" className="relative flex min-h-[100svh] items-center bg-plum-deep px-4 py-4 text-primary-foreground sm:px-6 md:min-h-0 md:py-8 lg:min-h-[100svh]">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-4 text-center md:grid-cols-[minmax(0,1fr)_minmax(260px,350px)] md:gap-10 md:text-left lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] lg:gap-16">
        <div className="min-w-0">
          <img src={logo.url} alt="O Poder do Parto — curso de preparação para o parto com Mari Betioli" className="mx-auto mb-4 w-40 sm:w-48 md:mx-0 md:mb-6 md:w-56" />
          <h1 id="hero-title" className="mx-auto max-w-3xl font-display text-[1.7rem] font-semibold leading-[1.14] sm:text-4xl md:mx-0 md:text-[2.6rem] lg:text-5xl">A forma como você se prepara durante a gestação pode <strong className="text-gold">mudar completamente a sua experiência de parto.</strong></h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/95 sm:text-base md:mx-0 md:mt-5 lg:text-xl">Prepare seu acompanhante, evite a violência obstétrica e <strong className="text-gold">viva o parto dos seus sonhos.</strong></p>
        </div>
        <div role="region" aria-label="Aula em vídeo com Mari Betioli" className="mx-auto w-full max-w-[270px] overflow-hidden rounded-md bg-foreground shadow-2xl ring-4 ring-primary-foreground/10 sm:max-w-[300px] md:max-w-[350px] lg:max-w-[380px]">
          <vturb-smartplayer id="vid-6a28849f56303c2b198f3c7b" style={{ display: "block", margin: "0 auto", width: "100%", maxWidth: "400px", minHeight: "225px", backgroundImage: "url(https://cdn.converteai.net/639563c1-cf70-4484-8d65-6fd485e96ab9/6a28841cc9de06c926ca94dc/poster.jpg)", backgroundSize: "cover" }} />
        </div>
      </div>
    </section>

    <div role="status" aria-live="polite">
      {revealed ? <Offer /> : <p className="bg-primary px-5 py-6 text-center text-sm text-primary-foreground">Assista à aula completa para liberar uma condição especial.</p>}
    </div>

    <Button onClick={() => setRevealed(true)} variant="outline" size="sm" className="fixed bottom-3 right-3 z-50 min-h-11 border-primary/40 bg-background text-xs font-semibold text-primary shadow-md">Revelar conteúdo agora</Button>
  </main>
  </>;
}

function Offer() {
  const [upsellOpen, setUpsellOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const openUpsell = () => { openerRef.current = document.activeElement as HTMLElement | null; setUpsellOpen(true); };
  const closeUpsell = () => { setUpsellOpen(false); openerRef.current?.focus(); };
  useEffect(() => {
    if (!upsellOpen) return;
    const node = dialogRef.current;
    const focusables = () => Array.from(node?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); closeUpsell(); return; }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [upsellOpen]);
  return <div className="animate-in fade-in duration-700">
    <section className="bg-lavender px-5 py-16 text-center">
      <p className="font-semibold uppercase tracking-widest text-primary">Sua preparação começa agora</p>
      <h2 className="mx-auto mt-3 max-w-3xl font-display text-3xl font-bold text-primary sm:text-4xl">Tudo que você precisa para viver um parto seguro e respeitoso</h2>
      <div className="mx-auto mt-8"><CTA /></div>
    </section>

    <section aria-labelledby="depoimentos-title" className="bg-background px-5 py-16 sm:py-24"><div className="mx-auto max-w-6xl"><SectionTitle id="depoimentos-title" eyebrow="Depoimentos reais" title="Mais de 1.700 mulheres transformadas" /><img src={women.url} alt="Grupo de mães que fizeram o curso O Poder do Parto com seus bebês no colo" className="mx-auto mt-8 max-h-72 max-w-full object-contain" /><ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">{[proof1,proof2,proof3,proof4].map((image,i)=><li key={image.asset_id}><img src={image.url} alt={`Print de conversa no WhatsApp com o depoimento ${i+1} de uma aluna do curso`} className="w-full rounded-md border border-border shadow-sm" /></li>)}</ul></div></section>

    <section aria-labelledby="modulos-title" className="px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl"><SectionTitle id="modulos-title" eyebrow="Por dentro do curso" title="Uma preparação completa, passo a passo" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{modules.map(([number,title,description,image]) => <li key={number}><article className="h-full overflow-hidden rounded-md border border-border bg-card shadow-sm"><img src={image} alt={`Capa do ${number}: ${title}`} className="aspect-video w-full object-cover" /><div className="p-5"><span className="text-xs font-bold uppercase text-primary">{number}</span><h3 className="mt-1 font-display text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p></div></article></li>)}</ul>
      </div>
    </section>

    <section aria-labelledby="bonus-title" className="bg-plum-deep px-5 py-16 text-primary-foreground sm:py-24"><div className="mx-auto max-w-6xl"><SectionTitle id="bonus-title" light eyebrow="Bônus incríveis" title="Recursos extras para você se sentir ainda mais segura" /><ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{bonuses.map((image,i)=><li key={image.asset_id}><article className="h-full overflow-hidden rounded-md bg-primary-foreground/10"><img src={image.url} alt={`Capa do bônus ${i+1} incluído no curso`} className="aspect-video w-full object-cover" /><div className="p-3 text-center text-sm font-bold">Bônus {i+1}</div></article></li>)}</ul></div></section>

    <section id="planos" aria-labelledby="planos-title" className="scroll-mt-4 px-5 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle id="planos-title" eyebrow="Escolha sua experiência" title="Qual preparação combina com você?" />
        <p className="mx-auto mt-5 max-w-3xl text-center text-muted-foreground">Os dois planos oferecem o curso completo. No plano Completo, você também conta com um canal direto com a Mari durante a gestação.</p>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <PlanCard name="O Poder do Parto Essencial" subtitle="Para quem quer compreender o parto, reconhecer escolhas e chegar mais preparada." amount="30,72" cash="297,00" features={essentialFeatures} onSelect={openUpsell} />
          <PlanCard name="O Poder do Parto Completo" subtitle="Para quem quer todo o curso e a tranquilidade de poder falar diretamente com a Mari durante a gestação." amount="40,75" cash="394,00" features={completeFeatures} href={COMPLETE_CHECKOUT} featured />
        </div>
      </div>
    </section>

    <section aria-labelledby="comparacao-title" className="px-5 pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle id="comparacao-title" eyebrow="Compare com calma" title="Veja a diferença entre os planos" />
        <div className="mt-10 overflow-hidden rounded-md border border-border bg-card shadow-sm">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Comparação entre o plano Essencial e o plano Completo</caption>
            <thead>
              <tr className="bg-secondary text-sm font-bold">
                <th scope="col" className="px-4 py-4 sm:px-6">O que você recebe</th>
                <th scope="col" className="px-2 py-4 text-center">Essencial</th>
                <th scope="col" className="px-2 py-4 text-center">Completo</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(([label, essential, complete]) => <tr key={label} className="border-t border-border text-sm sm:text-base">
                <th scope="row" className="px-4 py-4 text-left font-normal sm:px-6">{label}</th>
                <td className="px-2 py-4 text-center">{essential ? <><Check aria-hidden="true" className="mx-auto size-5 text-success" strokeWidth={3} /><span className="sr-only">Incluído</span></> : <><span aria-hidden="true" className="text-muted-foreground">—</span><span className="sr-only">Não incluído</span></>}</td>
                <td className="px-2 py-4 text-center">{complete ? <><Check aria-hidden="true" className="mx-auto size-5 text-success" strokeWidth={3} /><span className="sr-only">Incluído</span></> : <><span aria-hidden="true" className="text-muted-foreground">—</span><span className="sr-only">Não incluído</span></>}</td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section aria-labelledby="garantia-title" className="bg-secondary px-5 py-16 sm:py-20"><div className="mx-auto grid max-w-4xl items-center gap-8 text-center md:grid-cols-[220px_1fr] md:text-left"><img src={guarantee.url} alt="Selo de garantia incondicional de 7 dias do curso O Poder do Parto" className="mx-auto w-48 sm:w-56" /><div><div className="flex items-center justify-center gap-2 text-primary md:justify-start"><ShieldCheck aria-hidden="true" className="shrink-0" /><span className="font-bold uppercase">Seu risco é zero</span></div><h2 id="garantia-title" className="mt-3 font-display text-3xl font-bold text-primary">7 dias de garantia incondicional</h2><p className="mt-4 leading-relaxed text-muted-foreground">Teste o curso completo. Se não amar o conteúdo ou sentir que ele não é para você, devolvemos 100% do valor pago — sem burocracia e sem questionamentos.</p></div></div></section>

    <section aria-labelledby="faq-title" className="px-5 py-16 sm:py-24"><div className="mx-auto max-w-3xl"><SectionTitle id="faq-title" eyebrow="Dúvidas frequentes" title="Antes de escolher" /><div className="mt-9 divide-y divide-border border-y border-border">{faqs.map(([q,a])=><details key={q} className="group py-1"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-primary">{q}<ChevronDown aria-hidden="true" className="size-5 shrink-0 transition group-open:rotate-180" /></summary><p className="pb-5 leading-relaxed text-muted-foreground">{a}</p></details>)}</div></div></section>

    {upsellOpen && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/70 p-4" onClick={closeUpsell}><div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="upsell-title" aria-describedby="upsell-description" className="relative w-full max-w-md rounded-md bg-background p-6 shadow-2xl sm:p-8" onClick={(event) => event.stopPropagation()}><Button variant="ghost" size="icon" aria-label="Fechar oferta especial" onClick={closeUpsell} className="absolute right-2 top-2 min-h-11 min-w-11 text-muted-foreground"><X aria-hidden="true" className="size-5" /></Button><p className="text-xs font-bold uppercase text-primary">Oferta especial — só agora</p><h2 id="upsell-title" className="mt-2 font-display text-2xl font-bold">O Poder do Parto Completo</h2><p id="upsell-description" className="mt-3 text-sm leading-relaxed text-muted-foreground">Leve o acompanhamento direto com a Mari pelo WhatsApp junto com a sua preparação Essencial.</p><div className="my-5 rounded-md bg-secondary p-4 text-center"><p className="text-sm text-muted-foreground line-through">de R$ 97,00</p><p className="font-display text-4xl font-bold text-primary">por R$ 48,50</p><p className="mt-1 text-xs font-bold uppercase text-primary">50% de desconto</p></div><div className="grid gap-3"><Button asChild className="h-auto py-4 font-bold"><a href={COMPLETE_UPSELL_CHECKOUT}>Sim, quero esta opção</a></Button><Button asChild variant="outline" className="h-auto py-3 font-bold"><a href={CHECKOUT}>Continuar apenas com o Essencial</a></Button><Button variant="ghost" onClick={closeUpsell}>Voltar e comparar</Button></div><p className="mt-4 text-center text-xs text-muted-foreground">Garantia incondicional de 7 dias • Pagamento seguro</p></div></div>}

    <footer className="bg-plum-deep px-5 py-12 text-center text-primary-foreground"><img src={footerLogo.url} alt="O Poder do Parto — Mari Betioli" className="mx-auto w-48" /><p className="mt-6 text-xs text-primary-foreground">© 2025 Mariana Betioli. Todos os direitos reservados.</p><div className="mt-4 flex justify-center gap-2 text-gold"><Heart aria-hidden="true" className="size-4" /></div></footer>
  </div>;
}

function PlanCard({ name, subtitle, amount, cash, features, href, featured=false, onSelect }: { name:string; subtitle:string; amount:string; cash:string; features:string[]; href?:string; featured?:boolean; onSelect?:()=>void }) {
  return <article className={`relative flex flex-col rounded-md border bg-card p-6 shadow-sm sm:p-8 ${featured ? "border-2 border-primary shadow-xl lg:-translate-y-2" : "border-border"}`}>
    {featured && <span className="absolute right-6 top-0 -translate-y-1/2 rounded-md bg-primary px-4 py-2 text-xs font-bold uppercase text-primary-foreground">Mais escolhido</span>}
    <p className="text-xs font-bold uppercase text-primary">Plano {featured ? "completo" : "essencial"}</p><h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl">{name}</h3><p className="mt-3 min-h-16 text-muted-foreground">{subtitle}</p>
    <div className="mt-7 text-primary"><span className="text-xl font-bold">12x </span><span className="font-display text-4xl font-bold sm:text-5xl">R$ {amount}*</span><p className="mt-2 text-sm text-muted-foreground">ou <strong className="text-foreground">R$ {cash}</strong> à vista</p></div>
    <ul className="my-7 flex flex-1 flex-col gap-3">{features.map(feature => <li key={feature} className="flex gap-3"><Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-success" strokeWidth={3} /><span>{feature}</span></li>)}</ul>
    {onSelect ? <Button size="lg" variant="outline" onClick={onSelect} className="h-auto w-full py-4 text-base font-bold">Escolher o Essencial</Button> : <Button asChild size="lg" className="h-auto w-full py-4 text-base font-bold"><a href={href}>Quero a preparação completa</a></Button>}
    <small className="mt-3 text-center text-muted-foreground">Garantia incondicional de 7 dias</small>
  </article>;
}

function SectionTitle({ eyebrow, title, light=false, id }: { eyebrow:string; title:string; light?:boolean; id?:string }) {
  return <div className="text-center"><p className={`text-sm font-bold uppercase tracking-widest ${light ? "text-gold" : "text-primary"}`}>{eyebrow}</p><h2 id={id} className={`mx-auto mt-3 max-w-3xl font-display text-3xl font-bold sm:text-4xl ${light ? "text-primary-foreground" : "text-primary"}`}>{title}</h2></div>;
}