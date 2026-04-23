import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';
import { Cherry } from './Cherry';

// TikTok SVG icon (not available in lucide-react)
function TikTokIcon({ size = 16 }: { size?: number }) {
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
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/gwennamrn',
    icon: 'instagram' as const,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@gwennamrn',
    icon: 'tiktok' as const,
  },
];

// Palette bordeaux
const BORDEAUX = '#800020';
const BORDEAUX_LIGHT = '#A8304A';

export function Footer() {
  return (
    <footer
      style={{
        padding: '48px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px',
        background: 'transparent',
        flexWrap: 'wrap',
      }}
    >
      {/* Prénom — gauche */}
      <span
        style={{
          fontFamily: '"Playfair Display", "Georgia", serif',
          fontWeight: 400,
          fontSize: '22px',
          letterSpacing: '0.5px',
          color: BORDEAUX,
          flexShrink: 0,
          userSelect: 'none',
        }}
      >
        Gwennaëlle
      </span>

      {/* Citation — centre */}
      <p
        style={{
          margin: 0,
          fontFamily: '"Inter", sans-serif',
          fontWeight: 300,
          fontSize: '16px',
          fontStyle: 'italic',
          letterSpacing: '0.3px',
          color: BORDEAUX_LIGHT,
          textAlign: 'center',
          flex: 1,
          minWidth: '160px',
          lineHeight: '1.5',
          opacity: 0.85,
        }}
      >
        {'«\u00a0Que du positif avec un brin de\u00a0'}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            verticalAlign: 'middle',
          }}
        >
          folie
          <Cherry size={15} color={BORDEAUX} opacity={0.7} />
        </span>
        {'\u00a0et beaucoup de passion\u00a0»'}
      </p>

      {/* Icônes — droite */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          flexShrink: 0,
        }}
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
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              color: BORDEAUX,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon === 'instagram' ? (
              <Instagram size={22} strokeWidth={1.5} />
            ) : (
              <TikTokIcon size={22} />
            )}
          </motion.a>
        ))}
      </div>
    </footer>
  );
}