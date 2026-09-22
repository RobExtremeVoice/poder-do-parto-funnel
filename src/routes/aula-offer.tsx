import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  Check,
  CheckCircle2,
  Heart,
  ShieldCheck,
} from "lucide-react";

import heroImage from "@/assets/gestante-hero.jpg";
import logo from "@/assets/logo.png.asset.json";
import mariWithYouImage from "@/assets/mari-com-voce.png.asset.json";
import mariPhoto from "@/assets/mari-betioli.png.asset.json";
import testimonialWomen from "@/assets/depoimentos-mulheres.png.asset.json";
import testimonial1 from "@/assets/depoimento-1.jpg.asset.json";
import testimonial2 from "@/assets/depoimento-2.jpg.asset.json";
import testimonial3 from "@/assets/depoimento-3.jpg.asset.json";
import testimonial4 from "@/assets/depoimento-4.jpg.asset.json";
import modulo1 from "@/assets/modulo-1.jpg.asset.json";
import modulo2 from "@/assets/modulo-2.jpg.asset.json";
import modulo3 from "@/assets/modulo-3.jpg.asset.json";
import modulo4 from "@/assets/modulo-4.jpg.asset.json";
import modulo6 from "@/assets/modulo-6.jpg.asset.json";
import modulo7 from "@/assets/modulo-7.jpg.asset.json";
import modulo8 from "@/assets/modulo-8.jpg.asset.json";
import bonus1 from "@/assets/bonus-1.jpg.asset.json";
import bonus2 from "@/assets/bonus-2.jpg.asset.json";
import bonus3 from "@/assets/bonus-3.jpg.asset.json";
import bonus4 from "@/assets/bonus-4.jpg.asset.json";
import bonus5 from "@/assets/bonus-5.jpg.asset.json";
import bonus6 from "@/assets/bonus-6.jpg.asset.json";
import bonus7 from "@/assets/bonus-7.jpg.asset.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/aula-offer")({
  head: () => ({
    meta: [
      { title: "Escolha sua preparação | O Poder do Parto" },
      {
        name: "description",
        content:
          "Escolha a preparação ideal para viver o parto com mais segurança, consciência e confiança.",
      },
      { property: "og:title", content: "Escolha sua preparação | O Poder do Parto" },
      {
        property: "og:description",
        content:
          "Escolha a preparação ideal para viver o parto com mais segurança, consciência e confiança.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preload", as: "image", href: heroImage },
    ],
  }),
  component: LandingPage,
});

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

const modules = [
  ["Módulo 1", "Primeiros Passos", "Entenda tudo sobre a jornada que está começando.", modulo1.url],
  ["Módulo 2", "A Realidade do Parto", "Descubra como funciona o sistema e garanta um parto respeitoso.", modulo2.url],
  ["Módulo 3", "Preparo Emocional", "Trabalhe o medo, a ansiedade e fortaleça sua confiança.", modulo3.url],
  ["Módulo 4", "Como Funciona o Parto", "Identifique e saiba o que fazer em cada fase do trabalho de parto.", modulo4.url],
  ["Módulo 5", "O Corpo na Gravidez", "Cuide de si e prepare-se fisicamente para o parto.", modulo4.url],
  ["Módulo 6", "Indução & Cesárea", "Entenda indicações, intervenções e parto normal após cesárea.", modulo6.url],
  ["Módulo 7", "Técnicas de Alívio da Dor", "Respiração, massagem, acupressão e outros métodos naturais.", modulo7.url],
  ["Módulo 8", "Plano de Parto", "Crie um plano de parto que funciona e seja respeitado.", modulo8.url],
] as const;

const bonuses = [
  ["Bônus 1", "Posições para encaixar o bebê", bonus1],
  ["Bônus 2", "Massagem com convidada especialista", bonus2],
  ["Bônus 3", "Preparando o seu acompanhante", bonus3],
  ["Bônus 4", "Comunidade no WhatsApp", bonus4],
  ["Bônus 5", "O pós-parto", bonus5],
  ["Bônus 6", "Respiração na gravidez e no parto", bonus6],
  ["Bônus 7", "10 ensinamentos para o bebê dormir melhor", bonus7],
] as const;

