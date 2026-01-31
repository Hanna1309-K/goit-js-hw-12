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

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
    e.preventDefault();

    query = e.target.elements['search-text'].value.trim();
    if (!query) return;

    page = 1;
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
        showLoadMoreButton();
    } catch {
        iziToast.error({ message: 'Error fetching images.' });
    } finally {
        hideLoader();
    }
});

loadMoreBtn.addEventListener('click', async () => {
    page += 1;
    showLoaderWithDelay();

    try {
        const data = await getImagesByQuery(query, page);
        createGallery(data.hits);

        const loadedImages = page * 15;
        if (loadedImages >= totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
            });
        }

        const cardHeight =
            document.querySelector('.image-wrapper').getBoundingClientRect().height;

        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });
    } finally {
        hideLoader();
    }
});
