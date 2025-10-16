/* Teaser block JavaScript */

export default function decorate(block) {
  const ctaButton = block.querySelector('.button-container a.button');
  const image = block.querySelector('picture img');

  // Add zoom effect on CTA hover
  if (ctaButton && image) {
    ctaButton.addEventListener('mouseenter', () => {
      image.style.transform = 'scale(1.1)';
      image.style.transition = 'transform 0.3s ease-in-out';
    });

    ctaButton.addEventListener('mouseleave', () => {
      image.style.transform = 'scale(1)';
    });
  }

  // Add semantic CSS class
  block.classList.add('teaser-enhanced');

  // Handle terms and conditions
  const paragraphs = block.querySelectorAll('p');
  paragraphs.forEach((p) => {
    if (p.textContent.startsWith('Terms and conditions:')) {
      p.classList.add('terms-and-conditions');
    }
  });
}
