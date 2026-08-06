import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

// Root HTML document for the web/PWA build. Only runs at static-export time,
// so this is the one place to hand-place manifest/meta tags expo-router
// doesn't manage itself. See https://docs.expo.dev/router/reference/static-rendering/
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />
        <title>Alièfè — Saveur d&apos;Afrique</title>
        <meta
          name="description"
          content="Alièfè, traiteur ivoirien haut de gamme à Casablanca. Appelez ou écrivez sur WhatsApp pour commander."
        />

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#14201B" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Alièfè" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* RN Web resets body/html scroll so the app can manage its own scroll views */}
        <ScrollViewStyleReset />
        {/*
          expo-router's reset above pins html/body/#root to height:100%, which mobile
          browsers resolve against a stale viewport as the address bar shows/hides —
          the gap shows through as blank space below fixed elements like the tab bar.
          100dvh tracks the actual visual viewport instead. The background-color
          fallback (matching each theme's --bg, see constants/theme.ts) avoids a white
          flash in the safe-area gutter before the app mounts its own surfaces.
        */}
        <style
          id="aliefe-viewport-fix"
          dangerouslySetInnerHTML={{
            __html: `
              body { background-color: #F6F1E6; }
              @media (prefers-color-scheme: dark) { body { background-color: #14201B; } }
              @supports (height: 100dvh) {
                html, body, #root { height: 100dvh; }
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
