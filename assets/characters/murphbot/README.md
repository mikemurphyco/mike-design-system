# MurphBot

Mike Murphy's site mascot, built from the Node mark: orange head (`--mm-orange` #FF6434), navy limbs/features (`--mm-navy` #001E3A), one teal antenna dot (`--mm-teal` #1ECEBE).

- **murphbot.svg** — self-animating (float / blink / wave) via CSS `<style>` inside the SVG. Respects `prefers-reduced-motion`. Limb/eye/mouth color flips navy → chalk under `prefers-color-scheme: dark` so it stays visible on dark surfaces.
- **murphbot.png** — static raster capture, for thumbnails/social where SVG isn't practical.

## Current use

Deployed as the 404-page character on mikemurphy.ai (`/assets/brand/murphbot.svg`, see `src/pages/404.astro`).

## Planned

Rebuild as a reusable animated Remotion component in `mike-video-factory`, driven by the same class hooks already in the SVG (`.mb-body`, `.mb-eyes`, `.mb-hand`) so timeline-driven keyframes can replace the CSS animation.
