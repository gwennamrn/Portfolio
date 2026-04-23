import { memo } from 'react';
import { motion } from 'motion/react';
import { COLORS } from './constants';
import { TIMELINE_STEPS } from './data';

export const Timeline = memo(function Timeline() {
  return (
    <section
      aria-labelledby="timeline-heading"
      style={{ marginBottom: '100px', maxWidth: '700px', margin: '0 auto 100px' }}
    >
      <h2
        id="timeline-heading"
        style={{ 
          textAlign: 'center', 
          marginBottom: '60px', 
          fontFamily: '"Playfair Display", "Georgia", serif',
          fontSize: '40px', 
          fontWeight: 600,
          color: COLORS.cherry 
        }}
      >
        Mon parcours
      </h2>

      <div style={{ position: 'relative', paddingLeft: '60px' }}>
        {/* Vertical line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '20px',
            top: '0',
            bottom: '0',
            width: '3px',
            backgroundColor: COLORS.cherry,
            borderRadius: '3px',
          }}
        />

        {TIMELINE_STEPS.map((step, i) => (
          <div
            key={step.year}
            style={{
              position: 'relative',
              marginBottom: i === TIMELINE_STEPS.length - 1 ? '0' : '80px',
            }}
          >
            {/* Timeline dot */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-48px',
                top: '8px',
                width: '20px',
                height: '20px',
                backgroundColor: COLORS.cherry,
                borderRadius: '50%',
                border: `3px solid ${COLORS.white}`,
                boxShadow: `0 0 0 2px ${COLORS.cherry}`,
              }}
            />

            {/* Year label */}
            <div
              style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '22px',
                fontWeight: 700,
                color: COLORS.cherry,
                letterSpacing: '0.5px',
                marginBottom: '15px',
              }}
            >
              {step.year}
            </div>

            {/* Details */}
            <div
              style={{
                backgroundColor: COLORS.white,
                padding: '20px 25px',
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                borderLeft: `4px solid ${COLORS.cherry}`,
              }}
            >
              <h4 
                style={{ 
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '18px', 
                  fontWeight: 600,
                  marginBottom: '8px', 
                  color: COLORS.text,
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </h4>
              <p 
                style={{ 
                  fontFamily: '"Inter", sans-serif',
                  fontSize: '15px', 
                  color: COLORS.text,
                  opacity: 0.75,
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});