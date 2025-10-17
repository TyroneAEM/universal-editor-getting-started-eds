# Homework 2: Block Modeling with Variants & Reusable JSON

## ✅ Completed Tasks

### 1. Created Reusable JSON Partial for Button Types
**File**: `/models/partials/button-types.json`

Defines reusable button type options that can be referenced from multiple blocks:
- Default (no class)
- Primary (red button)
- Secondary (outlined button)

**Benefits:**
- Single source of truth
- Easy to maintain
- Can be reused across multiple blocks (teaser, hero, cards, etc.)

---

### 2. Enhanced Teaser Block with Style Variants
**File**: `/blocks/teaser/_teaser.json`

**Added Two New Fields:**

#### A. Button Type Field
```json
{
  "component": "select",
  "name": "textContent_cta2Type",
  "label": "Button Type",
  "options": {
    "$ref": "/models/partials/button-types.json#/buttonTypes"
  }
}
```
- References the reusable partial
- Allows authors to choose button style

#### B. Style Variant Field
```json
{
  "component": "select",
  "name": "classes",
  "label": "Style Variant",
  "options": [
    {"name": "Default", "value": ""},
    {"name": "Dark", "value": "dark"},
    {"name": "Wide", "value": "wide"},
    {"name": "Compact", "value": "compact"}
  ]
}
```
- Provides 4 layout options
- Can be combined (e.g., "dark wide")

---

### 3. Added CSS for Variants
**File**: `/blocks/teaser/teaser.css`

#### Style Variants:
- **Dark**: Dark semi-transparent overlay, white text
- **Wide**: Full viewport width (no max-width constraint)
- **Compact**: Reduced height (300px) for content-rich pages

#### Button Types:
- **Default**: Blue button (existing)
- **Primary**: Red button (#e34850) with hover effect
- **Secondary**: Outlined button with fill-on-hover

---

### 4. Created Test Page
**File**: `/test-teaser-variants.html`

Demonstrates all combinations:
1. Default teaser + default button
2. Dark variant + primary button
3. Wide variant + secondary button
4. Compact variant + default button
5. Dark + Wide combination + primary button

---

## 🧪 How to Test

### Local Testing (Immediate)
```
http://localhost:3000/test-teaser-variants.html
```

You'll see 5 teaser blocks showing different variant combinations!

---

### Universal Editor Testing (After 2-3 minutes)
```
https://author-p117652-e1146973.adobeaemcloud.com/ui#/@ttseinternal/aem/universal-editor/canvas/author-p117652-e1146973.adobeaemcloud.com/content/aem-eds/index.html?ref=teaser-hw2
```

**What to test:**
1. Edit an existing teaser block or add a new one
2. Look for **two new fields** in the properties panel:
   - **Button Type** dropdown (Default, Primary, Secondary)
   - **Style Variant** dropdown (Default, Dark, Wide, Compact)
3. Try different combinations and preview

---

## 📊 Key Concepts Demonstrated

### 1. **Reusable JSON Partials**
Instead of duplicating button type options in every block:
```json
// ❌ DON'T: Duplicate in every block
{
  "options": [
    {"name": "Primary", "value": "primary"},
    {"name": "Secondary", "value": "secondary"}
  ]
}

// ✅ DO: Create once, reference everywhere
{
  "options": {
    "$ref": "/models/partials/button-types.json#/buttonTypes"
  }
}
```

### 2. **Block Variants via Classes**
Variants are applied as CSS classes:
```html
<!-- Default -->
<div class="teaser">

<!-- Dark variant -->
<div class="teaser dark">

<!-- Multiple variants -->
<div class="teaser dark wide">
```

### 3. **Element Grouping**
Fields with same prefix (`textContent_`) render in same `<div>`:
- `textContent_text` → title/body
- `textContent_cta` → link URL
- `textContent_ctaText` → button label
- `textContent_cta2Type` → button class

**Result:**
```html
<div>
  <h2>Title</h2>
  <p>Body text</p>
  <a href="..." class="button primary">Click</a>
</div>
```

---

## 🎨 Visual Results

### Default Teaser
- Standard 1600px width
- Blue button
- Semi-transparent white overlay

### Dark Variant
- Dark overlay (90% opacity)
- White text
- Great for bright images

### Wide Variant
- Full viewport width
- Spans edge-to-edge
- Maximum visual impact

### Compact Variant
- Reduced height (300px)
- Smaller text
- Perfect for content-heavy pages

### Button Types
- **Default**: Blue (#0073e6)
- **Primary**: Red (#e34850) - calls attention
- **Secondary**: Outlined - subtle approach

---

## 📁 Files Created/Modified

### Created:
1. `/models/partials/button-types.json` - Reusable button options
2. `/test-teaser-variants.html` - Local test page
3. `/test-quote-variants.html` - Quote test page (from HW1)
4. `HOMEWORK_2_SUMMARY.md` - This file

### Modified:
1. `/blocks/teaser/_teaser.json` - Added variants and button type
2. `/blocks/teaser/teaser.css` - Added variant styles
3. `component-definition.json` - Auto-compiled
4. `component-models.json` - Auto-compiled
5. `component-filters.json` - Auto-compiled

---

## 🚀 Next Steps

### Test in Universal Editor:
1. Wait 2-3 minutes for EDS to build the branch
2. Open URL with `?ref=teaser-hw2`
3. Edit a teaser block
4. Try different Style Variants and Button Types
5. Preview to see changes

### Merge to Main (when ready):
```bash
git checkout main
git merge teaser-hw2
git push origin main
```

---

## 💡 Lessons Learned

1. **Reusable Partials** = DRY principle (Don't Repeat Yourself)
2. **Variants** provide flexibility without creating new blocks
3. **Element Grouping** creates clean, semantic HTML
4. **CSS Classes** handle all styling variations
5. **Short branch names** prevent DNS label length errors

---

## ✅ Homework 2 Complete!

Both homework exercises from the EDS Bootcamp Session 4 are now complete:
- ✅ Homework 1: Quote block color variants
- ✅ Homework 2: Teaser block with variants & reusable JSON

Total time: ~35 minutes (as estimated in the slides!)

