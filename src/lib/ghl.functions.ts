import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GHL_UPSERT_URL = "https://services.leadconnectorhq.com/contacts/upsert";

const leadSchema = z.object({
  name: z.string().trim().max(120).optional(),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional(),
});

// GoHighLevel exige telefone em E.164. Assume Brasil (+55) quando o DDI não foi digitado.
function toE164(raw: string | undefined): string | undefined {
  const digits = (raw ?? "").replace(/\D/g, "");
  if (digits.length < 10) return undefined;
  if (digits.startsWith("55") && digits.length >= 12) return `+${digits}`;
  return `+55${digits}`;
}

// Cria ou atualiza o contato no GoHighLevel com a tag "Quiz". O token fica só no servidor.
export const createGhlLead = createServerFn({ method: "POST" })
  .validator(leadSchema)
  .handler(async ({ data }) => {
    const token = process.env["GHL_PRIVATE_TOKEN"];
    const locationId = process.env["GHL_LOCATION_ID"];
    if (!token || !locationId) {
      console.error("[ghl] GHL_PRIVATE_TOKEN ou GHL_LOCATION_ID não configurados");
      return { ok: false as const };
    }

    const email = data.email || undefined;
    const phone = toE164(data.phone);
    // Sem e-mail nem telefone não há lead para criar.
    if (!email && !phone) return { ok: false as const };

    const response = await fetch(GHL_UPSERT_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: "2021-07-28",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        locationId,
        name: data.name || undefined,
        email,
        phone,
        source: "Quiz O Poder do Parto",
        tags: ["Quiz"],
      }),
    });

    if (!response.ok) {
      console.error("[ghl] upsert falhou", response.status, await response.text());
      return { ok: false as const };
    }
    return { ok: true as const };
  });
