import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const PER_PAGE = 40;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query, PER_PAGE);
    if (!data || !Array.isArray(data.hits) || data.hits.length === 0) {
      iziToast.info({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      hideLoader();
      return;
    }
    createGallery(data.hits);

    iziToast.success({
      title: 'Success',
      message: `Found ${data.totalHits} images. Showing ${data.hits.length}.`,
      position: 'topRight',
      timeout: 2000,
    });
  } catch (error) {
    console.error(error);
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong while fetching images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
