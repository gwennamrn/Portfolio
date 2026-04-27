import { motion } from "motion/react";
import { useState } from "react";
import { ChevronRight, X, ZoomIn, ChevronLeft } from "lucide-react";
import { Picture } from "~/components/ui/Picture";
import { COLORS } from "~/lib/colors";

interface FolderCardProps {
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

export function FolderCard({ title, isSelected, onClick }: FolderCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full max-w-[220px] cursor-pointer border-0 bg-transparent p-0"
      aria-pressed={isSelected}
    >
      <div className="relative pt-[10px]">
        <div
          className="absolute left-[15px] top-0 z-[1] h-[15px] w-20 rounded-t-lg"
          style={{ backgroundColor: COLORS.red, opacity: 0.8 }}
        />
        <div
          className="relative rounded-xl px-5 pb-5 pt-[30px] transition-all duration-300"
          style={{
            backgroundColor: COLORS.red,
            boxShadow: isSelected
              ? "0 8px 25px rgba(107, 15, 26, 0.5)"
              : "0 4px 15px rgba(107, 15, 26, 0.25)",
            border: isSelected ? `3px solid ${COLORS.text}` : "none",
          }}
        >
          <div className="flex items-center justify-between gap-[10px]">
            <span
              className="text-[15px] font-semibold tracking-[0.3px]"
              style={{ color: COLORS.beige }}
            >
              {title}
            </span>
            <motion.div
              animate={{ rotate: isSelected ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center"
              style={{ color: COLORS.beige }}
            >
              <ChevronRight size={20} />
            </motion.div>
          </div>
          <div
            className="absolute inset-x-0 bottom-0 h-2 rounded-b-xl"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))" }}
          />
        </div>
      </div>
    </motion.button>
  );
}

interface ImageEntry {
  src: string;
  width: number;
  height: number;
}

interface FolderItem {
  image: ImageEntry;
  description: string;
  extraImages?: Array<{ image: ImageEntry; description: string }>;
}

interface VideoItem {
  url: string;
  description: string;
}

