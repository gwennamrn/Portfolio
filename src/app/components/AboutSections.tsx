import { memo, useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { COLORS } from './constants';
import { Cherry } from './Cherry';

// --- "Qualités" Section ---

const QUALITIES = [
  {
    title: 'Créative',
    content: 'Transformer des idées en communication visuelle cohérente et expressive.',
  },
  {
    title: 'Rigoureuse',
    content: 'Structurer et organiser méthodiquement chaque étape d\'un projet de communication.',
  },
  {
    title: 'Autonome',
    content: 'Prendre des initiatives et mener à bien les projets de manière indépendante.',
  },
] as const;

export const AboutQualities = memo(function AboutQualities() {
  const [hoveredQuality, setHoveredQuality] = useState<number | null>(null);

  return (
    <section aria-labelledby="qualities-heading" style={{ marginBottom: '100px' }}>
      <h2
        id="qualities-heading"
        style={{
          textAlign: 'center',
          marginBottom: '60px',
          fontFamily: '"Playfair Display", "Georgia", serif',
          fontSize: '40px',
          fontWeight: 600,
          color: COLORS.cherry,
        }}
      >
        Mes qualités
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '30px',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {QUALITIES.map((quality, index) => {
          const isHovered = hoveredQuality === index;

          return (
            <motion.div
              key={quality.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredQuality(index)}
              onMouseLeave={() => setHoveredQuality(null)}
              style={{
                position: 'relative',
                aspectRatio: '1',
                backgroundColor: isHovered ? COLORS.cherry : COLORS.white,
                border: `3px solid ${COLORS.cherry}`,
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '30px',
                cursor: 'pointer',
                boxShadow: isHovered ? '0 12px 30px rgba(107, 15, 26, 0.25)' : '0 4px 15px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease',
                overflow: 'hidden',
              }}
            >
              <h3
                style={{
                  fontFamily: '"Playfair Display", "Georgia", serif',
                  fontSize: '32px',
                  fontWeight: 600,
                  color: isHovered ? COLORS.white : COLORS.cherry,
                  margin: 0,
                  textAlign: 'center',
                  lineHeight: 1.2,
                  transition: 'all 0.3s ease',
                  opacity: isHovered ? 0 : 1,
                  transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
                }}
              >
                {quality.title}
              </h3>

              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '30px',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.3s ease',
                  pointerEvents: 'none',
                }}
              >
                <p
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '16px',
                    lineHeight: 1.6,
                    color: COLORS.white,
                    margin: 0,
                    textAlign: 'center',
                  }}
                >
                  {quality.content}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
});

// --- "Ce que j'aime" Section ---

const PASSIONS = [
  'Explorer de nouvelles tendances',
  'Jouer avec les couleurs',
  'Expérimenter des formats innovants',
  'Créer des visuels impactants',
  'Développer des stratégies créatives',
] as const;

export const AboutPassions = memo(function AboutPassions() {
  return (
    <section aria-labelledby="passions-heading" style={{ marginBottom: '100px' }}>
      <h2
        id="passions-heading"
        style={{
          textAlign: 'center',
          marginBottom: '60px',
          fontFamily: '"Playfair Display", "Georgia", serif',
          fontSize: '40px',
          fontWeight: 600,
          color: COLORS.cherry,
        }}
      >
        Ce que j'aime
      </h2>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {PASSIONS.map((passion, index) => (
          <motion.div
            key={passion}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: '"Inter", sans-serif',
              fontSize: '17px',
              fontWeight: 500,
              color: COLORS.text,
              backgroundColor: COLORS.white,
              padding: '14px 24px',
              borderRadius: '25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              cursor: 'pointer',
            }}
          >
            <Heart size={20} color={COLORS.cherry} fill={COLORS.cherry} />
            <span>{passion}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
});

// --- "Compétences" Section ---

const SKILLS = [
  {
    title: 'Gestion et conception de projets de communication',
    description: 'Comprendre les besoins d\'un projet, définir des objectifs et organiser les étapes.',
  },
  {
    title: 'Création de contenus visuels et digitaux',
    description: 'Concevoir des supports attractifs et adaptés aux différents canaux (print, réseaux sociaux, web).',
  },
  {
    title: 'Stratégie de communication et identité de marque',
    description: 'Réfléchir à la cohérence d\'un projet pour transmettre un message clair et renforcer l\'image d\'une marque.',
  },
  {
    title: 'Maîtrise des outils de création graphique',
    description: 'Utilisation d\'outils professionnels comme la suite Adobe (Photoshop, Illustrator, InDesign) et Canva.',
  },
] as const;

export const AboutSkills = memo(function AboutSkills() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Duplicate skills for infinite loop
  const duplicatedSkills = [...SKILLS, ...SKILLS];

  const handleDragEnd = (_event: any, info: any) => {
    setIsDragging(false);
    
    // Calculate the snap position (always show complete cards)
    const cardWidth = 50; // 50% per card
    const currentOffset = dragOffset + (info.offset.x / window.innerWidth) * 100;
    const snapIndex = Math.round(currentOffset / cardWidth);
    const snapPosition = snapIndex * cardWidth;
    
    setDragOffset(snapPosition);
  };

  return (
    <section aria-labelledby="skills-heading" style={{ marginBottom: '100px' }}>
      <h2
        id="skills-heading"
        style={{
          textAlign: 'center',
          marginBottom: '60px',
          fontFamily: '"Playfair Display", "Georgia", serif',
          fontSize: '40px',
          fontWeight: 600,
          color: COLORS.cherry,
        }}
      >
        Mes compétences
      </h2>

      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -1000, right: 100 }}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          animate={
            isDragging
              ? {}
              : {
                  x: dragOffset !== 0 ? `${dragOffset}%` : ['0%', `${-50 * SKILLS.length}%`],
                }
          }
          transition={
            isDragging
              ? {}
              : dragOffset !== 0
              ? { duration: 0.5, ease: 'easeOut' }
              : {
                  duration: isPaused ? 100 : 22,
                  repeat: Infinity,
                  ease: 'linear',
                }
          }
          style={{
            display: 'flex',
            gap: '30px',
            paddingBottom: '20px',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          {duplicatedSkills.map((skill, index) => {
            const isHovered = hoveredSkill === index;
            const originalIndex = index % SKILLS.length;

            return (
              <motion.div
                key={`${skill.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: originalIndex * 0.1, duration: 0.5 }}
                onMouseEnter={() => {
                  setHoveredSkill(index);
                  setIsPaused(true);
                }}
                onMouseLeave={() => {
                  setHoveredSkill(null);
                  setIsPaused(false);
                }}
                style={{
                  position: 'relative',
                  minWidth: 'calc(50% - 15px)',
                  width: 'calc(50% - 15px)',
                  aspectRatio: '1',
                  backgroundColor: isHovered ? COLORS.cherry : COLORS.white,
                  border: `3px solid ${COLORS.cherry}`,
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '30px',
                  cursor: 'pointer',
                  boxShadow: isHovered ? '0 12px 30px rgba(107, 15, 26, 0.25)' : '0 4px 15px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                }}
              >
                <h3
                  style={{
                    fontFamily: '"Playfair Display", "Georgia", serif',
                    fontSize: '32px',
                    fontWeight: 600,
                    color: isHovered ? COLORS.white : COLORS.cherry,
                    margin: 0,
                    textAlign: 'center',
                    lineHeight: 1.2,
                    transition: 'all 0.3s ease',
                    opacity: isHovered ? 0 : 1,
                    transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
                  }}
                >
                  {skill.title}
                </h3>

                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '30px',
                    gap: '15px',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    pointerEvents: 'none',
                  }}
                >
                  <Cherry size={35} color={COLORS.white} />
                  {/* Trait de repère sous la cerise */}
                  <div
                    style={{
                      width: '50px',
                      height: '2px',
                      backgroundColor: COLORS.white,
                      borderRadius: '1px',
                      marginTop: '-8px',
                      marginBottom: '8px',
                    }}
                  />
                  <p
                    style={{
                      fontFamily: '"Inter", sans-serif',
                      fontSize: '16px',
                      lineHeight: 1.6,
                      color: COLORS.white,
                      margin: 0,
                      textAlign: 'center',
                    }}
                  >
                    {skill.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '50px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            marginTop: '30px',
          }}
        >
          {/* Track */}
          <div
            style={{
              position: 'relative',
              width: '220px',
              height: '4px',
              backgroundColor: COLORS.beige,
              borderRadius: '2px',
            }}
          >
            {/* Cherry indicator */}
            <motion.div
              animate={{
                left: isPaused ? undefined : ['0%', '100%'],
              }}
              transition={{
                left: {
                  duration: isPaused ? 100 : 22,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }}
              style={{
                position: 'absolute',
                top: '-35px',
                transform: 'translate(-50%, 0)',
              }}
            >
              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Cherry size={30} color={COLORS.cherry} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});