import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector(".gallery");

const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      (img) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${img.largeImageURL}">
          <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b> ${img.likes}</p>
          <p class="info-item"><b>Views</b> ${img.views}</p>
          <p class="info-item"><b>Comments</b> ${img.comments}</p>
          <p class="info-item"><b>Downloads</b> ${img.downloads}</p>
        </div>
      </li>`
    )
    .join("");
  galleryEl.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}
export function clearGallery() {
  galleryEl.innerHTML = "";
}
const loaderEl = document.getElementById("loader");

export function showLoader() {
  if (loaderEl) {
    loaderEl.classList.remove("hidden");
    loaderEl.classList.add("visible");
  }
}

export function hideLoader() {
  if (loaderEl) {
    loaderEl.classList.remove("visible");
    loaderEl.classList.add("hidden");
  }
}
