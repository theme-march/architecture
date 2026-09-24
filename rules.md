# Antigravity — Section Rules

> Follow these rules **before creating any section.**

---

## Rule 1 — No Extra Classes on Existing Component Elements

Do not append utility or spacing classes to a component's existing root class.

```html
<!-- ❌ Bad -->
<div class="appointment-form-wrap ak-bg mt-0 pb-4">

<!-- ✅ Good -->
<div class="appointment-form-wrap">

<!-- ✅ Good — need a layout tweak? Use a modifier -->
<div class="appointment-form-wrap appointment-form-wrap--flush">
```

---

## Rule 2 — No `ak-` Prefix on New Classes

`ak-` is reserved for shared/reused utilities only. Never use it on new, section-specific classes.

```html
<!-- ❌ Bad -->
<div class="ak-hero-banner">
<div class="ak-team-card">

<!-- ✅ Good -->
<div class="hero-banner">
<div class="team-card">
```

```css
/* ❌ Bad */
.ak-hero-title { font-size: 2rem; }

/* ✅ Good */
.hero-title { font-size: 2rem; }
```

---

## Rule 3 — Reuse Classes; Avoid `::before` and `::after`

Check if an existing class already covers the styles you need. Use real HTML elements instead of pseudo-elements for decorative content.

```css
/* ❌ Bad */
.hero-divider::before {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: var(--color-accent);
}
```

```html
<!-- ✅ Good — real element, visible and controllable -->
<span class="divider-line"></span>
```

```css
/* ✅ Good */
.divider-line {
  display: block;
  width: 60px;
  height: 3px;
  background: var(--color-accent);
}
```

---

## Rule 4 — Always Use Variable Colors

Never hardcode color values. Use `var(--color-*)` for everything — `color`, `background`, `border-color`, `box-shadow`, all of it.
if you need a color which has opacity, use `color-mix(in srgb, var(--color-*) , transparent --%)`.
```css
/* ❌ Bad */
.card {
  background: #ffffff;
  color: #1a1a2e;
  border: 1px solid #e0e0e0;
}
color: rgba(37, 40, 61, 0.6);
/* ✅ Good */
.card {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}
```
color-mix(in srgb, var(--white-color), transparent 40%)

> All color variables live in `variables.css`. Add new ones there — never inline.

---

## Rule 5 — Do Not Repeat Styles a Reused Class Already Has in _typography.scss

Before writing SCSS, check if a similar component already exists in `abstracts/`, `base/`, `components/`, or `layout/` folders. If it does, reuse it and apply modifiers if necessary. Do not redeclare the same property.

```css
/* Existing — already has margin-top: 20px */
.section-heading__pill {
  display: inline-block;
  margin-top: 20px;
  padding: 4px 12px;
  border-radius: 100px;
}
```

```css
/* ❌ Bad — margin-top already comes from section-heading__pill */
.hero-pill {
  font-size: 40px;
  margin-top: 20px;
  color: var(--color-accent);
}

/* ✅ Good — only add what's genuinely new */
.hero-pill {
  color: var(--color-accent);
}
```

```html
<!-- ✅ Both classes work together cleanly -->
<span class="section-heading__pill hero-pill"></span>
```

---

## Rule 6 — Avoid Complex Code

Use the simplest HTML structure and CSS selectors that get the job done. No deep nesting, no unnecessary wrappers, no multi-layer z-index stacking unless the design actually needs it.

```html
<!-- ❌ Bad -->
<div class="section-outer">
  <div class="section-inner">
    <div class="section-container">
      <div class="section-content-wrap">
        <p>Hello</p>
      </div>
    </div>
  </div>
</div>

<!-- ✅ Good -->
<section class="about-section">
  <div class="container">
    <p>Hello</p>
  </div>
</section>
```

```css
/* ❌ Bad */
.section-outer .section-inner .section-container .section-content-wrap p {
  color: var(--color-text-primary);
}

/* ✅ Good */
.about-section p {
  color: var(--color-text-primary);
}
```

---

## Rule 7 — No Bootstrap Grid Utility Classes in HTML

Do not use `col-lg-*`, `col-md-*`, `col-sm-*`, `row`, `g-*`, or any Bootstrap column/row utility class directly in HTML. Define layout and spacing as BEM elements inside the component's `.scss` file.

```html
<!-- ❌ Bad -->
<div class="row align-items-center">
  <div class="col-lg-7">...</div>
  <div class="col-lg-5">...</div>
</div>

<!-- ✅ Good -->
<div class="about-section__row">
  <div class="about-section__content-col">...</div>
  <div class="about-section__image-col">...</div>
</div>
```

```scss
/* ✅ Good — widths live in the component SCSS, not the HTML */
.about-section {
  &__row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  &__content-col {
    width: 58.333333%; // col-lg-7 equivalent

    @media screen and (max-width: 991px) {
      width: 100%;
    }
  }

  &__image-col {
    width: 41.666667%; // col-lg-5 equivalent

    @media screen and (max-width: 991px) {
      width: 100%;
    }
  }
}
```

---

## Rule 8 — No Forced Styles on Bare HTML Elements

Do not write styles targeting bare elements (`img`, `p`, `a`, `h1`, etc.) inside a component scope. Always target a class instead.

