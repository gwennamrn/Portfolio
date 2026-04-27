import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback } from "react";
import { Picture } from "~/components/ui/Picture";
import { COLORS } from "~/lib/colors";

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
}

export function ProjectGallery({
  images,
  alt,
}: {
  images: GalleryImage[];
  alt: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  ]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative mx-auto w-full max-w-[1000px]">
      <div className="overflow-hidden rounded-[20px]" ref={emblaRef}>
        <div className="flex">
          {images.map((img, i) => (
            <div key={i} className="relative min-w-0 flex-[0_0_100%]">
              <Picture
                src={img.src}
                width={img.width}
                height={img.height}
                alt={`${alt} ${i + 1}`}
                loading="lazy"
                className="h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Image précédente"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-3 text-white shadow-lg"
            style={{ backgroundColor: COLORS.cherry }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Image suivante"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-3 text-white shadow-lg"
            style={{ backgroundColor: COLORS.cherry }}
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}
