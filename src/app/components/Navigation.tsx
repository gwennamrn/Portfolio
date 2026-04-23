import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { COLORS, type PageId } from './constants';
import { Cherry } from './Cherry';

interface NavigationProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { label: string; page: PageId }[] = [
  { label: 'Accueil', page: 'home' },
  { label: 'À propos de moi', page: 'about' },
  { label: 'Mes projets', page: 'projects' },
  { label: 'Contact', page: 'contact' },
];

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = useCallback(
    (page: PageId) => {
      onNavigate(page);
      setIsMenuOpen(false);
    },
    [onNavigate]
  );

  return (
    <>
      <nav
        role="navigation"
        aria-label="Navigation principale"
        style={{
          backgroundColor: COLORS.bg,
          color: COLORS.text,
          padding: '24px 0',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 1px 0 rgba(0,0,0,0.08)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => handleNavigate('home')}
            aria-label="Retour à l'accueil"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const span = e.currentTarget.querySelector('span');
              if (span) span.style.transition = 'color 0.2s ease';
              if (span) span.style.color = COLORS.red;
            }}
            onMouseLeave={(e) => {
              const span = e.currentTarget.querySelector('span');
              if (span) span.style.transition = 'color 0.2s ease';
              if (span) span.style.color = COLORS.text;
            }}
          >
            <Cherry size={28} color={COLORS.cherry} />
            <span
              style={{
                fontFamily: '"Playfair Display", "Georgia", serif',
                fontWeight: 400,
                fontSize: '24px',
                letterSpacing: '0.5px',
                color: COLORS.text,
                transition: 'color 0.2s ease',
              }}
            >
              Gwennaëlle
            </span>
          </button>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="menu-overlay"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: '"Inter", sans-serif',
              fontSize: '20px',
              fontWeight: 500,
              letterSpacing: '3px',
              color: COLORS.text,
              textTransform: 'uppercase',
              padding: '10px 20px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.red)}
            onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.text)}
          >
            MENU
          </button>
        </div>
      </nav>

      {/* Menu Overlay Fullscreen */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              backgroundColor: 'rgba(14, 14, 14, 0.95)',
              backdropFilter: 'blur(10px)',
              zIndex: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Fermer le menu"
              style={{
                position: 'absolute',
                top: '40px',
                right: '40px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: '"Inter", sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                letterSpacing: '3px',
                color: COLORS.bg,
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.red)}
              onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.bg)}
            >
              FERMER
            </button>

            {/* Nav Links */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
              {NAV_ITEMS.map((item, index) => {
                const isActive = currentPage === item.page;
                return (
                  <motion.button
                    key={item.page}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => handleNavigate(item.page)}
                    whileHover={{ scale: 1.06, color: COLORS.red }}
                    transition={{
                      delay: 0.15 + index * 0.08,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      scale: { duration: 0.2, ease: 'easeOut' },
                      color: { duration: 0.2, ease: 'easeInOut' },
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: '"Playfair Display", "Georgia", serif',
                      fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                      fontWeight: isActive ? 500 : 400,
                      color: isActive ? COLORS.cherry : COLORS.bg,
                      letterSpacing: '-0.5px',
                      padding: 0,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {item.label}
                  </motion.button>
                );
              })}
            </nav>

            {/* Decorative cherry */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.6 }}
              style={{ position: 'absolute', bottom: '60px' }}
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