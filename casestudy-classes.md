# casestudy.css — Class Reference

This document lists and describes the classes and selectors defined in `casestudy.css`. Use this as a quick reference when building case study pages.

## File-level notes

- Base layout assumes a centered `.container` with `max-width: 1400px`.
- All sections use 2rem horizontal padding by default.
- Responsive behavior is handled with breakpoints at 1130px, 768px and 480px.

---

## Layout / utilities

- `.container`

  - Purpose: page content wrapper (centers content, limits width).
  - Example: `<main class="container">...</main>`

- `.section`

  - Purpose: generic section wrapper. Column layout, gap and 2rem horizontal padding, supports `scroll-margin-top` for scrollspy.
  - Example:
    ```html
    <section class="section" id="overview">...</section>
    ```

- `.half-width`
  - Purpose: utility to limit width to 50% (used if needed inside sections).

---

## Typography / content

- `h1`, `.h1`, `h2`, `.h2`, `h3`, `.h3`

  - Purpose: standardized headline styles (sizes set for desktop and scaled down in media queries).

- `.feature`

  - Purpose: large highlighted headline block (used for hero/feature statements).

- `p`

  - Purpose: paragraph default styling.

- `.sr-only`
  - Purpose: visually-hidden helper for accessibility (screen-reader-only text).

---

## Overview grid

- `.overview-grid`

  - Purpose: two-column layout for the Overview section, aligns left content with project metadata on the right.
  - Example:
    ```html
    <div class="overview-grid">
      <div class="overview-left">...h1/p...</div>
      <aside class="overview-right">...project meta...</aside>
    </div>
    ```

- `.overview-left`

  - Purpose: left column (main description).

- `.overview-right`

  - Purpose: right column (project metadata). Contains `.project-meta`.

- `.project-meta`
  - Purpose: vertical list of project details (Category, Year, Expertise, Tools).
  - Example:
    ```html
    <ul class="project-meta">
      <li><strong>Category:</strong> School Project</li>
      <li><strong>Year:</strong> 2022</li>
    </ul>
    ```

---

## Dual column helpers

- `.dual-col`

  - Purpose: simple two-column (flex) section, responsive (wraps on small screens).
  - Example:
    ```html
    <section class="dual-col">
      <div>Left</div>
      <div>Right</div>
    </section>
    ```

- `.dual-col-related`
  - Purpose: similar to `.dual-col` for related content groups.

---

## Image + text layout

- `.dual-col-img`

  - Purpose: image (square) on the left and text on the right. Uses `.img-col` and `.text-col`.
  - Example:
    ```html
    <section class="dual-col-img">
      <div class="img-col"><img src="..." alt="" /></div>
      <div class="text-col"><p>Text content</p></div>
    </section>
    ```

- `.img-col`

  - Purpose: container for square image (uses `aspect-ratio: 1/1`).

- `.img-col img`

  - Purpose: ensures image covers the square (`object-fit: cover`).

- `.text-col`

  - Purpose: text column beside the image.

- Responsive: on widths ≤ 768px the layout stacks (image full width, text below).

---

## Problem & Solution block

- `.problem-solution .grid`

  - Purpose: grid layout for problem/solution pairs (2 columns desktop, 1 column narrow).

- `.problem`

  - Purpose: problem card styling (accent border).

- `.solution`

  - Purpose: solution card styling (accent border, can include an image).

- `.solution img`
  - Purpose: image style inside solution cards.

---

## Highlight / parallax section

- `.highlight-parallax`

  - Purpose: breakout highlight area (designed to extend toward the viewport edge). Contains `.highlight-bg` and `.highlight-content`. Use when you want an image-backed feature section.

- `.highlight-parallax .highlight-bg`

  - Purpose: background image layer (supports parallax behavior). In current CSS it uses `background-attachment: fixed` and covers the section.

- `.highlight-parallax .highlight-content`

  - Purpose: foreground content (text card over the background).

- Usage example:
  ```html
  <section class="highlight-parallax">
    <div class="highlight-bg" style="background-image:url('...')"></div>
    <div class="highlight-content">
      <h2 id="featured">Featured</h2>
      <p>Highlight text</p>
    </div>
  </section>
  ```

---

## Breadcrumb & Scrollspy

- `.breadcrumb`

  - Purpose: small breadcrumb bar above content.

- `.scrollspy-nav`

  - Purpose: sticky horizontal navigation for section links; built to be horizontally scrollable on small widths. Use anchor links to section IDs.

- `.scrollspy-nav a` and `.scrollspy-nav a.active`

  - Purpose: scrollspy link styling and active state.

- Simple usage:
  ```html
  <nav class="scrollspy-nav">
    <a href="#overview">Overview</a>
    <a href="#process">Process</a>
  </nav>
  ```

---

## Responsive behavior summary

- Breakpoints implemented:
  - `@media (max-width: 1130px)` — stack `.dual-col`, relax highlight max-width.
  - `@media (max-width: 768px)` — stack `.overview-grid`, make `.dual-col-img` vertical, make `.problem-solution` grid single column, reduce paddings.
  - `@media (max-width: 480px)` — scale typography and keep 2rem horizontal padding rule for sections (per project requirement).

---

## Quick examples

- Two-column overview (left: title+intro, right: metadata):

  ```html
  <section class="section overview" id="overview">
    <div class="overview-grid">
      <div class="overview-left">
        <h1>Project title</h1>
        <p>Intro text</p>
      </div>
      <aside class="overview-right">
        <ul class="project-meta">
          <li><strong>Category:</strong> School Project</li>
          <li><strong>Year:</strong> 2022</li>
        </ul>
      </aside>
    </div>
  </section>
  ```

- Highlight parallax:
  ```html
  <section class="highlight-parallax">
    <div class="highlight-bg" style="background-image:url('hero.jpg')"></div>
    <div class="highlight-content"><h2 id="featured">Featured</h2></div>
  </section>
  ```

---

If you want, I can generate a minimal HTML template (bhoral.html) that demonstrates all the patterns together.
