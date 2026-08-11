import type { MetadataRoute } from "next";

export const dynamic = "force-static";

// Relative (no leading slash) so the manifest resolves correctly whether the
// app is served from the domain root (Capacitor) or a subpath (GitHub Pages).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EMI Score",
    short_name: "EMI Score",
    description:
      "Lleva la puntuación de tus partidas en tiempo real, guardada en el dispositivo.",
    start_url: ".",
    scope: ".",
    display: "standalone",
    orientation: "portrait",
    background_color: "#08070d",
    theme_color: "#08070d",
    icons: [
      {
        src: "icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
