import axios from 'axios';

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const BASE_URL = 'https://api.pexels.com/v1/search';

export const getPhotoForPlace = async (query) => {
  if (!API_KEY) {
    console.error("Pexels API key is missing.");
    return 'https://via.placeholder.com/800x600?text=Image+Not+Found'; // Fallback
  }

  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        query: query,
        per_page: 1,
      },
    });

    if (response.data.photos && response.data.photos.length > 0) {

      const originalUrl = response.data.photos[0].src.original;
       const customSizedUrl = `${originalUrl}?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop`;
      return customSizedUrl;
    }
    return 'https://via.placeholder.com/800x600?text=Image+Not+Found';

  } catch (error) {
    console.error("Error fetching photo from Pexels:", error);
    return 'https://via.placeholder.com/800x600?text=API+Error';
  }
};