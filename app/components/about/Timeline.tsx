import { memo } from "react";
import { COLORS } from "~/lib/colors";

const TIMELINE_STEPS = [
  {
    year: "2021 - 2024",
    title: "BAC Pro Métiers de la Mode",
    desc: "Mention Très Bien – Lycée Professionnel Isnelle Amelin (974 – La Réunion)",
  },
  {
    year: "2024 - 2026",
    title: "BTS Communication",
    desc: "École du Numérique (974 – La Réunion)",
  },
] as const;

export const Timeline = memo(function Timeline() {
  return (
    <section
      aria-labelledby="timeline-heading"
      className="mx-auto mb-24 max-w-[700px]"
    >
      <h2
        id="timeline-heading"
        className="mb-14 text-center font-serif font-semibold"
        style={{ fontSize: 40, color: COLORS.cherry }}
      >
        Mon parcours
      </h2>

      <div className="relative pl-16">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-5 top-0 w-[3px] rounded-[3px]"
          style={{ backgroundColor: COLORS.cherry }}
        />

        {TIMELINE_STEPS.map((step, i) => (
          <div
            key={step.year}
            className="relative"
            style={{ marginBottom: i === TIMELINE_STEPS.length - 1 ? 0 : 80 }}
          >
            <div
              aria-hidden="true"
              className="absolute top-2 h-5 w-5 rounded-full"
              style={{
                left: -48,
                backgroundColor: COLORS.cherry,
                border: `3px solid ${COLORS.white}`,
                boxShadow: `0 0 0 2px ${COLORS.cherry}`,
              }}
            />

            <div
              className="mb-4 font-sans text-[22px] font-bold tracking-[0.02em]"
              style={{ color: COLORS.cherry }}
            >
              {step.year}
            </div>

            <div
              className="rounded-xl bg-white px-6 py-5 shadow-[0_6px_20px_rgba(0,0,0,0.1)]"
              style={{ borderLeft: `4px solid ${COLORS.cherry}` }}
            >
              <h4
                className="mb-2 text-lg font-semibold leading-[1.3]"
                style={{ color: COLORS.text }}
              >
                {step.title}
              </h4>
              <p
                className="text-[15px] leading-[1.6] opacity-75"
                style={{ color: COLORS.text }}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});
