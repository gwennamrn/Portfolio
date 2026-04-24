import { Resend } from "resend";

let client: Resend | null = null;

export function getResend(): Resend {
  if (!client) {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      throw new Error("RESEND_API_KEY n'est pas défini");
    }
    client = new Resend(key);
  }
  return client;
}

export const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "gwenmariamon@gmail.com";

export const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
