import { motion } from "motion/react";
import { useState } from "react";
import { X } from "lucide-react";
import { COLORS } from "~/lib/colors";

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
  const [modal, setModal] = useState<FolderItem | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => item.extraImages ? setModal(item) : setModal(item)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group relative flex aspect-square w-full items-end overflow-hidden rounded-2xl bg-white text-left"
          >
            <img
              src={item.image.src}
              width={item.image.width}
              height={item.image.height}
              alt={item.description}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              className="relative w-full p-4 text-sm font-medium text-white"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}
            >
              {item.description}
            </div>
          </motion.button>
        ))}
      </div>

      {modal && (
        <div
          className="fixed inset-0 z-[900] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
          onClick={() => setModal(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-2xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Fermer"
              onClick={() => setModal(null)}
              className="absolute right-4 top-4 rounded-full p-2"
              style={{ backgroundColor: COLORS.bg }}
            >
              <X size={20} />
            </button>
            <div className="grid gap-4">
              {(modal.extraImages ?? [{ image: modal.image, description: modal.description }]).map(
                (entry, i) => (
                  <figure key={i}>
                    <img
                      src={entry.image.src}
                      width={entry.image.width}
                      height={entry.image.height}
                      alt={entry.description}
                      className="h-auto w-full rounded-xl"
                    />
                    <figcaption className="mt-2 text-center text-sm opacity-70">
                      {entry.description}
                    </figcaption>
                  </figure>
                ),
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function FolderVideosGrid({ items }: { items: VideoItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {items.map((v, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="overflow-hidden rounded-2xl bg-white shadow-md"
        >
          <div className="relative aspect-[9/16]">
            <iframe
              src={v.url}
              title={v.description}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="p-3 text-sm">{v.description}</div>
        </motion.div>
      ))}
    </div>
  );
}
