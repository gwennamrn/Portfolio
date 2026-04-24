import { useEffect, memo } from "react";

const RED_DEFAULT =
  `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="28" viewBox="0 0 20 28">` +
  `<path d="M2 1L3 23l4.5-5.5L12 26l3-1.2L10.5 16l6.5-1.5z" fill="white" stroke="white" stroke-width="2.4" stroke-linejoin="round"/>` +
  `<path d="M2 1L3 23l4.5-5.5L12 26l3-1.2L10.5 16l6.5-1.5z" fill="#8E1B2C" stroke="#ffffff" stroke-width="0.6" stroke-linejoin="round"/>` +
  `</svg>`;

const RED_POINTER =
  `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="28" viewBox="0 0 22 28">` +
  `<path d="M7 1v13.5l-3.5-3L1 14l7 8.5h7.5L18 16V10.5h-3V8.5h-2.5V6.5H10V1z" fill="white" stroke="white" stroke-width="2.4" stroke-linejoin="round"/>` +
  `<path d="M7 1v13.5l-3.5-3L1 14l7 8.5h7.5L18 16V10.5h-3V8.5h-2.5V6.5H10V1z" fill="#8E1B2C" stroke="#ffffff" stroke-width="0.6" stroke-linejoin="round"/>` +
  `</svg>`;

function toCursor(svg: string, hotX: number, hotY: number, fallback: string): string {
  const encoded = typeof window === "undefined" ? Buffer.from(svg).toString("base64") : btoa(svg);
  return `url("data:image/svg+xml;base64,${encoded}") ${hotX} ${hotY}, ${fallback}`;
}

export const CherryCursor = memo(function CherryCursor() {
  useEffect(() => {
    const defaultCursor = toCursor(RED_DEFAULT, 2, 1, "default");
    const pointerCursor = toCursor(RED_POINTER, 7, 1, "pointer");
    const textCursor = toCursor(RED_DEFAULT, 2, 1, "text");

    const style = document.createElement("style");
    style.id = "cherry-cursor-style";
    style.textContent = `
      html, body, * {
        cursor: ${defaultCursor} !important;
      }
      a, button, [role="button"],
      input[type="submit"], input[type="button"], input[type="reset"],
      select, summary, label[for], [tabindex="0"],
      a *, button *, [role="button"] * {
        cursor: ${pointerCursor} !important;
      }
      input[type="text"], input[type="email"], input[type="password"],
      input[type="search"], input[type="tel"], input[type="url"],
      input[type="number"], textarea, [contenteditable="true"] {
        cursor: ${textCursor} !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  return null;
});
