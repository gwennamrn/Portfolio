import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LinksFunction,
} from "react-router";

import appCss from "~/styles/app.css?url";
import { Navigation } from "~/components/layout/Navigation";
import { Footer } from "~/components/layout/Footer";
import { LenisProvider } from "~/components/layout/LenisProvider";
import { CherryCursor } from "~/components/cherry/CherryCursor";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appCss },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#F6F1EE" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <LenisProvider>
      <CherryCursor />
      <Navigation />
      <main className="relative flex min-h-screen flex-col">
        <Outlet />
      </main>
      <Footer />
    </LenisProvider>
  );
}

export function meta() {
  return [
    { title: "Gwennaëlle — Portfolio BTS Communication" },
    {
      name: "description",
      content:
        "Portfolio de Gwennaëlle, étudiante en BTS Communication. Projets créatifs, stratégies de marque, direction artistique.",
    },
    { property: "og:title", content: "Gwennaëlle — Portfolio BTS Communication" },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "fr_FR" },
  ];
}

export function ErrorBoundary({ error }: { error: unknown }) {
  let message = "Oh non !";
  let details = "Une erreur inattendue s'est produite.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Erreur";
    details = error.status === 404 ? "Cette page n'existe pas." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-8 text-center">
      <h1 className="font-serif text-6xl text-[var(--color-cherry)]">{message}</h1>
      <p className="text-lg opacity-70">{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto rounded-md bg-black/5 p-4 text-left text-sm">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
