const shots = [...document.querySelectorAll('.gallery img')];

const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('.lightbox__img');
const lbCaption = lightbox.querySelector('.lightbox__caption');
const btnClose = lightbox.querySelector('.lightbox__close');
const btnPrev = lightbox.querySelector('.lightbox__nav--prev');
const btnNext = lightbox.querySelector('.lightbox__nav--next');
const backdrop = lightbox.querySelector('.lightbox__backdrop');

let index = 0;

function openLightbox(i) {
  index = i;
  const img = shots[index];
  lbImg.src = img.src;
  lbImg.alt = img.alt || '';
  const caption = img.closest('figure')?.querySelector('.cap__meta');
  lbCaption.textContent = caption ? caption.textContent : '';
  lightbox.classList.add('is-open');
  document.body.classList.add('no-scroll');
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
  lbImg.src = '';
}

function showNext() {
  index = (index + 1) % shots.length;
  openLightbox(index);
}

function showPrev() {
  index = (index - 1 + shots.length) % shots.length;
  openLightbox(index);
}

shots.forEach((img, i) => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => openLightbox(i));
});

btnClose.addEventListener('click', closeLightbox);
backdrop.addEventListener('click', closeLightbox);
btnNext.addEventListener('click', showNext);
btnPrev.addEventListener('click', showPrev);

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});
