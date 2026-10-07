// Extraído de /oferta para ser carregado sob demanda (está abaixo da dobra).
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { trackEvent } from "@/lib/tracking";

const faqs: Array<[string, string]> = [
  ["Qual é a diferença entre Essencial e Completo?", "O Essencial dá acesso ao curso O Poder do Parto. O Completo inclui todo o conteúdo do Essencial e também o Mari com Você: um canal direto pelo WhatsApp para falar com a Mari durante a gestação, até o parto."],
  ["Por quanto tempo tenho acesso?", "Os dois planos foram estruturados com acesso vitalício, para você rever o conteúdo sempre que precisar."],
  ["Posso fazer mesmo estando no final da gestação?", "Sim. As aulas são organizadas para você priorizar os temas mais importantes conforme o momento da sua gestação."],
  ["O curso substitui o acompanhamento médico?", "Não. O conteúdo é educativo e não substitui pré-natal, consulta, diagnóstico ou orientação da equipe responsável pela sua assistência."],
  ["Como funciona a garantia?", "Você tem sete dias após a compra para conhecer o conteúdo e solicitar o reembolso, conforme as condições apresentadas no checkout."],
];

export default function FaqAccordion() {
  return <Accordion type="single" collapsible className="rounded-2xl border bg-card px-5 md:px-8" onValueChange={(value) => value && trackEvent("faq_open", { question: value })}>{faqs.map(([q,a],i) => <AccordionItem key={q} value={`faq_${i+1}`}><AccordionTrigger className="py-5 text-base font-bold text-plum md:text-lg">{q}</AccordionTrigger><AccordionContent className="pb-5 leading-relaxed text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion>;
}