const testimonials = [
  [testimonial1, "Aluna conta que fez os exercícios recomendados e sua bebê nasceu após um parto normal"],
  [testimonial2, "Aluna agradece pelas orientações que a ajudaram a manter a calma e chegar ao hospital no momento certo"],
  [testimonial3, "Aluna recomenda o curso da Mari e destaca a importância de informação, movimento e hidratação"],
  [testimonial4, "Aluna com 38 semanas elogia o curso enquanto aguarda a chegada do bebê"],
] as const;

const checkoutWindowName = "hotmart-checkout";

function openCheckout(event: React.MouseEvent<HTMLAnchorElement>) {
  if (typeof window === "undefined" || window.matchMedia("(max-width: 767px)").matches) return;

  event.preventDefault();
  const width = Math.min(1080, window.screen.availWidth - 48);
  const height = Math.min(760, window.screen.availHeight - 48);
  const left = Math.max(24, Math.round((window.screen.availWidth - width) / 2));
  const top = Math.max(24, Math.round((window.screen.availHeight - height) / 2));
  const checkout = window.open(
    event.currentTarget.href,
    checkoutWindowName,
    `popup=yes,width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
  );

  if (checkout) {
    checkout.opener = null;
    checkout.focus();
    return;
  }

  window.location.assign(event.currentTarget.href);
}

const faqs = [
  {
    question: "Qual é a diferença entre Essencial e Completo?",
    answer:
      "O Essencial dá acesso ao curso O Poder do Parto. O Completo inclui todo o conteúdo do Essencial e também o Mari com Você: um canal direto pelo WhatsApp para falar com a Mari durante a gestação, até o parto.",
  },
  {
    question: "Por quanto tempo tenho acesso?",
    answer:
      "Os dois planos foram estruturados com acesso vitalício, para você rever o conteúdo sempre que precisar.",
  },
  {
    question: "Posso fazer mesmo estando no final da gestação?",
    answer:
      "Sim. As aulas são organizadas para você priorizar os temas mais importantes conforme o momento da sua gestação.",
  },
  {
    question: "O curso substitui o acompanhamento médico?",
    answer:
      "Não. O conteúdo é educativo e não substitui pré-natal, consulta, diagnóstico ou orientação da equipe responsável pela sua assistência.",
  },
  {
    question: "Como funciona a garantia?",
    answer:
      "Você tem sete dias após a compra para conhecer o conteúdo e solicitar o reembolso, conforme as condições apresentadas no checkout.",
  },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={light ? "eyebrow text-primary-foreground/90" : "eyebrow text-primary"}>
      {children}
    </p>
  );
}

function PlanCard({
  id,
  name,
  subtitle,
  amount,
  cash,
  features,
  href,
  featured = false,
  onSelect,
}: {
  id?: string;
  name: string;
  subtitle: string;
  amount: string;
  cash: string;
  features: string[];
  href: string;
  featured?: boolean;
  onSelect?: () => void;
}) {
  return (
    <article
      id={id}
      className={`relative flex scroll-mt-20 flex-col rounded-lg border bg-card p-5 shadow-sm sm:p-8 ${
        featured ? "border-2 border-primary shadow-xl lg:-translate-y-2" : "border-border"
      }`}
    >
      {featured && (
        <span className="absolute left-5 top-0 -translate-y-1/2 rounded-full bg-primary px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-wide text-primary-foreground sm:left-auto sm:right-6 sm:px-4 sm:py-2 sm:text-xs">
          Mais escolhido
        </span>
      )}
      <p className="mt-1 text-xs font-bold uppercase text-primary sm:mt-0">
        Plano {featured ? "completo" : "essencial"}
      </p>
      <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">{name}</h3>
      <p className="mt-3 text-muted-foreground sm:min-h-16">{subtitle}</p>
      <div className="mt-6 sm:mt-7">
        <div className="flex flex-wrap items-baseline gap-2 text-primary">
          <span className="text-lg font-bold sm:text-xl">12x</span>
          <span className="font-display text-3xl font-bold sm:text-5xl">R$ {amount}*</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          ou <strong className="text-foreground">R$ {cash}</strong> à vista
        </p>
      </div>
      <ul className="my-6 flex flex-1 flex-col gap-3 sm:my-7">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm sm:text-base">
            <Check className="mt-0.5 size-5 shrink-0 text-success" strokeWidth={3} aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {onSelect && !featured ? (
        <Button
          size="lg"
          variant="outline"
          onClick={onSelect}
          className="h-14 w-full rounded-full text-base font-bold shadow-none"
        >
          Escolher o Essencial
        </Button>
      ) : (
        <Button
          asChild
          size="lg"
          variant={featured ? "default" : "outline"}
          className="h-14 w-full rounded-full text-base font-bold shadow-none"
        >
           <a href={href} onClick={href.startsWith("https://pay.hotmart.com/") ? openCheckout : undefined}>
            {featured ? "Quero a preparação completa" : "Escolher o Essencial"}
          </a>
        </Button>
      )}
      <small className="mt-3 text-center text-muted-foreground">
        Garantia incondicional de 7 dias
      </small>
    </article>
  );
}

function LandingPage() {
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [fixedCtaHidden, setFixedCtaHidden] = useState(true);
  const heroCtaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = heroCtaRef.current;
    if (!target || typeof IntersectionObserver === "undefined") {
      setFixedCtaHidden(false);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setFixedCtaHidden(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (document.getElementById("meta-pixel")) return;
    const fb = document.createElement("script");
    fb.id = "meta-pixel";
    fb.text =
      "!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','340206031120534');fbq('track','PageView');";
    document.head.appendChild(fb);
  }, []);


  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <a
        href="#conteudo-principal"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-background px-4 py-3 font-bold text-foreground shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Pular para o conteúdo principal
      </a>
      <div className="bg-primary px-4 py-2.5 text-center text-xs font-bold leading-snug text-primary-foreground sm:text-sm">
        A aula terminou. Agora escolha como você quer se preparar.
      </div>

      <header className="page-wrap flex items-center justify-between gap-4 py-4 sm:py-5">
        <a href="#top" aria-label="O Poder do Parto — voltar ao início" className="inline-flex shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <img src={logo.url} alt="O Poder do Parto" className="w-32 sm:w-52" width={512} height={160} />
        </a>
        <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
          <CheckCircle2 className="size-4 shrink-0 text-success-dark" aria-hidden="true" />
          Ambiente seguro • Garantia de 7 dias
        </div>
      </header>

      <main id="conteudo-principal" tabIndex={-1}>
        <section className="relative overflow-hidden pb-16 pt-6 lg:pb-24 lg:pt-14">
          <div className="page-wrap grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
            <div className="relative z-10 text-center lg:text-left">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-success-soft px-3 py-1.5 text-xs font-bold text-success-dark sm:px-4 sm:py-2 sm:text-sm">
                <CheckCircle2 className="size-4 shrink-0 sm:size-5" aria-hidden="true" />
                Você concluiu a aula gratuita
              </div>
              <Eyebrow>Seu próximo passo</Eyebrow>
              <h1 className="mt-3 max-w-4xl font-display text-[2.1rem] font-semibold leading-[1.08] sm:text-5xl lg:text-6xl xl:text-7xl">
                Informação muda escolhas. <span className="text-primary">Preparação muda experiências.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0 lg:text-xl">
                Você já entendeu por que um parto seguro e respeitoso não acontece por acaso. Agora escolha o nível de preparação que faz sentido para você e para o seu bebê.
              </p>
              <div ref={heroCtaRef}>
                <Button asChild size="lg" className="mt-7 h-14 w-full rounded-full px-7 text-base font-bold shadow-lg sm:w-auto">
                  <a href="#planos">
                    Quero escolher minha preparação
                    <ArrowDown aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground sm:text-sm">
                Acesso vitalício • 7 dias de garantia • Pagamento seguro
              </p>
            </div>

            <div className="relative mx-auto h-[380px] w-full max-w-md sm:h-[440px] lg:h-[580px]">
              <div className="absolute inset-x-4 bottom-0 top-10 rotate-2 rounded-[46%_46%_18%_18%] bg-accent" />
              <img
                src={heroImage}
                alt="Gestante serena representando uma preparação consciente para o parto"
                width={1024}
                height={1280}
                fetchPriority="high"
                decoding="async"
                className="relative h-full w-full rounded-[46%_46%_18%_18%] object-cover object-top shadow-2xl"
              />
              <div className="absolute bottom-4 left-2 rounded-lg border border-primary-foreground/40 bg-background/90 px-3 py-2.5 shadow-lg backdrop-blur-sm sm:bottom-5 sm:left-[-1rem] sm:px-4 sm:py-3">
                <div className="flex items-center gap-3">
                   <Heart className="size-5 shrink-0 fill-primary text-primary" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold">Mais confiança para escolher</p>
                    <p className="text-xs text-muted-foreground">Informação para você e seu bebê</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 text-center sm:py-20">
          <div className="page-wrap max-w-4xl">
            <Eyebrow>A aula foi o começo</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Agora você precisa de um caminho claro até o dia do parto.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Sem outra aula longa e sem repetir o que você acabou de assistir. Aqui você compara as opções, entende o que recebe e escolhe como quer continuar sua preparação.
            </p>
          </div>
        </section>

        <section className="bg-muted py-16 sm:py-20 lg:py-24">
          <div className="page-wrap">
            <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
              <Eyebrow>Por dentro do curso</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
                Uma preparação completa, passo a passo
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {modules.map(([number, title, description, image]) => (
                <article
                  key={number}
                  className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
                >
                   <div className="aspect-video w-full overflow-hidden bg-secondary">
                     <img
                       src={image}
                       alt={`Capa do ${number}: ${title}`}
                       width={1024}
                       height={576}
                       className="h-full w-full object-contain"
                       loading="lazy"
                       decoding="async"
                     />
                   </div>
                  <div className="p-4 sm:p-5">
                    <span className="text-xs font-bold uppercase tracking-wide text-primary">
                      {number}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary py-16 text-primary-foreground sm:py-20 lg:py-24">
          <div className="page-wrap">
            <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
              <Eyebrow light>Bônus incríveis</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
                Recursos extras para você se sentir ainda mais segura
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {bonuses.map(([number, title, image]) => (
                <article
                  key={image.asset_id}
                  className="overflow-hidden rounded-lg bg-primary-foreground/10"
                >
                  <div className="aspect-video w-full overflow-hidden bg-primary-foreground/10">
                    <img
                      src={image.url}
                      alt={`Capa do ${number}: ${title}`}
                      width={1600}
                      height={900}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-3 text-center sm:p-4">
                    <p className="text-xs font-bold uppercase text-primary-foreground/90">{number}</p>
                    <h3 className="mt-1 text-sm font-bold leading-snug sm:text-base">{title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary py-16 text-secondary-foreground sm:py-20 lg:py-24">
          <div className="page-wrap grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
            <div>
              <Eyebrow>Exclusivo do plano Completo</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">Mari com Você</h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary-foreground sm:text-lg">
                No plano Completo, além de todo o conteúdo do curso, você tem um canal direto com a Mari para organizar perguntas, esclarecer dúvidas educativas e se preparar para conversar com sua equipe.
              </p>
              <ul className="my-6 grid gap-3 sm:my-7">
                {[
                  "Acompanhamento individual pelo WhatsApp",
                  "Mensagens de texto e áudio",
                  "Acesso da compra até o nascimento do bebê",
                  "Vagas limitadas para preservar a qualidade do atendimento",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                     <Check className="mt-0.5 size-5 shrink-0 text-success-dark" strokeWidth={3} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="h-14 w-full rounded-full px-7 text-base font-bold sm:w-auto">
                <a href="#plano-completo">Quero o plano Completo</a>
              </Button>
              <p className="mt-4 max-w-2xl text-xs text-secondary-foreground/90">
                Serviço educativo. Não substitui consulta, diagnóstico ou atendimento de emergência.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3 shadow-xl sm:p-4">
              <img
                src={mariWithYouImage.url}
                alt="Mari com Você — acompanhamento individual pelo WhatsApp até o parto"
                className="w-full rounded-md object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="page-wrap grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg border border-border bg-card p-3 shadow-lg sm:max-w-md sm:p-4">
              <img
                src={mariPhoto.url}
                alt="Mari Betioli segurando um modelo de bebê e uma bacia pélvica"
                className="aspect-square w-full rounded-md object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <Eyebrow>Quem vai te acompanhar</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">Mari Betioli</h2>
              <ul className="mt-6 grid gap-3 sm:mt-7 sm:grid-cols-2">
                {[
                  "19 anos trabalhando com gestantes",
                  "Obstetriz, doula e educadora perinatal",
                  "Experiência no Brasil, Portugal e EUA",
                  "Formação em Spinning Babies e Active Birth",
                ].map((item) => (
                  <li key={item} className="rounded-lg bg-muted p-4 text-sm font-semibold sm:p-5 sm:text-base">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-muted py-16 sm:py-20 lg:py-24">
          <div className="page-wrap">
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow>Depoimentos reais</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
                Mais de 1.700 mulheres transformadas
              </h2>
            </div>
            <img
              src={testimonialWomen.url}
              alt="Mulheres que participaram do Poder do Parto"
              className="mx-auto mt-8 max-h-56 max-w-full object-contain sm:max-h-72"
              loading="lazy"
              decoding="async"
            />
            <div className="mt-8 grid grid-cols-1 items-start gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-4">
              {testimonials.map(([image, description]) => (
                <img
                  key={image.asset_id}
                  src={image.url}
                  alt={description}
                  className="w-full rounded-lg border border-border bg-card shadow-sm"
                  loading="lazy"
                  decoding="async"
                />
              ))}
            </div>
          </div>
        </section>

        <section id="planos" className="scroll-mt-4 py-16 sm:py-24">
          <div className="page-wrap">
            <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
              <Eyebrow>Escolha sua experiência</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
                Qual preparação combina com você?
              </h2>
              <p className="mt-5 text-muted-foreground">
                Os dois planos oferecem o curso completo. No plano Completo, você também conta com um canal direto com a Mari durante a gestação.
              </p>
            </div>
            <div className="grid gap-8 pt-3 lg:grid-cols-2 lg:gap-7">
              <PlanCard
                name="O Poder do Parto Essencial"
                subtitle="Para quem quer compreender o parto, reconhecer escolhas e chegar mais preparada."
                amount="30,72"
                cash="297,00"
                features={essentialFeatures}
                href="#garantia"
                onSelect={() => setUpsellOpen(true)}
              />
              <PlanCard
                id="plano-completo"
                name="O Poder do Parto Completo"
                subtitle="Para quem quer todo o curso e a tranquilidade de poder falar diretamente com a Mari durante a gestação."
                amount="40,75"
                cash="394,00"
                features={completeFeatures}
                href="https://pay.hotmart.com/X88395451D?off=7skbnr37&checkoutMode=10"
                featured
              />
            </div>
          </div>
        </section>

        <section className="pb-16 sm:pb-24">
          <div className="page-wrap">
            <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
              <Eyebrow>Compare com calma</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">
                Veja a diferença entre os planos
              </h2>
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <table className="w-full table-fixed text-left text-[0.78rem] sm:text-base">
                <caption className="sr-only">Comparação dos benefícios dos planos Essencial e Completo</caption>
                <colgroup>
                  <col className="w-[52%] sm:w-[47%]" />
                  <col className="w-[24%] sm:w-[26.5%]" />
                  <col className="w-[24%] sm:w-[26.5%]" />
                </colgroup>
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="p-3 font-bold sm:p-5">O que você recebe</th>
                    <th scope="col" className="border-l border-border p-2 text-center font-bold sm:p-5">Essencial</th>
                    <th scope="col" className="border-l border-border p-2 text-center font-bold sm:p-5">Completo</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map(([label, essential, complete]) => (
                    <tr key={label} className="border-t border-border">
                      <th scope="row" className="p-3 font-medium leading-snug sm:p-5">{label}</th>
                      {[essential, complete].map((included, index) => (
                        <td key={index} className="border-l border-border p-2 text-center sm:p-5">
                          <span className="sr-only">{included ? "Incluído" : "Não incluído"}</span>
                          {included ? (
                            <Check className="mx-auto size-5 text-success-dark" strokeWidth={3} aria-hidden="true" />
                          ) : (
                            <span aria-hidden="true">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="garantia" className="page-wrap scroll-mt-6 pb-16 sm:pb-24">
          <div className="grid items-center gap-5 rounded-lg bg-success-soft p-6 sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-12">
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground sm:size-24">
               <ShieldCheck className="size-8 sm:size-11" aria-hidden="true" />
            </div>
            <div>
              <Eyebrow>Seu risco é zero</Eyebrow>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Experimente por 7 dias</h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                Acesse o conteúdo e conheça o método. Se sentir que não é para você, solicite o reembolso dentro do período de garantia.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-muted py-16 sm:py-24">
          <div className="page-wrap max-w-4xl">
            <div className="text-center">
              <Eyebrow>Dúvidas frequentes</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">Antes de escolher</h2>
            </div>
            <Accordion type="single" collapsible className="mt-8 grid gap-3 sm:mt-10">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`item-${index}`} className="rounded-lg border border-border bg-card px-4 sm:px-5">
                  <AccordionTrigger className="py-4 text-left text-[0.95rem] font-bold hover:no-underline sm:py-5 sm:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-16 text-center sm:py-24">
          <div className="page-wrap max-w-3xl">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl lg:text-5xl">Seu bebê só nasce uma vez</h2>
            <p className="mt-5 text-lg text-muted-foreground sm:text-xl">
              Escolha viver esse momento com mais informação e confiança.
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Você já deu o primeiro passo assistindo à aula. Agora escolha a preparação que vai acompanhar você até o parto.
            </p>
            <Button asChild size="lg" className="mt-8 h-14 w-full rounded-full px-7 text-base font-bold sm:w-auto">
              <a href="#planos">Comparar os planos novamente</a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 py-8 text-center text-xs text-muted-foreground sm:text-sm">
         <img src={logo.url} alt="O Poder do Parto" className="mx-auto mb-4 w-36 opacity-80 sm:w-44" width={512} height={160} loading="lazy" decoding="async" />
        <p className="mx-auto max-w-2xl leading-relaxed">© 2026 O Poder do Parto • Conteúdo educativo • Não substitui acompanhamento médico</p>
      </footer>

      <div
        className={`fixed inset-x-3 bottom-3 z-50 transition-all duration-300 sm:hidden ${
          fixedCtaHidden ? "pointer-events-none translate-y-4 opacity-0" : "translate-y-0 opacity-100"
        }`}
        aria-hidden={fixedCtaHidden || undefined}
      >
        <Button asChild size="lg" className="h-14 w-full rounded-full text-base font-bold shadow-xl" tabIndex={fixedCtaHidden ? -1 : 0}>
          <a href="#planos">Escolher meu plano</a>
        </Button>
      </div>

      <Dialog open={upsellOpen} onOpenChange={setUpsellOpen}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[26rem] overflow-y-auto rounded-lg p-5 sm:rounded-lg sm:p-6">
          <DialogHeader>
            <span className="eyebrow text-primary">Oferta especial — só agora</span>
            <DialogTitle className="font-display text-2xl leading-tight">
              O Poder do Parto Completo
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              Leve o acompanhamento direto com a Mari pelo WhatsApp junto com a sua preparação Essencial.
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg bg-success-soft px-4 py-4 text-center">
            <p className="text-sm text-muted-foreground line-through">de R$ 97,00</p>
            <p className="font-display text-4xl font-bold text-success-dark">
              por R$ 48,50
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-success-dark">50% de desconto</p>
          </div>
          <div className="grid gap-2.5">
            <Button asChild size="lg" className="h-14 w-full rounded-full text-base font-bold">
               <a href="https://pay.hotmart.com/X88395451D?off=y194vq5g&checkoutMode=10" onClick={openCheckout}>
                Sim, quero esta opção
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 w-full rounded-full text-sm font-bold">
               <a href="https://pay.hotmart.com/X88395451D?off=o69s199w&checkoutMode=10" onClick={openCheckout}>
                Continuar apenas com o Essencial
              </a>
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Garantia incondicional de 7 dias • Pagamento seguro
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}