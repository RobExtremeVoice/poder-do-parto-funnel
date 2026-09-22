import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/guia-sales/sections/Hero";
import { ProblemAgitate } from "@/components/guia-sales/sections/ProblemAgitate";
import { SolutionInside } from "@/components/guia-sales/sections/SolutionInside";
import { AuthorityTestimonials } from "@/components/guia-sales/sections/AuthorityTestimonials";
import { Offer } from "@/components/guia-sales/sections/Offer";
import { FaqFinal } from "@/components/guia-sales/sections/FaqFinal";
import { StickyCta } from "@/components/guia-sales/StickyCta";
import { FAQS, PRODUCT_NAME } from "@/components/guia-sales/data";

const TITLE = "18 Perguntas para Fazer ao Obstetra | O Poder do Parto";
const DESCRIPTION =
  "As 18 perguntas essenciais para fazer ao obstetra, com exemplos de resposta comentados e sinais de atenção. Escolha sua equipe com informação. Acesso digital imediato por R$27.";


export const Route = createFileRoute("/guia")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:locale", content: "pt_BR" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: PRODUCT_NAME,
          description: DESCRIPTION,
          brand: { "@type": "Brand", name: "O Poder do Parto" },
          offers: {
            "@type": "Offer",
            price: "27.00",
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "3712",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: SalesPage,
});

function SalesPage() {
  return (
    <>
      <main className="pb-32 sm:pb-24">
        <Hero />
        <ProblemAgitate />
        <SolutionInside />
        <AuthorityTestimonials />
        <Offer />
        <FaqFinal />
      </main>
      <StickyCta />
    </>
  );
}
