# Teaser Block Implementation Guide

This guide walks through the three stages of building a teaser block component for Adobe Experience Manager Edge Delivery Services with Universal Editor support.

## Overview

The **teaser block** showcases:
- **Image**: A visually engaging background image
- **Text content**: Title and body text
- **Call-to-action (CTA) button**: A link to prompt user interaction

---

## Stage 1: Create Block JSON Structure

### Files Created:
- `/blocks/teaser/_teaser.json` - Block definition, model, and filters
- `/models/_section.json` - Updated to include teaser in section filters

### Key Concepts:

#### 1. **Field Collapse**
Field collapse combines multiple fields into a single HTML element using attributes:
- `image` + `imageAlt` → `<img src="..." alt="...">`

#### 2. **Element Grouping**
Fields with the same prefix (e.g., `textContent_`) are grouped in a single `<div>`:
- `textContent_text`, `textContent_cta`, `textContent_ctaText` → All rendered in one `<div>`

#### 3. **Type Inference**
The Universal Editor automatically infers HTML element types:
- `reference` field named `image` → `<img>` element
- `aem-content` field suffixed with `cta` → `<a>` element

### Block Model Fields:

```json
{
  "id": "teaser",
  "fields": [
    {
      "component": "reference",
      "name": "image",
      "label": "Image"
    },
    {
      "component": "text",
      "name": "imageAlt",
      "label": "Image alt text",
      "required": true
    },
    {
      "component": "richtext",
      "name": "textContent_text",
      "label": "Text",
      "required": true
    },
    {
      "component": "aem-content",
      "name": "textContent_cta",
      "label": "CTA"
    },
    {
      "component": "text",
      "name": "textContent_ctaText",
      "label": "CTA label"
    }
  ]
}
```

### Resulting HTML Structure:

```html
<div class="block teaser">
  <div>
    <!-- Field-collapsed image -->
    <picture>
      <img src="..." alt="The authored alt text"/>
    </picture>
  </div>
  <div>
    <!-- Element-grouped textContent fields -->
    <h2>The authored title</h2>
    <p>The authored body text</p>
    <a href="/authored/cta/link">Click me!</a>
  </div>
</div>
```

### Block Definition:

The definition registers the block in Universal Editor:
- `title`: Display name in the block palette ("Teaser")
- `id`: Unique identifier ("teaser")
- `resourceType`: Must be `core/franklin/components/block/v1/block`
- `template.model`: Links to the model ID ("teaser")
- `template.[fieldName]`: Default values for fields

### Block Filters:

Since teaser is **not a container block**, its filters array is empty. Instead, we add "teaser" to the section block's filters in `/models/_section.json` so it can be added to sections.

---

## Stage 2: Add CSS Styling

### File Created:
- `/blocks/teaser/teaser.css` - Block styling

### Key CSS Features:

#### 1. **Full-Width Layout**
```css
.block.teaser {
  width: 1600px;
  max-width: 100vw;
  left: 50%;
  transform: translateX(-50%);
}
```
- Centers the block and allows it to span full viewport width

#### 2. **Absolute Positioned Image**
```css
.block.teaser picture {
  position: absolute;
  z-index: -1;
  inset: 0;
}

.block.teaser picture img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
```
- Image fills entire block as a background
- `object-fit: cover` ensures no distortion

#### 3. **Text Overlay**
```css
.block.teaser > div:last-child {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
}
```
- Semi-transparent white box at bottom
- Contains title, body text, and CTA

#### 4. **Fade-In Animation**
```css
.block.teaser {
  animation: teaser-fade-in 0.6s;
}

@keyframes teaser-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```
- Smooth entrance effect when block loads

#### 5. **CTA Button Styling**
```css
.block.teaser .button-container a.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #0073e6;
  color: #fff;
  border-radius: 5px;
}
```
- Blue button with white text
- Hover effect changes to darker blue

---

## Stage 3: Add JavaScript Interactivity

### File Created:
- `/blocks/teaser/teaser.js` - Block JavaScript

### Key JavaScript Features:

#### 1. **Image Zoom Effect**
```javascript
ctaButton.addEventListener('mouseenter', () => {
  image.style.transform = 'scale(1.1)';
  image.style.transition = 'transform 0.3s ease-in-out';
});

ctaButton.addEventListener('mouseleave', () => {
  image.style.transform = 'scale(1)';
});
```
- When hovering over CTA button, image scales to 110%
- Smooth 0.3s transition creates engaging effect

#### 2. **Semantic Class Enhancement**
```javascript
block.classList.add('teaser-enhanced');
```
- Adds additional class for styling hooks
- Indicates JavaScript has been applied

#### 3. **Terms and Conditions Detection**
```javascript
const paragraphs = block.querySelectorAll('p');
paragraphs.forEach((p) => {
  if (p.textContent.startsWith('Terms and conditions:')) {
    p.classList.add('terms-and-conditions');
  }
});
```
- Automatically identifies T&C paragraphs
- Adds class for special styling (e.g., smaller font, italic)

### Decorate Function Pattern:

All EDS blocks use a `decorate()` function that:
- Takes the block element as a parameter
- Modifies the DOM
- Adds event listeners
- Applies enhancements
- Must be exported as default

```javascript
export default function decorate(block) {
  // Your enhancements here
}
```

---

## Building and Deploying

### Build JSON Files:
```bash
npm run build:json
```

This compiles all block JSON files into:
- `component-definition.json` - Block definitions
- `component-models.json` - Block models
- `component-filters.json` - Block filters

### Lint Your Code:
```bash
npm run lint:js
```

### Deploy to GitHub:
```bash
git add .
git commit -m "Add teaser block with CSS and JavaScript"
git push origin teaser
```

### View in Universal Editor:

Access your page with the query parameter matching your branch:
```
https://your-editor-url.com/?ref=teaser
```

The teaser block will appear in the block palette and can be added to sections.

---

## File Structure

```
/blocks/teaser/
├── _teaser.json      # Block definition, model, and filters
├── teaser.css        # Block styling
└── teaser.js         # Block JavaScript enhancements
```

---

## References

- [Create a new block](https://experienceleague.adobe.com/en/docs/experience-manager-learn/sites/edge-delivery-services/developing/universal-editor/5-new-block#block-fields)
- [Develop a block with CSS](https://experienceleague.adobe.com/en/docs/experience-manager-learn/sites/edge-delivery-services/developing/universal-editor/7a-block-css)
- [Develop a block with CSS and JavaScript](https://experienceleague.adobe.com/en/docs/experience-manager-learn/sites/edge-delivery-services/developing/universal-editor/7b-block-js-css)

---

## Next Steps

1. **Test the block** in Universal Editor
2. **Add variants** by adding a `classes` field to the model
3. **Enhance styling** with responsive breakpoints
4. **Add more interactivity** with JavaScript animations
5. **Document usage** for content authors

