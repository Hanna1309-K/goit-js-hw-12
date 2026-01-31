import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let loaderTimeoutId = null;

export function createGallery(images) {
  const markup = images
    .map(
      img => `
      <li class="image-wrapper">
        <a href="${img.largeImageURL}">
          <img src="${img.webformatURL}" alt="${img.tags}" />
        </a>

        <div class="stats-panel">
          <div class="stat">
            <span class="stat-title">Likes</span>
            <span class="stat-number">${img.likes}</span>
          </div>
          <div class="stat">
            <span class="stat-title">Views</span>
            <span class="stat-number">${img.views}</span>
          </div>
          <div class="stat">
            <span class="stat-title">Comments</span>
            <span class="stat-number">${img.comments}</span>
          </div>
          <div class="stat">
            <span class="stat-title">Downloads</span>
            <span class="stat-number">${img.downloads}</span>
          </div>
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

export function showLoaderWithDelay(delay = 400) {
  loaderTimeoutId = setTimeout(() => {
    loader.textContent = 'Loading images, please wait...';
    loader.classList.remove('hidden');
  }, delay);
}

export function hideLoader() {
  if (loaderTimeoutId) {
    clearTimeout(loaderTimeoutId);
    loaderTimeoutId = null;
  }
  loader.classList.add('hidden');
  loader.textContent = '';
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}
