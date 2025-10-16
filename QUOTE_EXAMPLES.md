# Quote Block Examples

## 🎨 Visual Examples of the Quote Block

Here are several ways to use your new Quote block with different content and styles.

---

## Example 1: Simple Inspirational Quote

### How to Author:
Create a table with 3 rows in your document:

```
| Quote |
|-------|
| The only way to do great work is to love what you do. |
| Steve Jobs |
| Co-founder of Apple Inc. |
```

### Result:
A beautiful quote card with:
- Large, styled quote text with quotation mark
- Author name in red
- Role/title in smaller text
- Gradient background with hover effect

---

## Example 2: Short Quote

```
| Quote |
|-------|
| Stay hungry. Stay foolish. |
| Steve Jobs |
```

Note: The third row (role) is optional!

---

## Example 3: Quote with Rich Text

The quote field supports **rich text formatting**!

```
| Quote |
|-------|
| Success is not the *key* to happiness. **Happiness** is the key to success. |
| Albert Schweitzer |
| Nobel Peace Prize Winner |
```

You can use:
- **Bold text**
- *Italic text*
- [Links](https://example.com)

---

## Example 4: Long Quote

```
| Quote |
|-------|
| Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking. |
| Steve Jobs |
| Stanford Commencement Address, 2005 |
```

---

## Example 5: Technical Quote

```
| Quote |
|-------|
| Any fool can write code that a computer can understand. Good programmers write code that humans can understand. |
| Martin Fowler |
| Software Developer and Author |
```

---

## Example 6: Business Quote

```
| Quote |
|-------|
| The best time to plant a tree was 20 years ago. The second best time is now. |
| Chinese Proverb |
```

---

## 🎨 Style Variants

### Default Style (No Extra Configuration)
Beautiful gradient background with blue/gray tones.

### Emphasis Style
Add section metadata: `Style: emphasis`

Creates a bold purple/violet gradient background with white text and gold author name.

**Use for:** Important quotes, featured testimonials, call-outs

### Minimal Style
Add section metadata: `Style: minimal`

Clean, minimal design with just a left border accent.

**Use for:** Blog quotes, inline quotes, text-heavy pages

### Dark Style
Add section metadata: `Style: dark`

Dark gradient background with light text.

**Use for:** Dark-themed pages, dramatic effect

---

## 📋 How to Add Section Metadata

If you want to use a style variant:

1. Create a section with your Quote block
2. Add a "Section Metadata" block below it
3. Add a row: `Style | emphasis` (or `minimal`, `dark`)

Example structure:
```
| Quote |
|-------|
| Your quote text here |
| Author Name |
| Author Role |

| Section Metadata |
|------------------|
| Style | emphasis |
```

---

## 🎯 Best Practices

### Quote Length
- **Short quotes** (1-2 sentences): Work great in all styles
- **Medium quotes** (2-4 sentences): Best in default or emphasis styles
- **Long quotes** (4+ sentences): Use minimal style or consider breaking up

### Author Information
- **Always include** the author name when known
- **Include role** when it adds credibility or context
- **Be specific** with roles: "CEO of Microsoft" vs just "Business Leader"

### When to Use Quotes
✅ **Good uses:**
- Testimonials from customers
- Expert opinions
- Inspirational messages
- Key findings or insights
- Historical or famous quotes

❌ **Avoid:**
- Very long quotes (use text blocks instead)
- Quotes without attribution
- Too many quotes on one page (loses impact)

---

## 🌐 Real-World Examples

### Customer Testimonial
```
| Quote |
|-------|
| This product transformed our business. We saw a 300% increase in efficiency within the first month. |
| Sarah Johnson |
| CTO, TechCorp Inc. |
```
**Style:** emphasis

---

### Thought Leadership
```
| Quote |
|-------|
| The future of AI isn't about replacing humans, it's about augmenting human capabilities. |
| Dr. Emma Chen |
| AI Research Lead, Stanford University |
```
**Style:** default

---

### Historical Quote
```
| Quote |
|-------|
| In the middle of difficulty lies opportunity. |
| Albert Einstein |
```
**Style:** minimal

---

### Team Member Quote
```
| Quote |
|-------|
| Working here has been an incredible journey. The culture of innovation and collaboration is unlike anywhere else I've worked. |
| Michael Rodriguez |
| Senior Software Engineer |
```
**Style:** default

---

## 🎬 Live Testing

To test your Quote block:

1. **Start local server:**
   ```bash
   npx hlx up
   ```

2. **Create or edit a page** with Quote blocks

3. **View at:** `http://localhost:3000/your-page`

4. **Try different:**
   - Quote lengths
   - With/without role
   - Different style variants
   - Multiple quotes on same page

---

## 📱 Responsive Behavior

The Quote block automatically adjusts for different screen sizes:

**Mobile** (< 768px):
- Smaller font sizes
- Less padding
- Optimized for narrow screens

**Tablet** (768px - 1199px):
- Medium font sizes
- Comfortable padding
- Good for reading

**Desktop** (1200px+):
- Large font sizes
- Generous padding
- Maximum visual impact

---

## 🎨 Customization Tips

Want to personalize your Quote block? Edit `blocks/quote/quote.css`:

### Change the Accent Color
Find `#e34850` (red) and replace with your brand color:
```css
/* Example: Change to blue */
.quote-author {
  color: #3b82f6;
}
```

### Adjust Font Sizes
```css
.quote-text {
  font-size: 1.75rem;  /* Make bigger or smaller */
}
```

### Change Background
```css
.quote-container {
  background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}
```

---

## 🚀 Go Build!

Now you have everything you need to create stunning quote blocks!

**Next steps:**
1. Add a quote to one of your pages
2. Test different styles
3. Customize colors to match your brand
4. Commit and deploy!

**Happy quoting! 📝✨**



