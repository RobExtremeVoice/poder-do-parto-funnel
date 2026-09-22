import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Baby,
  BadgeCheck,
  Check,
  CircleCheck,
  Clock,
  Mail,
  PartyPopper,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/guia-sales/Reveal";
import logoPoderDoParto from "@/assets/guia/logo-poder-do-parto.png.asset.json";
import logoBranca from "@/assets/guia/logo-branca.png.asset.json";
import marianaFoto from "@/assets/guia/mariana-betioli.png.asset.json";
import capaLivro from "@/assets/guia/capa-livro.jpeg.asset.json";

export const Route = createFileRoute("/guia/obrigado")({
  head: () => ({
    meta: [
      { title: "Obrigada pela sua compra | O Poder do Parto" },
      {
        name: "description",
        content:
          "Seu acesso ao Guia 18 Perguntas foi confirmado. Confira seu e-mail e aproveite uma condição especial do curso O Poder do Parto.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Obrigada pela sua compra | O Poder do Parto" },
      {
        property: "og:description",
        content: "Acesso confirmado ao Guia 18 Perguntas para Fazer ao Obstetra.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ObrigadoPage,
});

const CHECKOUT_ESSENCIAL = "https://pay.hotmart.com/X88395451D?off=o69s199w";
const CHECKOUT_COMPLETO = "https://pay.hotmart.com/X88395451D?off=7skbnr37";

const steps = [
  {
    icon: Mail,
    title: "1. Abra seu e-mail",
    text: "Enviamos seu acesso para o e-mail usado na compra. O remetente é a Hotmart.",
  },
  {
    icon: Smartphone,
    title: "2. Salve nos favoritos",
    text: "O guia abre direto no navegador do celular. Salve para abrir na sala de espera.",
  },
  {
    icon: Clock,
    title: "3. Não achou? Veja o spam",
    text: "Em alguns minutos o e-mail chega. Se não aparecer, confira spam e promoções.",
  },
];

const modules = [
  ["Módulo 1", "Primeiros Passos", "Entenda tudo sobre a jornada que está começando."],
  ["Módulo 2", "A Realidade do Parto", "Como funciona o sistema e como garantir um parto respeitoso."],
  ["Módulo 3", "Preparo Emocional", "Trabalhe o medo, a ansiedade e fortaleça sua confiança."],
  ["Módulo 4", "Como Funciona o Parto", "Identifique e saiba o que fazer em cada fase do trabalho de parto."],
  ["Módulo 5", "O Corpo na Gravidez", "Cuide de si e prepare-se fisicamente para o parto."],
  ["Módulo 6", "Indução & Cesárea", "Indicações, intervenções e parto normal após cesárea."],
  ["Módulo 7", "Técnicas de Alívio da Dor", "Respiração, massagem, acupressão e métodos naturais."],
  ["Módulo 8", "Plano de Parto", "Crie um plano de parto que funciona e seja respeitado."],
] as const;

const bonuses = [
  "Posições para encaixar o bebê",
  "Massagem com convidada especialista",
  "Preparando o seu acompanhante",
  "Comunidade no WhatsApp",
  "O pós-parto",
  "Respiração na gravidez e no parto",
  "10 ensinamentos para o bebê dormir melhor",
];

const depoimentos = [
  {
    nome: "Camila R.",
    texto:
      "Cheguei no parto sabendo exatamente o que estava acontecendo em cada fase. Fiz o curso inteiro no terceiro trimestre e foi a melhor decisão.",
  },
  {
    nome: "Fernanda L.",
    texto:
      "Meu marido assistiu comigo e virou um acompanhante de verdade. Na maternidade ele sabia o que perguntar e como me ajudar.",
  },
  {
    nome: "Juliana M.",
    texto:
      "Depois de uma primeira cesárea desnecessária, consegui meu parto normal. As aulas sobre indução e intervenções mudaram tudo.",
  },
];

const faqs: Array<[string, string]> = [
  [
    "Quando recebo o acesso do guia?",
    "O acesso é enviado por e-mail em alguns minutos após a confirmação do pagamento. Se não encontrar, verifique as caixas de spam e promoções.",
  ],
  [
    "O curso O Poder do Parto é diferente do guia?",
    "Sim. O guia foca nas conversas com o obstetra. O curso é uma preparação completa: trabalho de parto, alívio da dor, plano de parto, acompanhante e pós-parto, com mais de 70 aulas.",
  ],
  [
    "Qual é a diferença entre Essencial e Completo?",
    "O Essencial dá acesso ao curso completo. O Completo inclui tudo do Essencial e também o Mari com Você: um canal direto pelo WhatsApp com a Mariana Betioli durante a gestação, até o parto.",
  ],
  [
    "Por quanto tempo tenho acesso?",
    "O acesso é vitalício. Você assiste no seu ritmo e pode rever sempre que precisar.",
  ],
  [
    "E se eu não gostar?",
    "Você tem 7 dias de garantia incondicional. Basta solicitar o reembolso dentro do prazo, sem burocracia.",
  ],
];

function OfferButton({
  href,
  children,
  outline = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  outline?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl px-6 text-sm font-extrabold uppercase tracking-wide shadow-lift transition hover:scale-[1.02] sm:text-base ${
        outline
          ? "border-2 border-primary bg-card text-primary hover:bg-secondary"
          : "bg-brand-gradient text-primary-foreground"
      } ${className}`}
    >
      {children}
      <ArrowRight className="size-5 shrink-0" />
    </a>
  );
}

function ObrigadoPage() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      {/* ===== CONFIRMAÇÃO ===== */}
      <header className="border-b border-border/60 bg-card/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-center px-4">
          <img
            src={logoPoderDoParto.url}
            alt="O Poder do Parto"
            width={1600}
            height={531}
            className="h-9 w-auto object-contain"
          />
        </div>
      </header>

      <section className="px-4 pb-14 pt-12 md:pb-20 md:pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="mx-auto grid size-20 place-items-center rounded-full bg-success/15 text-success">
              <CircleCheck className="size-11" strokeWidth={2.2} />
            </div>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-secondary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <PartyPopper className="size-4" /> Pagamento confirmado
            </p>
            <h1 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
              Obrigada pela sua compra! 🎉
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Seu acesso ao <strong className="text-foreground">Guia 18 Perguntas para Fazer ao
              Obstetra</strong> foi enviado para o seu e-mail. Siga os passos abaixo para começar:
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }) => (
              <Reveal key={title}>
                <div className="glass-card h-full rounded-2xl p-6 text-left">
                  <div className="mb-4 grid size-11 place-items-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h2 className="font-display text-lg font-semibold">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OFERTA ESPECIAL ===== */}
      <section className="bg-secondary/60 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">
              <Sparkles className="size-4" /> Só nesta página
            </p>
            <h2 className="mt-6 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Enquanto seu acesso chega…{" "}
              <span className="text-gradient-brand">prepare-se para o parto por completo</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              O guia te ajuda a conversar com o obstetra. Mas e no dia do parto? O{" "}
              <strong className="text-foreground">curso O Poder do Parto</strong> é a preparação
              completa da Dra. Mariana Betioli — do primeiro trimestre ao pós-parto — com uma
              condição especial para quem acabou de garantir o guia.
            </p>
          </Reveal>

          {/* Cards de plano */}
          <div className="mt-12 grid items-stretch gap-6 text-left md:grid-cols-2">
            <Reveal>
              <article className="flex h-full flex-col rounded-2xl border-2 border-border bg-card p-7 md:p-8">
                <p className="text-sm font-bold uppercase tracking-wider text-primary">
                  Plano Essencial
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold">Poder do Parto Essencial</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Para compreender o parto, reconhecer escolhas e chegar mais preparada.
                </p>
                <div className="mt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold">12x</span>
                    <span className="font-display text-4xl font-semibold sm:text-5xl">R$ 30,72*</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    ou <strong className="text-foreground">R$ 297,00</strong> à vista
                  </p>
                </div>
                <div className="my-6 h-px bg-border" />
                <ul className="flex-1 space-y-3">
                  {[
                    "Curso completo (mais de 70 aulas)",
                    "Todos os 7 bônus exclusivos",
                    "Materiais de apoio e modelos para download",
                    "Acesso vitalício",
                    "Garantia incondicional de 7 dias",
                  ].map((f) => (
                    <li key={f} className="flex gap-3 text-sm leading-relaxed">
                      <Check className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>
                <OfferButton href={CHECKOUT_ESSENCIAL} outline className="mt-7">
                  Escolher o Essencial
                </OfferButton>
              </article>
            </Reveal>

            <Reveal>
              <article className="relative flex h-full flex-col rounded-2xl border-2 border-primary bg-primary p-7 text-primary-foreground shadow-lift md:-translate-y-2 md:p-8">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-background">
                  Mais escolhido
                </span>
                <p className="text-sm font-bold uppercase tracking-wider text-primary-foreground/80">
                  Plano Completo
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold">Poder do Parto Completo</h3>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">
                  Todo o curso e a tranquilidade de falar diretamente com a Mari durante a gestação.
                </p>
                <div className="mt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold">12x</span>
                    <span className="font-display text-4xl font-semibold sm:text-5xl">R$ 40,75*</span>
                  </div>
                  <p className="mt-1 text-sm text-primary-foreground/75">
                    ou <strong className="text-primary-foreground">R$ 394,00</strong> à vista
                  </p>
                </div>
                <div className="my-6 h-px bg-primary-foreground/20" />
                <ul className="flex-1 space-y-3">
                  {[
                    "Tudo do Plano Essencial (curso + 7 bônus)",
                    "Mari com Você: WhatsApp direto com a Mariana Betioli",
                    "Mensagens de texto e áudio durante a gestação, até o parto",
                    "Acesso vitalício ao curso e atualizações",
                    "Garantia incondicional de 7 dias",
                  ].map((f) => (
                    <li key={f} className="flex gap-3 text-sm leading-relaxed">
                      <Check className="mt-0.5 size-5 shrink-0" strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={CHECKOUT_COMPLETO}
                  className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-card px-6 text-sm font-extrabold uppercase tracking-wide text-primary shadow-lift transition hover:scale-[1.02] sm:text-base"
                >
                  Quero a preparação completa
                  <ArrowRight className="size-5 shrink-0" />
                </a>
              </article>
            </Reveal>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            *Parcelamento com acréscimo da plataforma. Consulte as condições no checkout.
          </p>
        </div>
      </section>

      {/* ===== DENTRO DO CURSO ===== */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-primary">
                Por dentro do curso
              </p>
              <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Uma preparação completa, passo a passo
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map(([num, title, text]) => (
              <Reveal key={num}>
                <article className="glass-card h-full rounded-2xl p-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">{num}</span>
                  <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 rounded-2xl border border-primary/20 bg-secondary/60 p-6 md:p-8">
              <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-primary">
                <Sparkles className="size-4" /> E mais 7 bônus exclusivos
              </p>
              <div className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {bonuses.map((b, i) => (
                  <p key={b} className="flex gap-2.5 text-sm leading-relaxed">
                    <BadgeCheck className="mt-0.5 size-4.5 shrink-0 text-primary" />
                    <span>
                      <strong className="font-semibold">Bônus {i + 1}:</strong> {b}
                    </span>
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== AUTORA ===== */}
      <section className="bg-muted/60 px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <Reveal>
            <div className="relative mx-auto max-w-xs md:max-w-none">
              <div className="absolute -inset-3 -z-10 rounded-2xl bg-secondary" />
              <img
                src={marianaFoto.url}
                alt="Dra. Mariana Betioli, obstetriz e criadora do O Poder do Parto"
                loading="lazy"
                width={294}
                height={300}
                className="aspect-[4/5] w-full rounded-2xl object-cover"
              />
            </div>
          </Reveal>
          <Reveal>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary">
                Sua especialista
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Dra. Mariana Betioli
              </h2>
              <p className="mt-3 text-lg font-bold text-primary">
                19 anos dedicados à assistência ao parto e à saúde da mulher
              </p>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                Com experiência no Brasil, em Portugal e nos Estados Unidos, Mariana já acompanhou
                centenas de partos em hospitais, casas de parto e partos domiciliares. Sua missão é
                tornar o conhecimento acessível para que cada família participe do nascimento com
                mais consciência e respeito.
              </p>
              <blockquote className="mt-6 border-l-4 border-primary pl-5 font-display text-xl font-medium leading-relaxed">
                “Preparar-se não é buscar um parto perfeito. É construir recursos para viver cada
                escolha com informação, apoio e protagonismo.”
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== DEPOIMENTOS ===== */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-primary">
                Histórias reais
              </p>
              <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Quem se preparou, viveu diferente
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {depoimentos.map((d) => (
              <Reveal key={d.nome}>
                <figure className="glass-card flex h-full flex-col rounded-2xl p-6">
                  <div className="flex gap-1 text-primary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    “{d.texto}”
                  </blockquote>
                  <figcaption className="mt-4 text-sm font-bold">{d.nome}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GARANTIA ===== */}
      <section className="px-4 pb-16 md:pb-24">
        <Reveal>
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-7 rounded-2xl bg-secondary/70 p-8 text-center md:flex-row md:p-12 md:text-left">
            <div className="grid size-24 shrink-0 place-items-center rounded-full border-4 border-primary bg-card text-primary">
              <ShieldCheck className="size-12" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-primary">
                Seu risco é zero
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
                Garantia incondicional de 7 dias
              </h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Entre, assista às primeiras aulas e conheça a metodologia. Se o curso não fizer
                sentido para você, solicite o reembolso dentro do prazo — sem burocracia e sem
                perguntas.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-muted/60 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="mb-10 text-center">
              <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-primary">
                Dúvidas frequentes
              </p>
              <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Antes de decidir
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <Accordion type="single" collapsible className="rounded-2xl border bg-card px-5 md:px-8">
              {faqs.map(([q, a], i) => (
                <AccordionItem key={q} value={`faq_${i}`}>
                  <AccordionTrigger className="py-5 text-left text-base font-bold md:text-lg">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 leading-relaxed text-muted-foreground">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="bg-primary px-4 py-16 text-center text-primary-foreground md:py-24">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <Baby className="mx-auto size-12" />
            <h2 className="mt-6 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Você não precisa chegar ao parto sem saber o que esperar.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-primary-foreground/80 md:text-lg">
              O guia já é seu. Agora dê o próximo passo e prepare-se por completo — corpo, mente e
              plano de parto.
            </p>
            <div className="mx-auto mt-8 grid max-w-xl gap-4 sm:grid-cols-2">
              <a
                href={CHECKOUT_ESSENCIAL}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border-2 border-primary-foreground/40 px-6 text-sm font-extrabold uppercase tracking-wide transition hover:bg-primary-foreground/10"
              >
                Essencial · 12x R$ 30,72
              </a>
              <a
                href={CHECKOUT_COMPLETO}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-card px-6 text-sm font-extrabold uppercase tracking-wide text-primary shadow-lift transition hover:scale-[1.02]"
              >
                Completo · 12x R$ 40,75 <ArrowRight className="size-5" />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-foreground px-4 pb-32 pt-12 text-background/70 md:px-8 lg:pb-12">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <div>
            <img
              src={logoBranca.url}
              alt="O Poder do Parto"
              width={1600}
              height={531}
              className="h-9 w-auto object-contain"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Educação para uma experiência de nascimento mais consciente, respeitosa e informada.
            </p>
          </div>
          <div>
            <p className="font-bold text-background">Atendimento</p>
            <p className="mt-3 text-sm">Suporte: atendimento@poderdoparto.com.br</p>
            <p className="mt-2 text-sm">Dados cadastrais e CNPJ: consulte no checkout</p>
          </div>
          <div>
            <p className="font-bold text-background">Informações legais</p>
            <div className="mt-3 flex gap-4 text-sm">
              <a href="https://www.poderdoparto.com.br/termos" className="underline">
                Termos de Uso
              </a>
              <a href="https://www.poderdoparto.com.br/privacidade" className="underline">
                Política de Privacidade
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-5xl border-t border-background/15 pt-7 text-xs leading-relaxed">
          <p>
            O conteúdo possui finalidade educacional e não substitui consultas, diagnóstico,
            orientação ou acompanhamento de profissionais de saúde. © 2026 O Poder do Parto. Todos
            os direitos reservados.
          </p>
        </div>
      </footer>

      {/* ===== STICKY CTA MOBILE ===== */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 lg:hidden ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
        aria-hidden={!showSticky}
      >
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold text-muted-foreground">
              Poder do Parto Completo
            </p>
            <p className="truncate text-sm font-extrabold">12x R$ 40,75*</p>
          </div>
          <a
            href={CHECKOUT_COMPLETO}
            tabIndex={showSticky ? 0 : -1}
            className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-2xl bg-brand-gradient px-5 text-sm font-extrabold text-primary-foreground"
          >
            Quero me preparar <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
