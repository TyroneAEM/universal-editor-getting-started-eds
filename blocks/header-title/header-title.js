import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const row = block.children[0];
  if (!row) return;

  const cell = row.querySelector('div') || row;
  const text = cell.textContent.trim();

  const container = document.createElement('div');
  container.className = 'header-title-container';
  moveInstrumentation(row, container);

  const h1 = document.createElement('h1');
  h1.className = 'header-title-text';
  h1.textContent = text;
  container.appendChild(h1);

  block.textContent = '';
  block.appendChild(container);
}
