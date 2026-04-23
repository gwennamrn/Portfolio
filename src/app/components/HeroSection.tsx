import { memo } from 'react';
import { motion } from 'motion/react';
import { COLORS, type PageId } from './constants';
import { Cherry } from './Cherry';

interface HeroSectionProps {
  onNavigate: (page: PageId) => void;
}

const CHERRY_ROW_COUNT = 3;
const CHERRIES_PER_ROW = 20;

export const HeroSection = memo(function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <>
      {/* Hero Section */}
      <section
        aria-label="Présentation"
        style={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.bg,
        }}
      >
        {/* Animated cherry background */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '20%',
            left: 0,
            width: '100%',
            height: '60%',
            overflow: 'hidden',
            opacity: 0.08,
            pointerEvents: 'none',
          }}
        >
          {Array.from({ length: CHERRY_ROW_COUNT }).map((_, rowIndex) => (
            <motion.div
              key={`cherry-row-${rowIndex}`}
              style={{
                display: 'flex',
                gap: '120px',
                position: 'absolute',
                top: `${rowIndex * 200}px`,
                left: 0,
                width: '300%',
              }}
              animate={{ x: [0, -2000] }}
              transition={{
                duration: 40 + rowIndex * 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {Array.from({ length: CHERRIES_PER_ROW }).map((_, i) => (
                <Cherry key={`cherry-${rowIndex}-${i}`} size={60} color={COLORS.cherry} />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            padding: '0 20px',
            maxWidth: '900px',
          }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              fontFamily: '"Playfair Display", "Georgia", serif',
              fontSize: 'clamp(4rem, 12vw, 9rem)',
              fontWeight: 400,
              letterSpacing: '-2px',
              lineHeight: 0.95,
              color: COLORS.text,
              marginBottom: '40px',
            }}
          >
            Gwennaëlle
          </motion.h1>

          {/* Decorative separator */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            aria-hidden="true"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            <div style={{ height: '1px', width: '80px', backgroundColor: COLORS.cherry, opacity: 0.4 }} />
            <Cherry size={35} color={COLORS.cherry} opacity={0.6} />
            <div style={{ height: '1px', width: '80px', backgroundColor: COLORS.cherry, opacity: 0.4 }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1, delay: 1 }}
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
              fontWeight: 300,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: COLORS.text,
            }}
          >
            Penser. Créer. Impacter.
          </motion.h2>
        </div>
      </section>

      {/* CTA Banner */}
      <motion.section
        aria-label="Appel à l'action"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          margin: '0 20px 80px',
          backgroundColor: COLORS.cherry,
          padding: '80px 20px',
          borderRadius: '40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h2
            style={{
              fontFamily: '"Playfair Display", "Georgia", serif',
              color: COLORS.white,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              marginBottom: '20px',
              fontWeight: 400,
              letterSpacing: '-1px',
            }}
          >
            Découvrez la stratégie derrière chaque création.
          </h2>
          <motion.button
            onClick={() => onNavigate('projects')}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: COLORS.white,
              color: COLORS.cherry,
              padding: '18px 45px',
              borderRadius: '40px',
              border: 'none',
              fontWeight: 600,
              fontSize: '18px',
              cursor: 'pointer',
              marginTop: '20px',
              fontFamily: '"Inter", sans-serif',
              letterSpacing: '0.5px',
            }}
          >
            Explorer les projets
          </motion.button>
        </motion.div>
      </motion.section>
    </>
  );
});
