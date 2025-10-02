import { getImagesByQuery } from "./js/pixabay-api";
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import xOctagonIcon from "./img/bi_x-octagon.svg";

const form = document.querySelector(".form");
const input = form.elements["search-text"];
const PER_PAGE = 40;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search query",
      position: "topRight",
    });
    return;
  }
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query, PER_PAGE);
    if (!data || !Array.isArray(data.hits) || data.hits.length === 0) {
      iziToast.error({
        theme: "dark",
        color: "#ef4040",
        message:
          "Sorry, there are no images matching your search query. Please try again!",
        messageColor: "#fafafb",
        messageSize: "16px",
        messageLineHeight: 24,
        iconUrl: xOctagonIcon,
        maxWidth: 432,
        position: "topRight",
      });
      hideLoader();
      return;
    }
    createGallery(data.hits);
  } finally {
    hideLoader();
  }
});
