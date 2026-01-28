import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54320927-5ca4d41cc3ecb718a2e32b522';

export async function getImagesByQuery(query, page) {
    const response = await axios.get(BASE_URL, {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page,
            per_page: 15,
        },
    });

    return response.data;
}
