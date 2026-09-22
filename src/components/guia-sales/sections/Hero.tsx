import { Check, Star } from "lucide-react";
import { motion } from "motion/react";
import heroImg from "@/assets/guia/hero-gestante.jpg";
import logo from "@/assets/guia/logo-poder-do-parto.png.asset.json";
import { CtaButton } from "../CtaButton";

const badges = ["Acesso imediato", "Download digital", "Leia no celular"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-soft-glow pb-16 pt-8 sm:pb-24 sm:pt-12">
      <div className="mx-auto max-w-6xl px-5">
        <img
          src={logo.url}
          alt="O Poder do Parto"
          width={320}
          height={100}
          className="h-12 w-auto sm:h-14"
        />
      </div>

      <div className="mx-auto mt-8 grid max-w-6xl gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-brand-accent">
            Para gestantes
          </span>

          <h1 className="mt-6 text-[2rem] font-semibold leading-[1.08] sm:text-5xl lg:text-[3.3rem]">
            Antes de sair da sua próxima consulta de pré-natal…
            <span className="mt-3 block text-gradient-brand">
              Certifique-se de fazer estas 18 perguntas essenciais ao seu obstetra.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            O roteiro que mostra como o profissional realmente trabalha: 18 perguntas com exemplos
            de resposta alinhada às boas práticas, sinais de atenção e espaço para as suas
            anotações — mesmo quando a consulta dura só 10 minutos.
          </p>


          <div className="mt-8">
            <CtaButton />
            <p className="mt-3 text-sm text-muted-foreground">
              <span className="line-through">R$97</span>{" "}
              <span className="font-bold text-foreground">R$27 hoje</span> · garantia de 7 dias
            </p>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
            {badges.map((badge) => (
              <li key={badge} className="flex items-center gap-2 text-sm font-medium">
                <Check className="size-4 shrink-0 text-success" aria-hidden="true" />
                {badge}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-brand text-brand" />
              ))}
            </div>
            <span>Mais de 3.700 gestantes já usaram o guia</span>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <img
              src={heroImg}
              alt="Gestante lendo o guia de perguntas no celular durante o pré-natal"
              width={1024}
              height={1280}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="glass-card absolute -bottom-5 left-4 right-4 rounded-2xl px-5 py-4 sm:left-8 sm:right-auto sm:max-w-xs">
            <p className="font-display text-lg font-semibold">18 perguntas. 4 blocos.</p>
            <p className="text-sm text-muted-foreground">
              Respostas comentadas + espaço para anotar.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
