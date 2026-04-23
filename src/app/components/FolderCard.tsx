import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { COLORS } from './constants';

interface FolderCardProps {
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

export function FolderCard({ title, isSelected, onClick }: FolderCardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      style={{
        cursor: 'pointer',
        position: 'relative',
        width: '100%',
        maxWidth: '220px',
      }}
    >
      {/* Folder Shape */}
      <div
        style={{
          position: 'relative',
          paddingTop: '10px',
        }}
      >
        {/* Folder Tab */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '15px',
            width: '80px',
            height: '15px',
            backgroundColor: COLORS.red,
            borderRadius: '8px 8px 0 0',
            opacity: 0.8,
            zIndex: 1,
          }}
        />
        
        {/* Folder Body */}
        <div
          style={{
            position: 'relative',
            backgroundColor: COLORS.red,
            borderRadius: '12px',
            padding: '30px 20px 20px',
            boxShadow: isSelected 
              ? `0 8px 25px rgba(107, 15, 26, 0.5)` 
              : '0 4px 15px rgba(107, 15, 26, 0.25)',
            border: isSelected ? `3px solid ${COLORS.text}` : 'none',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Content */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
            }}
          >
            <span
              style={{
                color: COLORS.beige,
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.3px',
              }}
            >
              {title}
            </span>
            
            <motion.div
              animate={{ rotate: isSelected ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              style={{
                color: COLORS.beige,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ChevronRight size={20} />
            </motion.div>
          </div>
          
          {/* Bottom shadow detail */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '8px',
              background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))',
              borderRadius: '0 0 12px 12px',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}