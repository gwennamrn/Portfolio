import React, { useState, useCallback, useMemo, memo } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone } from 'lucide-react';
import { COLORS } from './constants';
import { Cherry } from './Cherry';

const inputStyle: React.CSSProperties = {
  padding: '20px',
  borderRadius: '15px',
  border: '1px solid #ddd',
  backgroundColor: COLORS.white,
  fontSize: '16px',
  fontFamily: '"Inter", sans-serif',
};

// --- Falling Cherries Rain ---

interface FallingCherryConfig {
  id: number;
  left: number;       // % position horizontale
  size: number;       // taille en px
  delay: number;      // délai avant le début (s)
  duration: number;   // durée de chute (s)
  opacity: number;    // opacité
  rotation: number;   // rotation finale (deg)
  swayAmount: number; // balancement horizontal (px)
}

function generateCherries(count: number): FallingCherryConfig[] {
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed * 9301 + 49297) * 49297;
    return x - Math.floor(x);
  };

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: seededRandom(i * 3 + 1) * 100,
    size: 28 + seededRandom(i * 3 + 2) * 32,
    delay: seededRandom(i * 3 + 3) * 12,
    duration: 10 + seededRandom(i * 3 + 4) * 10,
    opacity: 0.10 + seededRandom(i * 3 + 5) * 0.12,
    rotation: -30 + seededRandom(i * 3 + 6) * 60,
    swayAmount: -20 + seededRandom(i * 3 + 7) * 40,
  }));
}

const CHERRY_COUNT = 18;

const FallingCherriesRain = memo(function FallingCherriesRain() {
  const cherries = useMemo(() => generateCherries(CHERRY_COUNT), []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {cherries.map((c) => (
        <motion.div
          key={c.id}
          initial={{
            y: '-10%',
            x: c.swayAmount * -0.5,
            rotate: 0,
            opacity: 0,
          }}
          animate={{
            y: '110vh',
            x: [c.swayAmount * -0.5, c.swayAmount, c.swayAmount * -0.5],
            rotate: c.rotation,
            opacity: [0, c.opacity, c.opacity, 0],
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: 'linear',
            x: {
              duration: c.duration,
              delay: c.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            },
            opacity: {
              duration: c.duration,
              delay: c.delay,
              repeat: Infinity,
              times: [0, 0.05, 0.9, 1],
              ease: 'linear',
            },
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: `${c.left}%`,
          }}
        >
          <Cherry size={c.size} color={COLORS.cherry} opacity={1} />
        </motion.div>
      ))}
    </div>
  );
});

// --- Contact Page ---

export const ContactPage = memo(function ContactPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Pluie de cerises en arrière-plan */}
      <FallingCherriesRain />

      {/* Contenu de la page */}
      <section
        aria-labelledby="contact-heading"
        style={{
          padding: '120px 20px',
          maxWidth: '600px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h1
          id="contact-heading"
          style={{ fontSize: '40px', marginBottom: '40px', textAlign: 'center', color: COLORS.text }}
        >
          Contact
        </h1>

        <div
          style={{
            marginBottom: '50px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: '18px', opacity: 0.8, color: COLORS.text }}>
            Une idée ? Un projet ? N'hésitez pas à me contacter.
          </p>
          <address
            style={{
              display: 'flex',
              gap: '30px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              fontStyle: 'normal',
            }}
          >
            <a
              href="mailto:gwenmariamon@gmail.com"
              style={{
                textDecoration: 'none',
                color: COLORS.text,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: 600,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(107, 15, 26, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Mail size={18} color={COLORS.red} />
              </span>
              gwenmariamon@gmail.com
            </a>
            <a
              href="tel:+262692406850"
              style={{
                textDecoration: 'none',
                color: COLORS.text,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontWeight: 600,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgba(107, 15, 26, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Phone size={18} color={COLORS.red} />
              </span>
              0692 40 68 50
            </a>
          </address>
        </div>

        <ContactForm />
      </section>
    </div>
  );
});

// --- Contact Form ---

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  }, []);

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        role="alert"
        style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#E8F5E9',
          borderRadius: '20px',
          color: '#2E7D32',
        }}
      >
        <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>Merci !</h3>
        <p>Je vous réponds très vite.</p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <label htmlFor="contact-name" className="sr-only">Nom</label>
      <input
        id="contact-name"
        required
        type="text"
        placeholder="Nom"
        autoComplete="name"
        style={inputStyle}
      />
      <label htmlFor="contact-email" className="sr-only">Email</label>
      <input
        id="contact-email"
        required
        type="email"
        placeholder="Email"
        autoComplete="email"
        style={inputStyle}
      />
      <label htmlFor="contact-message" className="sr-only">Message</label>
      <textarea
        id="contact-message"
        required
        rows={5}
        placeholder="Message"
        style={{ ...inputStyle, resize: 'vertical' }}
      />
      <motion.button
        whileHover={{ boxShadow: '0 0 20px rgba(107, 15, 26, 0.4)' }}
        transition={{ duration: 0.5 }}
        type="submit"
        style={{
          padding: '20px',
          backgroundColor: COLORS.red,
          color: COLORS.white,
          border: 'none',
          borderRadius: '15px',
          fontSize: '18px',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: '"Inter", sans-serif',
        }}
      >
        Envoyer
      </motion.button>
    </form>
  );
}