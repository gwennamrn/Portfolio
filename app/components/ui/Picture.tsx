import type { CSSProperties, ImgHTMLAttributes } from "react";
import { forwardRef } from "react";

const VARIANT_EXT_RE = /\.(png|jpe?g)$/i;

export function deriveVariants(src: string): { avif: string; webp: string } {
  if (!VARIANT_EXT_RE.test(src)) {
    return { avif: src, webp: src };
  }
  return {
    avif: src.replace(VARIANT_EXT_RE, ".avif"),
    webp: src.replace(VARIANT_EXT_RE, ".webp"),
  };
}

interface PictureProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> {
  src: string;
  width: number;
  height: number;
  alt: string;
  pictureClassName?: string;
  pictureStyle?: CSSProperties;
}

export const Picture = forwardRef<HTMLImageElement, PictureProps>(function Picture(
  { src, width, height, alt, pictureClassName, pictureStyle, ...imgProps },
  ref,
) {
  const { avif, webp } = deriveVariants(src);
  return (
    <picture className={pictureClassName} style={pictureStyle}>
      <source type="image/avif" srcSet={avif} />
      <source type="image/webp" srcSet={webp} />
      <img ref={ref} src={src} width={width} height={height} alt={alt} {...imgProps} />
    </picture>
  );
});
