import { getImagesByQuery } from './js/pixabay-api';
import {
    createGallery,
    clearGallery,
    showLoaderWithDelay,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

const PER_PAGE = 15;

let query = '';
let page = 1;
let totalHits = 0;

/* ===== SEARCH ===== */
form.addEventListener('submit', async e => {
    e.preventDefault();

    query = e.target.elements['search-text'].value.trim();
    if (!query) return;

    page = 1;
    totalHits = 0;

    clearGallery();
    hideLoadMoreButton();
    showLoaderWithDelay();

    try {
        const data = await getImagesByQuery(query, page);
        totalHits = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.error({ message: 'Sorry, no images found.' });
            return;
        }

        createGallery(data.hits);

        if (data.hits.length < totalHits) {
            showLoadMoreButton();
        } else {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
            });
        }
    } catch {
        iziToast.error({ message: 'Error fetching images.' });
    } finally {
        hideLoader();
    }
});

/* ===== LOAD MORE ===== */
loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    hideLoadMoreButton();
    showLoaderWithDelay();

    try {
        const data = await getImagesByQuery(query, page);

        if (data.hits.length === 0) {
            return;
        }

        createGallery(data.hits);

        const loadedImages = page * PER_PAGE;

        if (loadedImages < totalHits) {
            showLoadMoreButton();
        } else {
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
            });
        }

        const firstCard = document.querySelector('.image-wrapper');
        if (firstCard) {
            const { height } = firstCard.getBoundingClientRect();
            window.scrollBy({
                top: height * 2,
                behavior: 'smooth',
            });
        }
    } catch {
        iziToast.error({ message: 'Error fetching images.' });
    } finally {
        hideLoader();
    }
});
