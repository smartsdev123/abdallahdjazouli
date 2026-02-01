(() => {
  const shots = Array.from(document.querySelectorAll('.gallery .shot img'));
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCap = document.getElementById('lightboxCaption');

  if (!shots.length || !lb || !lbImg) return;

  let index = -1;

  function openAt(i) {
    index = i;
    const img = shots[index];
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || 'Photo';

    const fig = img.closest('figure');
    const cap = fig ? fig.querySelector('figcaption') : null;
    lbCap.textContent = cap ? cap.innerText.replace(/\s+/g,' ').trim() : '';

    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  function close() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    lbImg.src = '';
  }

  function prev() { openAt((index - 1 + shots.length) % shots.length); }
  function next() { openAt((index + 1) % shots.length); }

  shots.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openAt(i);
    });
  });

  lb.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close')) close();
  });

  lb.querySelector('[data-prev]').addEventListener('click', (e) => { e.stopPropagation(); prev(); });
  lb.querySelector('[data-next]').addEventListener('click', (e) => { e.stopPropagation(); next(); });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });
})();