export function FolderImagesGrid({ items }: { items: FolderItem[] }) {
  const [single, setSingle] = useState<{ src: string; desc: string } | null>(null);
  const [multiple, setMultiple] = useState<Array<{ src: string; desc: string }> | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  return (
    <>
      <div
        className="grid gap-[30px]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))" }}
      >
        {items.map((item, i) => {
          const hasExtra = item.extraImages && item.extraImages.length > 0;
          return (
            <motion.button
              key={i}
              type="button"
              whileHover={{ y: -8, boxShadow: "0 12px 30px rgba(0,0,0,0.15)" }}
              transition={{ duration: 0.4 }}
              onClick={() => {
                if (hasExtra) {
                  setMultiple(
                    item.extraImages!.map((e) => ({ src: e.image.src, desc: e.description })),
                  );
                  setCarouselIndex(0);
                } else {
                  setSingle({ src: item.image.src, desc: item.description });
                }
              }}
              className="relative flex cursor-zoom-in flex-col overflow-hidden rounded-[20px] bg-white text-left shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
            >
              {hasExtra && (
                <div
                  className="absolute right-[15px] top-[15px] z-10 rounded-[20px] px-4 py-2 text-sm font-bold shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                  style={{ backgroundColor: COLORS.red, color: COLORS.white }}
                >
                  +{item.extraImages!.length}
                </div>
              )}
              <div className="h-[300px] overflow-hidden">
                <Picture
                  src={item.image.src}
                  width={item.image.width}
                  height={item.image.height}
                  alt={item.description}
                  loading="lazy"
                  className="block h-full w-full object-cover object-[center_top]"
                  pictureClassName="block h-full w-full"
                />
              </div>
              <div
                className="flex flex-shrink-0 items-center gap-2 px-4 py-3"
                style={{ backgroundColor: COLORS.red }}
              >
                <ZoomIn size={13} className="flex-shrink-0" style={{ color: COLORS.beige }} />
                <p
                  className="m-0 text-[13px] leading-[1.5]"
                  style={{ color: COLORS.beige }}
                >
                  {item.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {single && (
        <Lightbox single={single} onClose={() => setSingle(null)} />
      )}
      {multiple && (
        <LightboxCarousel
          items={multiple}
          index={carouselIndex}
          onIndex={setCarouselIndex}
          onClose={() => {
            setMultiple(null);
            setCarouselIndex(0);
          }}
        />
      )}
    </>
  );
}

export function FolderVideosGrid({ items }: { items: VideoItem[] }) {
  return (
    <div
      className="grid gap-[30px]"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))" }}
    >
      {items.map((v, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="flex flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
        >
          <div className="relative aspect-[9/16]">
            <iframe
              src={v.url}
              title={v.description}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
          <div
            className="flex flex-shrink-0 items-center gap-2 px-4 py-3"
            style={{ backgroundColor: COLORS.red }}
          >
            <ZoomIn size={13} className="flex-shrink-0" style={{ color: COLORS.beige }} />
            <p className="m-0 text-[13px] leading-[1.5]" style={{ color: COLORS.beige }}>
              {v.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function FolderMoodboardGrid({ items }: { items: FolderItem[] }) {
  const [single, setSingle] = useState<{ src: string; desc: string } | null>(null);
  return (
    <>
      <div className="flex flex-wrap items-start justify-center gap-7">
        {items.map((item, i) => (
          <motion.button
            key={i}
            type="button"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            whileHover={{
              boxShadow: `0 0 0 3px ${COLORS.red}, 0 12px 40px rgba(107,15,26,0.2)`,
              y: -6,
            }}
            onClick={() => setSingle({ src: item.image.src, desc: item.description })}
            className="flex w-full max-w-[410px] flex-shrink-0 cursor-zoom-in flex-col overflow-hidden rounded-[20px] shadow-[0_6px_24px_rgba(0,0,0,0.12)]"
            style={{ backgroundColor: COLORS.bg }}
          >
            <div className="leading-[0]" style={{ backgroundColor: COLORS.bg }}>
              <Picture
                src={item.image.src}
                width={item.image.width}
                height={item.image.height}
                alt={item.description}
                loading="lazy"
                className="block h-auto w-full rounded-t-[20px]"
              />
            </div>
            <div
              className="flex items-center gap-[9px] px-[18px] py-[14px]"
              style={{ backgroundColor: COLORS.red }}
            >
              <ZoomIn size={14} className="flex-shrink-0" style={{ color: COLORS.beige }} />
              <p
                className="m-0 text-[13px] leading-[1.45]"
                style={{ color: COLORS.beige }}
              >
                {item.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
      {single && <Lightbox single={single} onClose={() => setSingle(null)} />}
    </>
  );
}

export function FolderPreuvesGrid({ items }: { items: FolderItem[] }) {
  const [single, setSingle] = useState<{ src: string; desc: string } | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mb-[30px] flex items-center gap-[10px] rounded-[14px] px-5 py-3 text-[13px]"
        style={{ backgroundColor: COLORS.red, color: COLORS.beige, opacity: 0.9 }}
      >
        <ZoomIn size={16} className="flex-shrink-0" />
        <span>Cliquez sur une image pour l'agrandir et lire le document en détail.</span>
      </motion.div>
      <div className="flex flex-col gap-[50px]">
        {items.map((item, i) => {
          const provider = item.description.includes("R Graphismes")
            ? "R Graphismes"
            : item.description.includes("Koray")
              ? "Koray Coworking"
              : `Prestataire ${i + 1}`;
          const docs: { src: string; label: string }[] = [
            { src: item.image.src, label: "Échange de mails" },
            ...(item.extraImages?.map((e) => ({
              src: e.image.src,
              label: e.description.split(" – ")[0],
            })) ?? []),
          ];

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className="mb-5 flex items-center gap-[14px]">
                <div
                  className="h-9 w-[6px] flex-shrink-0 rounded-[3px]"
                  style={{ backgroundColor: COLORS.red }}
                />
                <p
                  className="m-0 text-[17px] font-bold tracking-[0.3px]"
                  style={{ color: COLORS.text }}
                >
                  {provider}
                </p>
              </div>
              <div
                className="grid gap-6"
                style={{ gridTemplateColumns: `repeat(${docs.length}, 1fr)` }}
              >
                {docs.map((doc, j) => (
                  <motion.button
                    key={j}
                    type="button"
                    whileHover={{
                      boxShadow: `0 0 0 3px ${COLORS.red}, 0 12px 30px rgba(107,15,26,0.18)`,
                      y: -4,
                    }}
                    onClick={() =>
                      setSingle({ src: doc.src, desc: `${provider} — ${doc.label}` })
                    }
                    className="cursor-zoom-in overflow-hidden rounded-[20px] bg-white text-left shadow-[0_4px_15px_rgba(0,0,0,0.1)]"
                  >
                    <div
                      className="flex h-[420px] items-start justify-center p-5"
                      style={{ backgroundColor: "#f9f7f5" }}
                    >
                      <Picture
                        src={doc.src}
                        alt={`${provider} — ${doc.label}`}
                        loading="lazy"
                        className="block h-full w-full object-contain object-[center_top]"
                        pictureClassName="block h-full w-full"
                      />
                    </div>
                    <div
                      className="flex items-center gap-2 px-4 py-3"
                      style={{ backgroundColor: COLORS.bg }}
                    >
                      <ZoomIn size={13} className="flex-shrink-0" style={{ color: COLORS.red }} />
                      <p
                        className="m-0 text-[13px] font-bold leading-[1.4]"
                        style={{ color: COLORS.text }}
                      >
                        {doc.label}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
      {single && <Lightbox single={single} onClose={() => setSingle(null)} />}
    </>
  );
}

function Lightbox({
  single,
  onClose,
}: {
  single: { src: string; desc: string };
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex cursor-zoom-out flex-col items-center justify-center p-5"
      style={{ backgroundColor: "rgba(14,14,14,0.92)" }}
    >
      <button
        type="button"
        aria-label="Fermer"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute right-5 top-5 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
        style={{ background: COLORS.red, color: COLORS.beige }}
      >
        <X size={20} />
      </button>
      <motion.img
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.3 }}
        src={single.src}
        alt={single.desc}
        onClick={(e) => e.stopPropagation()}
        className="cursor-default rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
        style={{ maxWidth: "90vw", maxHeight: "80vh", objectFit: "contain" }}
      />
      {single.desc && (
        <p
          onClick={(e) => e.stopPropagation()}
          className="mt-4 max-w-[600px] text-center text-sm leading-[1.5] opacity-85"
          style={{ color: COLORS.beige }}
        >
          {single.desc}
        </p>
      )}
    </motion.div>
  );
}

function LightboxCarousel({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: Array<{ src: string; desc: string }>;
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex cursor-zoom-out items-center justify-center p-5"
      style={{ backgroundColor: "rgba(14,14,14,0.95)" }}
    >
      <button
        type="button"
        aria-label="Fermer"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="fixed right-5 top-5 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
        style={{ background: COLORS.red, color: COLORS.beige }}
      >
        <X size={20} />
      </button>
      {index > 0 && (
        <button
          type="button"
          aria-label="Image précédente"
          onClick={(e) => {
            e.stopPropagation();
            onIndex(index - 1);
          }}
          className="fixed left-5 z-10 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full border-0 shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
          style={{ background: COLORS.red, color: COLORS.beige }}
        >
          <ChevronLeft size={28} />
        </button>
      )}
      {index < items.length - 1 && (
        <button
          type="button"
          aria-label="Image suivante"
          onClick={(e) => {
            e.stopPropagation();
            onIndex(index + 1);
          }}
          className="fixed right-5 z-10 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full border-0 shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
          style={{ background: COLORS.red, color: COLORS.beige }}
        >
          <ChevronRight size={28} />
        </button>
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed left-1/2 top-20 z-10 flex -translate-x-1/2 gap-2"
      >
        {items.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => onIndex(i)}
            aria-label={`Image ${i + 1}`}
            className="h-2 cursor-pointer rounded-[4px] border-0 transition-all duration-300"
            style={{
              width: index === i ? 24 : 8,
              backgroundColor: index === i ? COLORS.red : "rgba(246,241,238,0.4)",
            }}
          />
        ))}
      </div>
      <motion.div
        key={`carousel-${index}`}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="flex w-full max-w-[900px] flex-col items-center"
      >
        <Picture
          src={items[index].src}
          alt={items[index].desc}
          className="cursor-default rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          style={{ maxWidth: "100%", maxHeight: "75vh", objectFit: "contain" }}
        />
        <p
          className="mt-5 max-w-[600px] px-5 text-center text-base font-semibold leading-[1.5] opacity-95"
          style={{ color: COLORS.beige }}
        >
          {items[index].desc}
        </p>
      </motion.div>
    </motion.div>
  );
}
