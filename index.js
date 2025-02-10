const cardsContainer = document.querySelector('.cards');
const cards = Array.from(document.querySelectorAll('.card'));
const overlay = document.querySelector('.overlay');

const applyOverlayMask = (e) => {
  const x = e.pageX - cardsContainer.offsetLeft;
  const y = e.pageY - cardsContainer.offsetTop;

  overlay.style.setProperty('--opacity', '1');
  overlay.style.setProperty('--x', `${x}px`);
  overlay.style.setProperty('--y', `${y}px`);
};

const createOverlayCta = (overlayCard, ctaElement) => {
  const overlayCta = document.createElement('div');
  overlayCta.classList.add('cta');
  overlayCta.textContent = ctaElement.textContent;
  overlayCta.setAttribute('aria-hidden', true);
  overlayCard.append(overlayCta);
};

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let borderBoxSize = Array.isArray(entry.borderBoxSize) ? entry.borderBoxSize[0] : entry.borderBoxSize;
    let width = borderBoxSize.inlineSize;
    let height = borderBoxSize.blockSize;

    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
    }
  });
});

const initOverlayCard = (cardElement) => {
  const overlayCard = document.createElement('div');
  overlayCard.classList.add('card');
  createOverlayCta(overlayCard, cardElement.lastElementChild);
  overlay.append(overlayCard);
  observer.observe(cardElement);
};

cards.forEach((card) => initOverlayCard(card));
document.body.addEventListener('pointermove', applyOverlayMask);
