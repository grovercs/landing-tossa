import GLightbox from 'glightbox';

const hasLightbox = document.querySelector('.glightbox');
if (hasLightbox) {
  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
  });
}