```scss
/* ❌ Bad — forces styles on every img inside the component */
.about-section {
  img {
    width: 30px;
    height: 30px;
  }
}

/* ✅ Good — scoped to a class, intention is clear */
.about-section {
  &__icon {
    width: 30px;
    height: 30px;
  }
}
```

```html
<!-- ✅ Good -->
<img class="about-section__icon" src="icon.svg" alt="">
```

---

## Rule 9 — No Background Images in SCSS

Do not load images via `background-image: url()` in SCSS. Place the image directly in HTML using an `<img>` tag.

```scss
/* ❌ Bad */
.appointment-section {
  &__ellipse {
    background-image: url('../img/appointment/Ellipse 2112.png');
    background-size: cover;
  }
}
```

```html
<!-- ✅ Good -->
<img class="appointment-section__ellipse" src="assets/img/appointment/Ellipse 2112.png" alt="">
```

---

## Rule 10 — Avoid Redundant Global Styles

Do not redeclare properties that are already handled by global styles or functional design patterns. **Never create a local style for a common element if a global component already exists.**

```scss
/* ❌ Bad — these are already defined globally for h5 tags */
.recent-posts__post-title {
  font-family: var(--heading-font-family);
  color: var(--heading-color);
  font-weight: 700;
  line-height: 1.4;
}

/* ✅ Good — only define what's unique to this component */
.recent-posts__post-title {
  font-size: 18px;
  margin-bottom: 8px;
}
```

---

## Rule 11 — Always Use Responsive Mixins

Never use standard `@media` queries for responsiveness. Always use the project's `@include respond()` and `@include respond-min()` mixins to ensure consistency across all breakpoints.

```css
/* ❌ Bad */
@media screen and (max-width: 991px) {
  .hero-title { font-size: 24px; }
}

@media screen and (min-width: 1200px) {
  .hero-title { font-size: 48px; }
}
```

```scss
/* ✅ Good */
.hero-title {
  @include respond(lg) {
    font-size: 24px;
  }
  
  @include respond-min(xl) {
    font-size: 48px;
  }
}
```

---

## Rule 12 — Global Heading Hierarchy and Sizing

Maintain a strict, accessible heading hierarchy. Every page must have exactly one `h1`. Every major section must begin its heading level with `h2`. Subsequent headings within that section must follow sequentially (`h3`, `h4`, etc.) without skipping levels.

```html
<!-- ❌ Bad — Skipping levels -->
<section>
  <h2>Section Title</h2>
  <h5>Card Title</h5>
</section>

<!-- ✅ Good — Sequential -->
<section>
  <h2>Section Title</h2>
  <h3>Card Title</h3>
  <h4>Card Sub-detail</h4>
</section>
```

Heading sizes are standardized globally. Do not redeclare `font-size`, `font-family`, or `color` for headings in component SCSS unless it is a genuine exception.

- **h1**: 96px
- **h2**: 64px
- **h3**: 50px
- **h4**: 40px
- **h5**: 30px
- **h6**: 24px

---

## Rule 13 — Container Class Usage and Customization

Do not add any additional or custom classes beside the built-in Bootstrap `.container` class. 

- Keep the Bootstrap `.container` clean on its own element without combining it with other custom or utility classes.
- If any customization, offset, or override is needed, write a separate `div` inside for that customization.
- If a layout/section does not need to follow the specific standard container width (1320px), do not write or use the `.container` class.

```html
<!-- ❌ Bad — Custom class added beside/on the built-in container element -->
<div class="container container-customizes">
  ...
</div>

<!-- ❌ Bad — Using container when standard 1320px container width is not needed -->
<div class="container custom-fluid-banner">
  ...
</div>

<!-- ✅ Good — Separate div for customization -->
<div class="container">
  <div class="container-customizes">
    ...
  </div>
</div>

<!-- ✅ Good — If not following the standard 1320px width, avoid container class -->
<div class="custom-fluid-banner">
  ...
</div>
```

---

## Pre-Section Checklist

- [ ] No extra utility classes bolted onto existing component elements
- [ ] No `ak-` prefix on newly created classes
- [ ] Existing classes reused wherever styles already match
- [ ] No `::before` / `::after` where a real element works just as well
- [ ] All colors use `var(--color-*)` — zero hardcoded hex/rgb values
- [ ] No duplicate style declarations that a reused class already provides
- [ ] HTML structure is lean — no unnecessary wrappers or deep nesting
- [ ] No `background-image: url()` in SCSS — images placed in HTML via `<img>` tag
- [ ] No styles targeting bare elements (`img`, `p`, `a`) — always use a class
- [x] No redundant global styles (fonts, colors, resets) already handled by inheritance
- [x] Existing components checked in `components/` and `layout/` for reuse
- [ ] Only one `h1` per page (typically in hero/banner)
- [ ] Every section must start with `h2` as the highest heading level
- [ ] Sequential hierarchy (h2 -> h3 -> h4) with no level gaps (e.g., no h5 directly after h2)
- [ ] Use global sizes: h1: 96px, h2: 64px, h3: 50px, h4: 40px, h5: 30px, h6: 24px
- [ ] No extra classes attached directly to `.container` (use a separate div for customizations)
- [ ] Only use `.container` when adhering to the standard container width (1320px)

---