import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Target, Heart, Star, ChevronRight } from 'lucide-react';
import { COLORS, FILTER_OPTIONS, type Project, type FilterId } from './constants';
import { PROJECTS } from './data';

interface ProjectListProps {
  onOpenProject: (project: Project) => void;
}

export const ProjectList = memo(function ProjectList({ onOpenProject }: ProjectListProps) {
  const [filter, setFilter] = useState<FilterId>('all');

  const filteredProjects = PROJECTS.filter(
    (p) => filter === 'all' || p.category === filter
  );

  const handleFilterChange = useCallback((id: string) => {
    setFilter(id as FilterId);
  }, []);

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', padding: '0 20px 60px', maxWidth: '900px', margin: '0 auto' }}>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '15px', color: COLORS.text }}
        >
          Mes Réalisations
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{ fontSize: '18px', opacity: 0.7, lineHeight: 1.6, color: COLORS.text }}
        >
          Découvrez mes projets réalisés en formation, en entreprise et de manière personnelle.
        </motion.p>
      </header>

      {/* Filters */}
      <div
        role="tablist"
        aria-label="Filtrer les projets par catégorie"
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          flexWrap: 'wrap',
          marginBottom: '60px',
          padding: '0 20px',
        }}
      >
        {FILTER_OPTIONS.map((cat) => (
          <motion.button
            key={cat.id}
            role="tab"
            aria-selected={filter === cat.id}
            onClick={() => handleFilterChange(cat.id)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
            style={{
              padding: '14px 30px',
              borderRadius: '50px',
              border: 'none',
              backgroundColor: filter === cat.id ? COLORS.red : COLORS.white,
              color: filter === cat.id ? COLORS.white : COLORS.text,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '16px',
              boxShadow:
                filter === cat.id
                  ? '0 8px 20px rgba(107, 15, 26, 0.3)'
                  : '0 4px 10px rgba(0,0,0,0.05)',
            }}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      {/* Project Grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto 100px', padding: '0 20px' }}>
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 400px))',
            gap: '30px',
            justifyContent: 'center',
          }}
        >
          <AnimatePresence>
            {filteredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={onOpenProject} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Carousel "Coups de coeur" */}
      <section
        aria-label="Projets coups de coeur"
        style={{ padding: '80px 0', backgroundColor: COLORS.white, overflow: 'hidden' }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto 40px',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          <Star size={28} fill={COLORS.red} color={COLORS.red} />
          <h2 style={{ fontSize: '28px', color: COLORS.text }}>Projets coups de coeur</h2>
        </div>
        <div style={{ display: 'flex', gap: '30px', paddingLeft: '20px' }}>
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            style={{ display: 'flex', gap: '30px', width: 'max-content' }}
          >
            {[...PROJECTS, ...PROJECTS].map((p, i) => (
              <div
                key={`carousel-${p.id}-${i}`}
                onClick={() => onOpenProject(p)}
                role="button"
                tabIndex={0}
                aria-label={`Voir le projet ${p.title}`}
                onKeyDown={(e) => e.key === 'Enter' && onOpenProject(p)}
                style={{
                  width: '300px',
                  height: '200px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    imageRendering: '-webkit-optimize-contrast',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    padding: '20px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                  }}
                >
                  <h4 style={{ color: COLORS.white, fontSize: '18px' }}>{p.title}</h4>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{
          margin: '80px 20px',
          backgroundColor: COLORS.red,
          padding: '60px 40px',
          borderRadius: '40px',
          color: COLORS.white,
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(107, 15, 26, 0.3)',
        }}
      >
        <p style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, lineHeight: 1.4, color: COLORS.white }}>
          "Chaque projet reflète une intention et une démarche précise : stratégie, créativité et impact."
        </p>
      </motion.div>
    </div>
  );
});

// --- Project Card Sub-Component ---

const ProjectCard = memo(function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (project: Project) => void;
}) {
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'formation':
        return 'Projet en formation';
      case 'entreprise':
        return 'Projet en entreprise';
      case 'perso':
        return 'Projet personnel';
      default:
        return '';
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      whileHover="hover"
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      aria-label={`Voir le projet ${project.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(project)}
      style={{
        backgroundColor: COLORS.white,
        borderRadius: '30px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        position: 'relative',
        width: '400px',
        height: '420px',
      }}
    >
      <motion.img
        variants={{ hover: { scale: 1.05 } }}
        transition={{ duration: 0.8 }}
        src={project.image}
        alt={`Aperçu du projet ${project.title}`}
        loading="lazy"
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover',
          objectPosition: 'center',
          imageRendering: 'high-quality',
          WebkitFontSmoothing: 'antialiased',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0) scale(1.001)',
          willChange: 'transform',
        }}
      />
      
      {/* Badge statut en haut à gauche */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: COLORS.red,
          color: COLORS.beige,
          padding: '8px 16px',
          borderRadius: '50px',
          fontSize: '13px',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 2,
        }}
      >
        {getCategoryLabel(project.category)}
      </div>
      
      {/* Overlay rouge au survol */}
      <motion.div
        variants={{ hover: { opacity: 0.4 } }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.red,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Bouton "Voir le projet" centré au survol */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            backgroundColor: COLORS.red,
            color: COLORS.white,
            padding: '16px 32px',
            borderRadius: '30px',
            fontSize: '16px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            boxShadow: '0 8px 24px rgba(107, 15, 26, 0.4)',
          }}
        >
          Voir le projet
        </div>
      </motion.div>
    </motion.article>
  );
});