import { z } from "zod";
import type { Route } from "./+types/api.contact";
import { ContactSchema } from "~/lib/contact-schema";
import { getResend, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } from "~/lib/resend";

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const formData = await request.formData();
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    website: formData.get("website") ?? undefined,
  };

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error).fieldErrors;
    return Response.json({ ok: false, fieldErrors }, { status: 400 });
  }

  // Honeypot
  if (parsed.data.website && parsed.data.website.length > 0) {
    return Response.json({ ok: true });
  }

  try {
    const resend = getResend();
    const { name, email, message } = parsed.data;
    await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `Nouveau message de ${name} — Portfolio`,
      html: `
        <div style="font-family: 'Inter', sans-serif; color: #0E0E0E; max-width: 600px;">
          <h1 style="font-family: 'Playfair Display', serif; color: #8E1B2C;">Nouveau message</h1>
          <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
          <p><strong>Email :</strong> ${escapeHtml(email)}</p>
          <p><strong>Message :</strong></p>
          <p style="white-space: pre-wrap; background: #F6F1EE; padding: 16px; border-left: 4px solid #8E1B2C; border-radius: 8px;">${escapeHtml(message)}</p>
        </div>
      `,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Resend error", err);
    return Response.json(
      { ok: false, error: "Envoi impossible pour le moment. Réessayez plus tard." },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
