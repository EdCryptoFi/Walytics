---
name: The Casebook System
colors:
  surface: '#fdf8f8'
  surface-dim: '#ddd9d8'
  surface-bright: '#fdf8f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3f2'
  surface-container: '#f1edec'
  surface-container-high: '#ebe7e6'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#444748'
  inverse-surface: '#313030'
  inverse-on-surface: '#f4f0ef'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#6f5a4a'
  on-secondary: '#ffffff'
  secondary-container: '#faddc8'
  on-secondary-container: '#756050'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1c15'
  on-tertiary-container: '#85847b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#faddc8'
  secondary-fixed-dim: '#dcc2ad'
  on-secondary-fixed: '#27180c'
  on-secondary-fixed-variant: '#564334'
  tertiary-fixed: '#e5e2d8'
  tertiary-fixed-dim: '#c9c7bc'
  on-tertiary-fixed: '#1c1c15'
  on-tertiary-fixed-variant: '#48473f'
  background: '#fdf8f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-case:
    fontFamily: Archivo Narrow
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Archivo Narrow
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Archivo Narrow
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  note-typewriter:
    fontFamily: Courier Prime
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.4'
  label-stamp:
    fontFamily: Courier Prime
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  grid-margin: 2rem
  gutter: 1.5rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

This design system is built on a **Noir / Tactical Investigation** aesthetic. It moves away from standard SaaS layouts to create a workspace that feels like a detective’s desk in the mid-20th century. The goal is to make data analysis feel like solving a high-stakes mystery—transforming "metrics" into "evidence" and "users" into "suspects."

The style is **Tactile / Skeuomorphic** mixed with **Brutalism**. It utilizes high-contrast outlines, heavy shadows to simulate depth on a desk, and a "scrapbook" approach to layout where information is "pinned" or "taped" to the interface. The brand personality is gritty yet playful, maintaining the "Walrus Holmes" charm through cartoonish investigative motifs and a sense of urgent discovery.

## Colors

The palette is grounded in the "Detective's Office" environment. 

- **Noir Black (#121212):** Used for primary text, heavy borders, and deep shadows.
- **Dark Wood (#4D3B2C):** Used for structural backgrounds and "desk surface" containers.
- **Aged Paper (#E8E2D0 / #F5F2E7):** The primary canvas color for cards and data areas, simulating old dossier paper.
- **Teal, Yellow, Red:** These original accent colors are desaturated to match the vintage feel, used exclusively for categorization and status "stamps" (e.g., Active, Observed, Warning).

## Typography

This design system uses a dual-font strategy to separate "The System" from "The Investigation."

- **The Bold Authority:** `Archivo Narrow` is used for primary headings. It is bold, condensed, and impactful, mimicking the look of newspaper headlines or bold case file labels.
- **The Evidence:** `Courier Prime` is used for all "handwritten" or "typed" notes, labels, and secondary data. It represents the detective's manual input and provides a mechanical, typewriter aesthetic.
- **The Functional:** `Inter` is used for body text and long-form data to ensure readability across complex analytics.

## Layout & Spacing

The layout follows a **Fixed Grid** model that simulates a physical workspace. 

- **The Desk:** The outer container uses a subtle dark wood grain texture.
- **The Files:** Content is organized into cards that do not necessarily align to a strict, clean grid. Some cards may have a 1-2 degree rotation (randomized) to appear as if they were tossed onto the desk.
- **Breakpoints:**
  - **Desktop (1440px):** 12-column layout with 32px gutters. High use of "evidence pinning" sidebars.
  - **Tablet (768px):** 6-column layout. Elements lose their rotation to maximize screen real estate.
  - **Mobile (375px):** 2-column layout. "Torn paper" edges remain but rotations are removed entirely.

## Elevation & Depth

Hierarchy is established through **Physical Layering**:

1.  **Level 0 (Desk):** Deep, dark wood texture with minimal light.
2.  **Level 1 (Dossier):** Large paper sheets (Aged Paper) with a slight `4px` black border and a `8px` hard drop shadow (Noir Black at 40% opacity).
3.  **Level 2 (Evidence Scraps):** Smaller cards, sticky notes, and polaroids that sit "on top" of the dossier. These have higher elevation with more diffused shadows to suggest they are pinned or taped.
4.  **Level 3 (Magnifying Glass):** Interactive overlays that use a circular backdrop-blur (simulating glass) and a high-contrast border to highlight specific data points.

## Shapes

The shape language is primarily **Sharp (0px)** to reflect the cut edges of paper and folders. 

- **Torn Edges:** Use CSS masks or SVG filters to create a subtle "torn paper" effect on the bottom or side edges of secondary cards.
- **Folders:** The top-left of primary containers should feature a "folder tab" shape containing the Case Number.
- **Sticky Notes:** Small square containers with a `roundedness: 1` and a slight bottom-right curl.

## Components

### Cards (Evidence Piles)
- **Primary:** Aged paper background, 3px solid Noir border, "pinned" with a circular SVG "pushpin" icon at the top center.
- **Scraps:** Off-white background, jagged bottom edge, used for quick stats.
- **Folders:** A border-only container that wraps groups of cards, featuring a tab at the top.

### Buttons & Interaction
- **Primary Action:** Solid Noir Black with white text (`Archivo Narrow`). On hover, it shifts slightly as if being pressed into the paper.
- **Secondary Action:** Ghost style with a dashed "cut-out" border.
- **Stamps:** Statuses (e.g., "URGENT") should look like ink stamps—slightly rotated, varying opacity, and using `Courier Prime`.

### Inputs & Fields
- **Search:** Styled as a "Magnifying Glass" icon that expands into a line.
- **Fields:** Look like underlined blank spaces on a form. No background boxes, just a bottom border.

### Unique Elements
- **Tape:** Use semi-transparent beige rectangles at the corners of "Evidence Scraps" to simulate scotch tape.
- **Ink Bleed:** Subtle grain texture overlays on all primary UI elements to prevent them from looking "too digital."
- **The Detective's Toolkit:** A fixed dock at the bottom containing "The Toolkit" (Magnifying Glass for zoom, Flashlight for dark-mode toggle, Pencil for annotations).