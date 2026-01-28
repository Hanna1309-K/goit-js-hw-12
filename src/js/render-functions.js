import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images
        .map(
            img => `
      <li class="image-wrapper">
        <a href="${img.largeImageURL}">
          <img src="${img.webformatURL}" alt="${img.tags}" />
        </a>
        <div class="stats-panel">
          <div><b>Likes</b><span>${img.likes}</span></div>
          <div><b>Views</b><span>${img.views}</span></div>
          <div><b>Comments</b><span>${img.comments}</span></div>
          <div><b>Downloads</b><span>${img.downloads}</span></div>
        </div>
      </li>
    `
        )
        .join('');

    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    gallery.innerHTML = '';
}

export function showLoader() {
    loader.classList.remove('hidden');
}

export function hideLoader() {
    loader.classList.add('hidden');
}

export function showLoadMoreButton() {
    loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
    loadMoreBtn.classList.add('hidden');
}
