// ===== Lightbox script =====

const shots = Array.from(document.querySelectorAll('.shot img'));

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox__img');
const lightboxCaption = lightbox.querySelector('.lightbox__caption');
const btnClose = lightbox.querySelector('.lightbox__close');
const btnPrev = lightbox.querySelector('.lightbox__nav--prev');
const btnNext = lightbox.querySelector('.lightbox__nav--next');
const backdrop = lightbox.querySelector('.lightbox__backdrop');

let currentIndex = 0;

// ouvrir la lightbox
function openLightbox(index) {
  currentIndex = index;

  lightboxImg.src = shots[index].src;
  lightboxImg.alt = shots[index].alt || '';

  const fig = shots[index].closest('figure');
  const cap = fig ? fig.querySelector('figcaption') : null;
  lightboxCaption.textContent = cap ? cap.innerText : '';

  lightbox.classList.add('is-open');
  document.body.classList.add('no-scroll');
}

// fermer
function closeLightbox() {
  lightbox.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  lightboxImg.src = '';
}

// image précédente
function prevImage() {
  currentIndex = (currentIndex - 1 + shots.length) % shots.length;
  openLightbox(currentIndex);
}

// image suivante
function nextImage() {
  currentIndex = (currentIndex + 1) % shots.length;
  openLightbox(currentIndex);
}

// clic sur une image
shots.forEach((img, index) => {
  img.addEventListener('click', (e) => {
    e.preventDefault();
    openLightbox(index);
  });
});

// boutons
btnClose.addEventListener('click', closeLightbox);
backdrop.addEventListener('click', closeLightbox);
btnPrev.addEventListener('click', prevImage);
btnNext.addEventListener('click', nextImage);

// clavier
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('is-open')) return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
});
