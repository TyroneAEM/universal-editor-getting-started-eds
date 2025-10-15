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

  // Extract content from rows
  const quoteText = rows[0]?.querySelector('p, div')?.innerHTML || rows[0]?.textContent || '';
  const authorName = rows[1]?.textContent?.trim() || '';
  const authorRole = rows[2]?.textContent?.trim() || '';

  // Create the quote structure
  const quoteContainer = document.createElement('div');
  quoteContainer.className = 'quote-container';

  // Create blockquote element for the quote text
  const blockquote = document.createElement('blockquote');
  blockquote.className = 'quote-text';

  // Add quotation mark
  const openQuote = document.createElement('span');
  openQuote.className = 'quote-mark quote-mark-open';
  openQuote.setAttribute('aria-hidden', 'true');
  openQuote.textContent = '"';

  // Add quote content
  const quoteContent = document.createElement('p');
  quoteContent.innerHTML = quoteText;

  // Move instrumentation from original element to new structure
  if (rows[0]) {
    moveInstrumentation(rows[0], quoteContent);
  }

  blockquote.appendChild(openQuote);
  blockquote.appendChild(quoteContent);

  quoteContainer.appendChild(blockquote);

  // Create cite/attribution section if author exists
  if (authorName) {
    const cite = document.createElement('cite');
    cite.className = 'quote-attribution';

    const authorElement = document.createElement('span');
    authorElement.className = 'quote-author';
    authorElement.textContent = authorName;

    // Move instrumentation for author
    if (rows[1]) {
      moveInstrumentation(rows[1], authorElement);
    }

    cite.appendChild(authorElement);

    // Add role if provided
    if (authorRole) {
      const roleElement = document.createElement('span');
      roleElement.className = 'quote-role';
      roleElement.textContent = authorRole;

      // Move instrumentation for role
      if (rows[2]) {
        moveInstrumentation(rows[2], roleElement);
      }

      cite.appendChild(roleElement);
    }

    quoteContainer.appendChild(cite);
  }

  // Clear the block and add new structure
  block.textContent = '';
  block.appendChild(quoteContainer);
}
