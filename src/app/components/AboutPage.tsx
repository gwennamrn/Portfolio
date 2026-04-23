import { memo } from 'react';
import { motion } from 'motion/react';
import { COLORS, type PageId } from './constants';
import { Cherry } from './Cherry';
import { AboutQualities, AboutPassions, AboutSkills } from './AboutSections';
import { Timeline } from './Timeline';
import userPhoto from 'figma:asset/833dc88e282ea356b04fd029cc87dac60e5be918.png';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage = memo(function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div style={{ padding: '120px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Intro */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '60px',
          marginBottom: '100px',
          flexWrap: 'wrap',
        }}
      >
        {/* Texte à gauche */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            style={{
              fontFamily: '"Playfair Display", "Georgia", serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              marginBottom: '20px',
              fontWeight: 400,
              letterSpacing: '-0.5px',
              color: COLORS.cherry,
            }}
          >
            À propos de moi
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.6, duration: 1 }}
            style={{
              fontFamily: '"Inter", sans-serif',
              fontSize: '1.3rem',
              lineHeight: 1.7,
              fontWeight: 400,
              color: COLORS.text,
              maxWidth: '500px',
            }}
          >
            Étudiante en BTS Communication, passionnée par le design et la création de contenus visuels. 
            Je développe des projets qui allient esthétique et stratégie de communication.
          </motion.p>
        </div>

        {/* Photo à droite */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          style={{ position: 'relative' }}
        >
          <div
            style={{
              width: '400px',
              height: '300px',
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img
              src={userPhoto}
              alt="Photo de Gwennaëlle"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Filtre bordeaux très léger */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: COLORS.cherry,
                opacity: 0.08,
                pointerEvents: 'none',
              }}
            />
          </div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
            aria-hidden="true"
            style={{ position: 'absolute', bottom: '-20px', right: '-30px' }}
          >
            <Cherry size={80} color={COLORS.red} />
          </motion.div>
        </motion.div>
      </header>

      {/* Qualités */}
      <AboutQualities />

      {/* Ce que j'aime */}
      <AboutPassions />

      {/* Compétences */}
      <AboutSkills />

      {/* Timeline */}
      <Timeline />

      {/* CTA */}
      <div style={{ textAlign: 'center' }}>
        <motion.button
          onClick={() => onNavigate('projects')}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4 }}
          style={{
            backgroundColor: COLORS.red,
            color: COLORS.white,
            padding: '20px 50px',
            borderRadius: '50px',
            fontSize: '20px',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(107, 15, 26, 0.3)',
          }}
        >
          Voir mes réalisations
        </motion.button>
      </div>
    </div>
  );
});