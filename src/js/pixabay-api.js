import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "52557115-ad1d170ba64bf9f0fce8182bd";

export async function getImagesByQuery(query, per_page = 40) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page,
  };

  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}
