import { motion } from "motion/react";
import { Cherry } from "~/components/cherry/Cherry";
import { COLORS } from "~/lib/colors";

function InstagramIcon({ size = 22, strokeWidth = 1.5 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.72a8.17 8.17 0 0 0 4.78 1.52V6.79a4.85 4.85 0 0 1-1.01-.1z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/gwennamrn", icon: "instagram" as const },
  { label: "TikTok", href: "https://www.tiktok.com/@gwennamrn", icon: "tiktok" as const },
];

export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-6 px-10 py-12">
      <span
        className="flex-shrink-0 select-none font-serif text-[22px] tracking-[0.03em]"
        style={{ color: COLORS.bordeaux }}
      >
        Gwennaëlle
      </span>

      <p
        className="m-0 min-w-[160px] flex-1 text-center text-base font-light italic leading-[1.5] tracking-[0.02em] opacity-85"
        style={{ color: COLORS.bordeauxLight }}
      >
        {"« Que du positif avec un brin de "}
        <span className="inline-flex items-center gap-1 align-middle">
          folie
          <Cherry size={15} color={COLORS.bordeaux} opacity={0.7} />
        </span>
        {" et beaucoup de passion »"}
      </p>

      <div
        className="flex flex-shrink-0 items-center gap-5"
        role="list"
        aria-label="Réseaux sociaux"
      >
        {SOCIAL_LINKS.map(({ label, href, icon }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            role="listitem"
            whileHover={{ scale: 1.2, opacity: 1 }}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex items-center justify-center no-underline"
            style={{ color: COLORS.bordeaux }}
          >
            {icon === "instagram" ? (
              <InstagramIcon size={22} strokeWidth={1.5} />
            ) : (
              <TikTokIcon size={22} />
            )}
          </motion.a>
        ))}
      </div>
    </footer>
  );
}
