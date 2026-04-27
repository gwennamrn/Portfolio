import { z } from "zod";

export const ContactSchema = z.object({
  name: z
    .string({ error: "Votre nom est requis." })
    .trim()
    .min(2, "Votre nom est trop court.")
    .max(80, "Votre nom est trop long."),
  email: z
    .string({ error: "Votre email est requis." })
    .trim()
    .email("Email invalide."),
  message: z
    .string({ error: "Votre message est requis." })
    .trim()
    .min(10, "Votre message est trop court.")
    .max(2000, "Votre message est trop long."),
  website: z.string().max(0, "Bot detected").optional(), // honeypot
});

export type ContactInput = z.infer<typeof ContactSchema>;
