import { memo } from 'react';
import { motion } from 'motion/react';
import { COLORS, CATEGORY_CONFIG, type Project } from './constants';
import { PROJECTS } from './data';

interface ProjectPreviewProps {
  onOpenProject: (project: Project) => void;
}

export const ProjectPreview = memo(function ProjectPreview({ onOpenProject }: ProjectPreviewProps) {
  // Filtrer pour afficher uniquement Soleia Expérience, Glowringa et LGM
  const featuredProjects = PROJECTS.filter(project => [3, 4, 5].includes(project.id));

  return (
    <section
      aria-label="Avant-goût des projets"
      style={{
        padding: '120px 20px',
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: COLORS.bg,
      }}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          fontFamily: '"Playfair Display", "Georgia", serif',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 400,
          textAlign: 'center',
          marginBottom: '80px',
          color: COLORS.text,
          letterSpacing: '-1px',
        }}
      >
        Avant-goût
      </motion.h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
        {featuredProjects.map((project, index) => {
          const config = CATEGORY_CONFIG[project.category];

          return (
            <motion.button
              key={project.id}
              onClick={() => onOpenProject(project)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{
                y: -8,
                boxShadow: `0 16px 40px ${COLORS.cherry}20`,
              }}
              aria-label={`Voir le projet ${project.title}`}
              style={{
                width: '100%',
                maxWidth: '850px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                padding: '50px 60px',
                backgroundColor: COLORS.bg,
                border: `4px solid ${COLORS.cherry}`,
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: `0 8px 24px ${COLORS.text}12, inset 0 0 0 3px ${COLORS.bg}, inset 0 0 0 8px ${COLORS.cherry}`,
                textAlign: 'left',
                overflow: 'visible',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.red;
                e.currentTarget.style.boxShadow = `0 8px 24px ${COLORS.text}12, inset 0 0 0 3px ${COLORS.bg}, inset 0 0 0 8px ${COLORS.red}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.cherry;
                e.currentTarget.style.boxShadow = `0 8px 24px ${COLORS.text}12, inset 0 0 0 3px ${COLORS.bg}, inset 0 0 0 8px ${COLORS.cherry}`;
              }}
            >
              {/* Coins décoratifs */}
              <div
                style={{
                  position: 'absolute',
                  top: '-2px',
                  left: '-2px',
                  width: '32px',
                  height: '32px',
                  borderTop: `4px solid ${COLORS.cherry}`,
                  borderLeft: `4px solid ${COLORS.cherry}`,
                  borderTopLeftRadius: '16px',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '32px',
                  height: '32px',
                  borderTop: `4px solid ${COLORS.cherry}`,
                  borderRight: `4px solid ${COLORS.cherry}`,
                  borderTopRightRadius: '16px',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-2px',
                  left: '-2px',
                  width: '32px',
                  height: '32px',
                  borderBottom: `4px solid ${COLORS.cherry}`,
                  borderLeft: `4px solid ${COLORS.cherry}`,
                  borderBottomLeftRadius: '16px',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-2px',
                  width: '32px',
                  height: '32px',
                  borderBottom: `4px solid ${COLORS.cherry}`,
                  borderRight: `4px solid ${COLORS.cherry}`,
                  borderBottomRightRadius: '16px',
                }}
              />

              {/* Titre du projet - largeur flexible */}
              <span
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
                  fontWeight: 600,
                  color: COLORS.text,
                  letterSpacing: '-0.5px',
                  paddingRight: '230px',
                  lineHeight: '1.3',
                  flex: 1,
                }}
              >
                {project.title}
              </span>

              {/* Ligne pointillée de séparation - position absolue fixe */}
              <div
                style={{
                  position: 'absolute',
                  right: '210px',
                  top: '25px',
                  bottom: '25px',
                  width: '3px',
                  backgroundImage: `linear-gradient(${COLORS.cherry} 50%, transparent 50%)`,
                  backgroundSize: '3px 10px',
                  backgroundRepeat: 'repeat-y',
                }}
              />

              {/* Badge catégorie - largeur fixe */}
              <div
                style={{
                  position: 'absolute',
                  right: '60px',
                  width: '130px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1.2px',
                    color: COLORS.cherry,
                    textAlign: 'center',
                    lineHeight: '1.5',
                  }}
                >
                  {config.label}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
});