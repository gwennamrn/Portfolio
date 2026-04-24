import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetcher } from "react-router";
import { ContactSchema, type ContactInput } from "~/lib/contact-schema";
import { Cherry } from "~/components/cherry/Cherry";
import { COLORS } from "~/lib/colors";

export function meta() {
  return [
    { title: "Contact — Gwennaëlle" },
    {
      name: "description",
      content: "Contactez Gwennaëlle pour un projet, une collaboration ou un échange.",
    },
  ];
}

function useContactCherries() {
  const [items, setItems] = useState<
    Array<{ id: number; left: number; size: number; delay: number; duration: number }>
  >([]);
  useEffect(() => {
    setItems(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: (i / 12) * 100 + Math.random() * 6 - 3,
        size: 28 + Math.random() * 32,
        delay: Math.random() * 8,
        duration: 12 + Math.random() * 8,
      })),
    );
  }, []);
  return items;
}

function ContactFallingCherries() {
  const cherries = useContactCherries();
  if (cherries.length === 0) {
    return (
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden motion-reduce:hidden" />
    );
  }
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden motion-reduce:hidden">
      {cherries.map((c) => (
        <motion.div
          key={c.id}
          initial={{ y: "-10%", opacity: 0, rotate: 0 }}
          animate={{ y: "110vh", opacity: [0, 0.12, 0.12, 0], rotate: 180 }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-0"
          style={{ left: `${c.left}%` }}
        >
          <Cherry size={c.size} color={COLORS.cherry} opacity={1} />
        </motion.div>
      ))}
    </div>
  );
}

export default function Contact() {
  const fetcher = useFetcher<{ ok: boolean; fieldErrors?: Record<string, string[]>; error?: string }>();
  const isSubmitting = fetcher.state !== "idle";
  const isSuccess = fetcher.data?.ok === true;
  const serverError = fetcher.data?.ok === false ? fetcher.data?.error : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (isSuccess) reset();
  }, [isSuccess, reset]);

  const onValid = (_data: ContactInput) => {
    if (formRef.current) {
      fetcher.submit(formRef.current, { method: "post", action: "/api/contact" });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ContactFallingCherries />

      <section
        aria-labelledby="contact-heading"
        className="relative z-10 mx-auto max-w-[600px] px-5 py-[120px]"
      >
        <h1
          id="contact-heading"
          className="mb-10 text-center font-serif font-normal"
          style={{ fontSize: 40, color: COLORS.text }}
        >
          Contact
        </h1>

        <div className="mb-12 flex flex-col items-center gap-5 text-center">
          <p className="text-lg opacity-80" style={{ color: COLORS.text }}>
            Une idée ? Un projet ? N'hésitez pas à me contacter.
          </p>
          <address className="flex flex-wrap justify-center gap-8 not-italic">
            <a
              href="mailto:gwenmariamon@gmail.com"
              className="flex items-center gap-2.5 font-semibold no-underline"
              style={{ color: COLORS.text }}
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(107, 15, 26, 0.1)" }}
              >
                <Mail size={18} color={COLORS.red} />
              </span>
              gwenmariamon@gmail.com
            </a>
            <a
              href="tel:+262692406850"
              className="flex items-center gap-2.5 font-semibold no-underline"
              style={{ color: COLORS.text }}
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "rgba(107, 15, 26, 0.1)" }}
              >
                <Phone size={18} color={COLORS.red} />
              </span>
              0692 40 68 50
            </a>
          </address>
        </div>

        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            role="status"
            className="flex flex-col items-center gap-3 rounded-2xl bg-[#E8F5E9] p-10 text-center"
            style={{ color: "#2E7D32" }}
          >
            <CheckCircle2 size={40} />
            <h3 className="font-serif text-2xl">Merci !</h3>
            <p>Votre message a bien été envoyé. Je vous réponds très vite.</p>
          </motion.div>
        ) : (
          <fetcher.Form
            ref={formRef}
            method="post"
            action="/api/contact"
            onSubmit={handleSubmit(onValid)}
            className="flex flex-col gap-5"
            noValidate
          >
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-10000px", width: 1, height: 1, opacity: 0 }}
              {...register("website")}
            />

            <Field label="Nom" error={errors.name?.message}>
              <input
                type="text"
                placeholder="Nom"
                autoComplete="name"
                className="w-full rounded-[15px] border border-[#ddd] bg-white p-5 font-sans text-base"
                {...register("name")}
              />
            </Field>

            <Field label="Email" error={errors.email?.message}>
              <input
                type="email"
                placeholder="Email"
                autoComplete="email"
                className="w-full rounded-[15px] border border-[#ddd] bg-white p-5 font-sans text-base"
                {...register("email")}
              />
            </Field>

            <Field label="Message" error={errors.message?.message}>
              <textarea
                rows={5}
                placeholder="Message"
                className="w-full resize-y rounded-[15px] border border-[#ddd] bg-white p-5 font-sans text-base"
                {...register("message")}
              />
            </Field>

            {serverError && (
              <p
                role="alert"
                className="flex items-center gap-2 rounded-xl p-3 text-sm"
                style={{ backgroundColor: "#FDECEA", color: "#C62828" }}
              >
                <AlertCircle size={16} />
                {serverError}
              </p>
            )}

            <motion.button
              whileHover={{ boxShadow: "0 0 20px rgba(107, 15, 26, 0.4)" }}
              transition={{ duration: 0.5 }}
              type="submit"
              disabled={isSubmitting}
              className="rounded-[15px] border-0 p-5 font-sans text-lg font-semibold disabled:opacity-60"
              style={{ backgroundColor: COLORS.red, color: COLORS.white }}
            >
              {isSubmitting ? "Envoi..." : "Envoyer"}
            </motion.button>
          </fetcher.Form>
        )}
      </section>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="sr-only">{label}</label>
      {children}
      {error && (
        <p role="alert" className="mt-1 text-sm" style={{ color: "#C62828" }}>
          {error}
        </p>
      )}
    </div>
  );
}
