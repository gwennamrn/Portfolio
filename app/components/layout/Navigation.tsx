import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { COLORS } from "~/lib/colors";
import { Cherry } from "~/components/cherry/Cherry";

type NavItem = { label: string; to: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Accueil", to: "/" },
  { label: "À propos de moi", to: "/about" },
  { label: "Mes projets", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const close = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <nav
        role="navigation"
        aria-label="Navigation principale"
        className="sticky top-0 z-[100] bg-[var(--color-bg)] py-6 shadow-[0_1px_0_rgba(0,0,0,0.08)]"
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-10">
          <button
            onClick={() => navigate("/")}
            aria-label="Retour à l'accueil"
            className="group flex items-center gap-3 bg-transparent p-0"
          >
            <Cherry size={28} color={COLORS.cherry} />
            <span className="font-serif text-2xl tracking-[0.03em] text-[var(--color-ink)] transition-colors duration-200 group-hover:text-[var(--color-red)]">
              Gwennaëlle
            </span>
          </button>

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="menu-overlay"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="bg-transparent px-5 py-2.5 text-xl font-medium uppercase tracking-[0.2em] text-[var(--color-ink)] transition-colors duration-200 hover:text-[var(--color-red)]"
          >
            MENU
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center backdrop-blur-[10px]"
            style={{ backgroundColor: "rgba(14, 14, 14, 0.95)" }}
          >
            <button
              onClick={close}
              aria-label="Fermer le menu"
              className="absolute top-10 right-10 bg-transparent text-lg font-medium uppercase tracking-[0.2em] text-[var(--color-bg)] transition-colors duration-200 hover:text-[var(--color-red)]"
            >
              FERMER
            </button>

            <nav className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.15 + index * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={close}
                    className={({ isActive }) =>
                      [
                        "font-serif leading-none tracking-[-0.01em] transition-colors duration-200",
                        "text-[clamp(2rem,4vw,3.5rem)]",
                        isActive
                          ? "font-medium text-[var(--color-cherry)]"
                          : "text-[var(--color-bg)] hover:text-[var(--color-red)]",
                      ].join(" ")
                    }
                    viewTransition
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-16"
              aria-hidden="true"
            >
              <Cherry size={50} color={COLORS.bg} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
