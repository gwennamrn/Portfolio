import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

interface TextRevealProps {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
  delay?: number;
  trigger?: "load" | "scroll";
}

export function TextReveal({
  as = "h2",
  className,
  children,
  delay = 0,
  trigger = "scroll",
}: TextRevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const element = ref.current;
    const split = new SplitText(element, { type: "lines,words", linesClass: "overflow-hidden" });

    gsap.set(split.words, { y: "110%" });

    const tween = gsap.to(split.words, {
      y: "0%",
      duration: 1,
      ease: "expo.out",
      stagger: 0.04,
      delay,
      scrollTrigger:
        trigger === "scroll"
          ? {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          : undefined,
    });

    return () => {
      tween.kill();
      split.revert();
    };
  }, [delay, trigger]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
