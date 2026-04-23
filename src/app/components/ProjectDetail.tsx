import { useEffect, memo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Info, Target, Users, Users2, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { COLORS, type Project, type GalleryItem } from './constants';
import { Cherry } from './Cherry';
import { FolderCard } from './FolderCard';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail = memo(function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; desc: string } | null>(null);
  const [lightboxMultiple, setLightboxMultiple] = useState<Array<{ src: string; desc: string }> | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const isLGM = project.id === 5;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (lightboxImage || lightboxMultiple) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxImage, lightboxMultiple]);

  // ─── Render helpers (avoid deep ternary nesting) ────────────────────────────

  function renderMoodboard(items: GalleryItem[]) {
    return (
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '28px',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
        {items.map((item, i) => (
          <motion.div
            key={`moodboard-${i}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            whileHover={{
              boxShadow: `0 0 0 3px ${COLORS.red}, 0 12px 40px rgba(107,15,26,0.2)`,
              y: -6,
            }}
            onClick={() => setLightboxImage({ src: item.image, desc: item.description })}
            style={{
              width: 'min(100%, 410px)',
              flexShrink: 0,
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
              cursor: 'zoom-in',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#F6F1EE',
            }}
          >
            {/* Image entière — aucune hauteur fixe = zéro crop */}
            <div style={{ lineHeight: 0, backgroundColor: '#F6F1EE' }}>
              <img
                src={item.image}
                alt={item.description}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '20px 20px 0 0',
                }}
              />
            </div>
            {/* Barre label rouge / texte beige */}
            <div style={{
              backgroundColor: COLORS.red,
              padding: '13px 18px 15px',
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
            }}>
              <ZoomIn size={14} style={{ color: COLORS.beige, flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.45, color: COLORS.beige }}>
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  function renderGrid(items: GalleryItem[]) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '30px',
        marginTop: '30px',
      }}>
        {items.map((item, i) => {
          const hasExtraImages = item.extraImages && item.extraImages.length > 0;
          const isYouTubeVideo = item.image.includes('youtube.com/embed');

          return (
            <motion.div
              key={`gallery-item-${i}`}
              whileHover={{ y: -8, boxShadow: '0 12px 30px rgba(0,0,0,0.15)' }}
              transition={{ duration: 0.4 }}
              onClick={() => {
                if (hasExtraImages) {
                  setLightboxMultiple(item.extraImages!.map(e => ({ src: e.image, desc: e.description })));
                  setCarouselIndex(0);
                } else if (!isYouTubeVideo) {
                  setLightboxImage({ src: item.image, desc: item.description });
                }
              }}
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: COLORS.white,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                cursor: isYouTubeVideo ? 'default' : 'zoom-in',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* +X Badge pour extraImages */}
              {hasExtraImages && (
                <div
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    backgroundColor: COLORS.red,
                    color: COLORS.white,
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 700,
                    zIndex: 10,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  }}
                >
                  +{item.extraImages!.length}
                </div>
              )}
              
              <div style={{ height: '300px', overflow: 'hidden' }}>
                {isYouTubeVideo ? (
                  <iframe
                    src={item.image}
                    title={item.description}
                    style={{
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      display: 'block',
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.description}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                      display: 'block',
                    }}
                  />
                )}
              </div>
              <div style={{
                padding: '12px 16px 14px',
                backgroundColor: COLORS.red,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                flexShrink: 0,
              }}>
                <ZoomIn size={13} style={{ color: COLORS.beige, flexShrink: 0 }} />
                <p style={{ fontSize: '13px', lineHeight: 1.5, color: COLORS.beige, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  function renderPreuves(items: GalleryItem[]) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
        {items.map((item, i) => {
          const provider = item.description.includes('R Graphismes')
            ? 'R Graphismes'
            : item.description.includes('Koray')
              ? 'Koray Coworking'
              : `Prestataire ${i + 1}`;

          const docs: { src: string; label: string }[] = [
            { src: item.image, label: 'Échange de mails' },
            ...(item.extraImages?.map(e => ({
              src: e.image,
              label: e.description.split(' – ')[0],
            })) ?? []),
          ];

          return (
            <motion.div
              key={`preuves-group-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              {/* Provider label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div style={{
                  width: '6px',
                  height: '36px',
                  backgroundColor: COLORS.red,
                  borderRadius: '3px',
                  flexShrink: 0,
                }} />
                <p style={{
                  fontSize: '17px',
                  fontWeight: 700,
                  color: COLORS.text,
                  margin: 0,
                  letterSpacing: '0.3px',
                }}>
                  {provider}
                </p>
              </div>

              {/* Document cards in a row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${docs.length}, 1fr)`,
                gap: '24px',
              }}>
                {docs.map((doc, j) => (
                  <motion.div
                    key={`doc-${i}-${j}`}
                    whileHover={{ boxShadow: `0 0 0 3px ${COLORS.red}, 0 12px 30px rgba(107,15,26,0.18)`, y: -4 }}
                    onClick={() => setLightboxImage({ src: doc.src, desc: `${provider} — ${doc.label}` })}
                    style={{
                      borderRadius: '20px',
                      overflow: 'hidden',
                      backgroundColor: COLORS.white,
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      cursor: 'zoom-in',
                    }}
                  >
                    <div style={{
                      height: '420px',
                      backgroundColor: '#f9f7f5',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      padding: '20px',
                      boxSizing: 'border-box',
                    }}>
                      <img
                        src={doc.src}
                        alt={`${provider} — ${doc.label}`}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          objectPosition: 'center top',
                          display: 'block',
                        }}
                      />
                    </div>
                    <div style={{
                      padding: '12px 16px 14px',
                      backgroundColor: COLORS.bg,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      <ZoomIn size={13} style={{ color: COLORS.red, flexShrink: 0 }} />
                      <p style={{ fontSize: '13px', fontWeight: 700, color: COLORS.text, margin: 0, lineHeight: 1.4 }}>
                        {doc.label}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  function renderFolderContent() {
    if (!selectedFolder || !project.galleryFolders) return null;

    const rawItems = project.galleryFolders[selectedFolder as keyof typeof project.galleryFolders] ?? [];
    const items = rawItems as GalleryItem[];
    const isPreuves = selectedFolder === 'preuves';
    const isMoodboard = selectedFolder === 'moodboard';

    return (
      <motion.div
        key={selectedFolder}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        {/* Preuves hint banner */}
        {isPreuves && items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: COLORS.red,
              color: COLORS.beige,
              borderRadius: '14px',
              padding: '12px 20px',
              marginBottom: '30px',
              fontSize: '13px',
              opacity: 0.9,
            }}
          >
            <ZoomIn size={16} style={{ flexShrink: 0 }} />
            <span>Cliquez sur une image pour l'agrandir et lire le document en détail.</span>
          </motion.div>
        )}

        {isPreuves
          ? renderPreuves(items)
          : isMoodboard
            ? renderMoodboard(items)
            : renderGrid(items)
        }
      </motion.div>
    );
  }

  // ─── JSX ────────────────────────────────────────────────────────────────────

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingBottom: '100px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(14,14,14,0.92)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              cursor: 'zoom-out',
            }}
          >
            <button
              onClick={() => setLightboxImage(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: COLORS.red,
                border: 'none',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: COLORS.beige,
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
              }}
            >
              <X size={20} />
            </button>

            <motion.img
              key={lightboxImage.src}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={lightboxImage.src}
              alt={lightboxImage.desc}
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '90vw',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                cursor: 'default',
              }}
            />
            {lightboxImage.desc && (
              <p
                onClick={e => e.stopPropagation()}
                style={{
                  marginTop: '16px',
                  color: COLORS.beige,
                  fontSize: '14px',
                  textAlign: 'center',
                  maxWidth: '600px',
                  opacity: 0.85,
                  lineHeight: 1.5,
                }}
              >
                {lightboxImage.desc}
              </p>
            )}
          </motion.div>
        )}
        
        {/* Lightbox Carrousel - Pour carte de visite et carrousels Instagram */}
        {lightboxMultiple && (
          <motion.div
            key="lightbox-carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => { setLightboxMultiple(null); setCarouselIndex(0); }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              backgroundColor: 'rgba(14,14,14,0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              cursor: 'zoom-out',
            }}
          >
            {/* Bouton fermer */}
            <button
              onClick={() => { setLightboxMultiple(null); setCarouselIndex(0); }}
              style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                background: COLORS.red,
                border: 'none',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: COLORS.beige,
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                zIndex: 10,
              }}
            >
              <X size={20} />
            </button>

            {/* Navigation gauche */}
            {carouselIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setCarouselIndex(i => i - 1); }}
                style={{
                  position: 'fixed',
                  left: '20px',
                  background: COLORS.red,
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: COLORS.beige,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                  zIndex: 10,
                }}
              >
                <ChevronLeft size={28} />
              </button>
            )}

            {/* Navigation droite */}
            {carouselIndex < lightboxMultiple.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setCarouselIndex(i => i + 1); }}
                style={{
                  position: 'fixed',
                  right: '20px',
                  background: COLORS.red,
                  border: 'none',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: COLORS.beige,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                  zIndex: 10,
                }}
              >
                <ChevronRight size={28} />
              </button>
            )}

            {/* Indicateurs de slide */}
            <div
              style={{
                position: 'fixed',
                top: '80px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: '8px',
                zIndex: 10,
              }}
              onClick={e => e.stopPropagation()}
            >
              {lightboxMultiple.map((_, i) => (
                <div
                  key={`indicator-${i}`}
                  style={{
                    width: carouselIndex === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: carouselIndex === i ? COLORS.red : 'rgba(246,241,238,0.4)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  onClick={() => setCarouselIndex(i)}
                />
              ))}
            </div>

            {/* Image principale */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`carousel-${carouselIndex}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                onClick={e => e.stopPropagation()}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxWidth: '900px',
                  width: '100%',
                }}
              >
                <img
                  src={lightboxMultiple[carouselIndex].src}
                  alt={lightboxMultiple[carouselIndex].desc}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '75vh',
                    objectFit: 'contain',
                    borderRadius: '16px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                    cursor: 'default',
                  }}
                />
                <p
                  style={{
                    marginTop: '20px',
                    color: COLORS.beige,
                    fontSize: '16px',
                    fontWeight: 600,
                    textAlign: 'center',
                    maxWidth: '600px',
                    opacity: 0.95,
                    lineHeight: 1.5,
                    padding: '0 20px',
                  }}
                >
                  {lightboxMultiple[carouselIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '200px',
          right: '-150px',
          opacity: 0.03,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <Cherry size={600} color={COLORS.red} />
      </div>

      {/* Header */}
      <header
        style={{
          padding: '120px 20px 60px',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            marginBottom: '15px',
            lineHeight: 1.1,
            color: COLORS.text,
          }}
        >
          {project.title}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            fontWeight: 400,
            marginBottom: '40px',
            color: COLORS.text,
          }}
        >
          {project.subtitle}
        </motion.h2>
      </header>

      {/* Brief */}
      <section
        aria-labelledby="brief-heading"
        style={{ maxWidth: '1000px', margin: '0 auto 100px', padding: '0 20px' }}
      >
        <div
          style={{
            backgroundColor: COLORS.red,
            borderRadius: '30px',
            padding: '60px 40px',
            boxShadow: '0 10px 30px rgba(107,15,26,0.2)',
            position: 'relative',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-25px',
              left: '40px',
              backgroundColor: COLORS.white,
              color: COLORS.red,
              padding: '15px',
              borderRadius: '50%',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
          >
            <Info size={24} />
          </div>
          <h3 id="brief-heading" style={{ fontSize: '28px', marginBottom: '30px', color: COLORS.white }}>
            Brief & Contexte
          </h3>
          <div style={{ fontSize: '16px', lineHeight: 1.7, color: COLORS.white }}>
            <p style={{ marginBottom: '15px' }}>
              <strong>Contexte :</strong> {project.brief.context}
            </p>
            {project.brief.hook && (
              <p style={{
                marginBottom: '15px',
                fontStyle: 'italic',
                fontSize: '18px',
                borderLeft: `3px solid ${COLORS.white}`,
                paddingLeft: '15px',
              }}>
                {project.brief.hook}
              </p>
            )}
            <p style={{ marginBottom: '15px' }}>
              <strong>Mission / Création :</strong> {project.brief.mission}
            </p>
            {project.brief.slogan && (
              <p style={{ marginBottom: '15px' }}>
                <strong>Slogan principal :</strong> {project.brief.slogan}
              </p>
            )}
            {project.brief.supports && (
              <p style={{ marginBottom: '15px' }}>
                <strong>Supports réalisés :</strong> {project.brief.supports}
              </p>
            )}
            <p style={{ marginTop: '20px', marginBottom: '20px' }}>
              <strong>Impact attendu :</strong> {project.brief.result}
            </p>
            {project.brief.constraints && !project.brief.hook && (
              <>
                <p style={{ marginBottom: '15px' }}>
                  <strong>Contraintes :</strong> {project.brief.constraints}
                </p>
                {project.brief.problematic && (
                  <p style={{ marginBottom: '15px' }}>
                    <strong>Problématique :</strong> {project.brief.problematic}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Copy Stratégie - Sans titre principal */}
      {project.copyStrategy && (
        <section
          aria-labelledby="copy-strategy-section"
          style={{ maxWidth: '800px', margin: '0 auto 100px', padding: '0 20px' }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
            }}
          >
            {/* Promesse */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.8 }}
            >
              <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '15px', color: COLORS.red }}>
                Promesse
              </h4>
              <motion.div
                whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(107,15,26,0.15)' }}
                style={{
                  backgroundColor: COLORS.red,
                  padding: '30px 25px',
                  borderRadius: '20px',
                  boxShadow: '0 4px 20px rgba(107,15,26,0.1)',
                }}
              >
                <p style={{ lineHeight: 1.6, color: COLORS.white, margin: 0 }}>
                  {project.copyStrategy.promesse}
                </p>
              </motion.div>
            </motion.div>

            {/* Message clé */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.8 }}
            >
              <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '15px', color: COLORS.red }}>
                Message clé
              </h4>
              <motion.div
                whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(107,15,26,0.15)' }}
                style={{
                  backgroundColor: COLORS.red,
                  padding: '30px 25px',
                  borderRadius: '20px',
                  boxShadow: '0 4px 20px rgba(107,15,26,0.1)',
                }}
              >
                <p style={{ lineHeight: 1.6, color: COLORS.white, margin: 0 }}>
                  {project.copyStrategy.messageClé}
                </p>
              </motion.div>
            </motion.div>

            {/* Ton */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '15px', color: COLORS.red }}>
                Ton
              </h4>
              <motion.div
                whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(107,15,26,0.15)' }}
                style={{
                  backgroundColor: COLORS.red,
                  padding: '30px 25px',
                  borderRadius: '20px',
                  boxShadow: '0 4px 20px rgba(107,15,26,0.1)',
                }}
              >
                <p style={{ lineHeight: 1.6, color: COLORS.white, margin: 0 }}>
                  {project.copyStrategy.ton}
                </p>
              </motion.div>
            </motion.div>

            {/* Concept */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.8 }}
            >
              <h4 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '15px', color: COLORS.red }}>
                Concept
              </h4>
              <motion.div
                whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(107,15,26,0.15)' }}
                style={{
                  backgroundColor: COLORS.red,
                  padding: '30px 25px',
                  borderRadius: '20px',
                  boxShadow: '0 4px 20px rgba(107,15,26,0.1)',
                }}
              >
                <p style={{ lineHeight: 1.6, color: COLORS.white, margin: 0 }}>
                  {project.copyStrategy.concept}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Objectives */}
      <section
        aria-labelledby="objectives-heading"
        style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 20px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h3
            id="objectives-heading"
            style={{ fontSize: '32px', marginBottom: '15px', color: COLORS.text }}
          >
            Objectifs de communication
          </h3>
          <div
            aria-hidden="true"
            style={{ width: '60px', height: '3px', backgroundColor: COLORS.red, margin: '0 auto' }}
          />
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
        }}>
          {project.objectives.map((obj, index) => (
            <motion.div
              key={`obj-${obj.type}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3, duration: 0.8 }}
              whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(107,15,26,0.15)' }}
              style={{
                backgroundColor: COLORS.red,
                padding: '40px 30px',
                borderRadius: '24px',
                boxShadow: '0 4px 20px rgba(107,15,26,0.1)',
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: COLORS.white,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
                color: COLORS.red,
              }}>
                <obj.icon size={24} />
              </div>
              <h4 style={{ fontSize: '20px', marginBottom: '10px', color: COLORS.white }}>
                Objectif {obj.type}
              </h4>
              <p style={{ lineHeight: 1.6, color: COLORS.white }}>{obj.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Targets */}
      <section
        aria-labelledby="targets-heading"
        style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 20px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h3 id="targets-heading" style={{ fontSize: '32px', marginBottom: '15px', color: COLORS.text }}>
            Coeur de cible
          </h3>
          <div
            aria-hidden="true"
            style={{ width: '60px', height: '3px', backgroundColor: COLORS.red, margin: '0 auto' }}
          />
        </div>
        
        {/* Visuel cible spécial pour Soleia Expérience */}
        {project.id === 3 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '80px',
              padding: '60px 20px',
              flexWrap: 'wrap',
            }}
          >
            {/* Cible principale : 18-35 ans - GRANDE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                position: 'relative',
                width: '420px',
                height: '420px',
                maxWidth: '90vw',
                maxHeight: '90vw',
                flexShrink: 0,
              }}
            >
              {/* SVG Cible principale - GRANDE */}
              <svg
                viewBox="0 0 420 420"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                {/* 2 cercles concentriques */}
                <circle
                  cx="210"
                  cy="210"
                  r="200"
                  fill="none"
                  stroke={COLORS.red}
                  strokeWidth="6"
                  opacity="0.25"
                />
                <circle
                  cx="210"
                  cy="210"
                  r="130"
                  fill="none"
                  stroke={COLORS.red}
                  strokeWidth="9"
                />
                
                {/* Lignes de visée - croix */}
                <line x1="210" y1="10" x2="210" y2="70" stroke={COLORS.red} strokeWidth="7" opacity="0.65" />
                <line x1="210" y1="350" x2="210" y2="410" stroke={COLORS.red} strokeWidth="7" opacity="0.65" />
                <line x1="10" y1="210" x2="70" y2="210" stroke={COLORS.red} strokeWidth="7" opacity="0.65" />
                <line x1="350" y1="210" x2="410" y2="210" stroke={COLORS.red} strokeWidth="7" opacity="0.65" />
              </svg>
              
              {/* Texte centre : 18-35 ans - ANIMATION AU SCROLL */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none',
                  width: '230px',
                  maxWidth: '230px',
                }}
              >
                <p style={{
                  fontSize: 'clamp(36px, 6vw, 52px)',
                  fontWeight: 700,
                  color: COLORS.red,
                  margin: 0,
                  lineHeight: 1,
                  letterSpacing: '2px',
                }}>
                  18-35 ans
                </p>
              </div>
            </motion.div>

            {/* Cible secondaire : Description - PETITE et DÉCALÉE */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{
                position: 'relative',
                width: '300px',
                height: '300px',
                maxWidth: '75vw',
                maxHeight: '75vw',
                flexShrink: 0,
                marginTop: '40px', // Décalage vertical pour dynamisme
              }}
            >
              {/* SVG Cible secondaire - PETITE */}
              <svg
                viewBox="0 0 300 300"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                {/* 2 cercles concentriques */}
                <circle
                  cx="150"
                  cy="150"
                  r="140"
                  fill="none"
                  stroke={COLORS.red}
                  strokeWidth="5"
                  opacity="0.25"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="90"
                  fill="none"
                  stroke={COLORS.red}
                  strokeWidth="7"
                />
                
                {/* Lignes de visée - croix */}
                <line x1="150" y1="10" x2="150" y2="55" stroke={COLORS.red} strokeWidth="5" opacity="0.65" />
                <line x1="150" y1="245" x2="150" y2="290" stroke={COLORS.red} strokeWidth="5" opacity="0.65" />
                <line x1="10" y1="150" x2="55" y2="150" stroke={COLORS.red} strokeWidth="5" opacity="0.65" />
                <line x1="245" y1="150" x2="290" y2="150" stroke={COLORS.red} strokeWidth="5" opacity="0.65" />
              </svg>
              
              {/* Texte centre : Description - ANIMATION AU SCROLL */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  pointerEvents: 'none',
                  width: '160px',
                  maxWidth: '160px',
                  padding: '0 10px',
                }}
              >
                <p style={{
                  fontSize: 'clamp(12px, 2.2vw, 14px)',
                  fontWeight: 600,
                  color: COLORS.red,
                  margin: 0,
                  lineHeight: 1.4,
                }}>
                  Jeunes adultes intéressés par le développement personnel, la créativité et les expériences bien-être
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          // Affichage standard pour les autres projets
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
          }}>
            {project.targets.map((target, index) => {
              const TargetIcon = index === 0 ? Target : index === 1 ? Users : Users2;
              return (
                <motion.div
                  key={`target-${target.type}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.3, duration: 0.8 }}
                  style={{
                    textAlign: 'center',
                    backgroundColor: COLORS.red,
                    padding: '40px',
                    borderRadius: '24px',
                    boxShadow: '0 4px 15px rgba(107,15,26,0.1)',
                  }}
                >
                  <div style={{
                    marginBottom: '20px',
                    color: COLORS.white,
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                    <TargetIcon size={40} />
                  </div>
                  <h4 style={{ fontSize: '22px', marginBottom: '10px', color: COLORS.white }}>
                    {target.type}
                  </h4>
                  <p style={{ lineHeight: 1.6, color: COLORS.white, marginBottom: '15px' }}>
                    {target.desc}
                  </p>
                  {target.channels && (
                    <p style={{
                      lineHeight: 1.6,
                      color: COLORS.white,
                      fontSize: '14px',
                      borderTop: '1px solid rgba(255,255,255,0.3)',
                      paddingTop: '15px',
                      marginTop: '15px',
                    }}>
                      <strong>Canaux :</strong> {target.channels}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Gallery */}
      <section
        aria-labelledby="gallery-heading"
        style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 20px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h3 id="gallery-heading" style={{ fontSize: '32px', marginBottom: '15px', color: COLORS.text }}>
            Galerie du projet
          </h3>
          <div
            aria-hidden="true"
            style={{ width: '60px', height: '3px', backgroundColor: COLORS.red, margin: '0 auto 20px' }}
          />
        </div>

        {/* LGM Prototype Button */}
        {isLGM && (
          <div style={{ marginBottom: '30px' }}>
            <a
              href="https://www.figma.com/design/bQeMrKmKKL5Q19P3C5YkUz/Untitled?node-id=0-1&p=f&t=6zQtN0chzWFBubBZ-0"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: COLORS.red,
                color: COLORS.white,
                padding: '15px 30px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 15px rgba(107,15,26,0.3)',
              }}
            >
              APPLICATION MOBILE PROTOTYPE
            </a>
          </div>
        )}

        {project.galleryFolders ? (
          <>
            {/* Folder selector */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 220px))',
              gap: '25px',
              marginBottom: '50px',
              justifyContent: 'center',
            }}>
              <FolderCard
                title="Réseaux Sociaux"
                isSelected={selectedFolder === 'reseauxSociaux'}
                onClick={() => setSelectedFolder(selectedFolder === 'reseauxSociaux' ? null : 'reseauxSociaux')}
              />
              <FolderCard
                title="Vidéos"
                isSelected={selectedFolder === 'videos'}
                onClick={() => setSelectedFolder(selectedFolder === 'videos' ? null : 'videos')}
              />
              <FolderCard
                title="Print"
                isSelected={selectedFolder === 'print'}
                onClick={() => setSelectedFolder(selectedFolder === 'print' ? null : 'print')}
              />
              <FolderCard
                title="Plus"
                isSelected={selectedFolder === 'plus'}
                onClick={() => setSelectedFolder(selectedFolder === 'plus' ? null : 'plus')}
              />
              {project.galleryFolders?.preuves && (
                <FolderCard
                  title="Preuves"
                  isSelected={selectedFolder === 'preuves'}
                  onClick={() => setSelectedFolder(selectedFolder === 'preuves' ? null : 'preuves')}
                />
              )}
              {project.galleryFolders?.moodboard && (
                <FolderCard
                  title="Moodboard"
                  isSelected={selectedFolder === 'moodboard'}
                  onClick={() => setSelectedFolder(selectedFolder === 'moodboard' ? null : 'moodboard')}
                />
              )}
            </div>

            {/* Folder content */}
            <AnimatePresence mode="wait">
              {selectedFolder && renderFolderContent()}
            </AnimatePresence>
          </>
        ) : (
          /* Fallback: old flat gallery */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
          }}>
            {project.gallery.map((img, i) => (
              <motion.div
                key={`gallery-${i}`}
                whileHover={{ boxShadow: `0 0 0 3px ${COLORS.red}` }}
                transition={{ duration: 0.5 }}
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  height: '350px',
                  cursor: 'pointer',
                  backgroundColor: COLORS.white,
                }}
              >
                <img
                  src={img}
                  alt={`${project.title} - Image ${i + 1}`}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    imageRendering: '-webkit-optimize-contrast',
                    backfaceVisibility: 'hidden',
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Back button */}
      <div style={{ textAlign: 'center', padding: '0 20px' }}>
        <motion.button
          onClick={onBack}
          whileHover={{ gap: '15px' }}
          transition={{ duration: 0.4 }}
          style={{
            backgroundColor: COLORS.red,
            color: COLORS.white,
            padding: '18px 40px',
            borderRadius: '40px',
            border: 'none',
            fontSize: '18px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 10px 30px rgba(107,15,26,0.3)',
          }}
        >
          <ArrowLeft size={20} /> Retour aux réalisations
        </motion.button>
      </div>
    </motion.div>
  );
});