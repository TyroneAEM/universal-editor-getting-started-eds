import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * Decorates the quote block
 * Expected structure from authoring:
 * - First row/cell: Quote text (can be rich text with formatting)
 * - Second row/cell: Author name
 * - Third row/cell (optional): Author title/role
 *
 * @param {Element} block The quote block element
 */
export default function decorate(block) {
  // Get all rows from the block
  const rows = [...block.children];

  // Create the quote structure
  const quoteContainer = document.createElement('blockquote');
  quoteContainer.className = 'quote-container';

  // Add quotation mark
  const openQuote = document.createElement('span');
  openQuote.className = 'quote-mark quote-mark-open';
  openQuote.setAttribute('aria-hidden', 'true');
  openQuote.textContent = '"';
  quoteContainer.appendChild(openQuote);

  // Process quote text (first row)
  if (rows[0]) {
    const quoteTextDiv = rows[0].querySelector('div') || rows[0];
    quoteTextDiv.className = 'quote-text';
    moveInstrumentation(rows[0], quoteTextDiv);
    quoteContainer.appendChild(quoteTextDiv);
  }

  // Process author name (second row)
  if (rows[1]) {
    const cite = document.createElement('cite');
    cite.className = 'quote-attribution';

    const authorDiv = rows[1].querySelector('div') || rows[1];
    authorDiv.className = 'quote-author';
    moveInstrumentation(rows[1], authorDiv);
    cite.appendChild(authorDiv);

    // Process author role (third row, optional)
    if (rows[2]) {
      const roleDiv = rows[2].querySelector('div') || rows[2];
      roleDiv.className = 'quote-role';
      moveInstrumentation(rows[2], roleDiv);
      cite.appendChild(roleDiv);
    }

    quoteContainer.appendChild(cite);
  }

  // Clear the block and add new structure
  block.textContent = '';
  block.appendChild(quoteContainer);
}
