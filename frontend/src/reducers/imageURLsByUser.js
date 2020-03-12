import { CLEAR_IMAGE_URLS, RECEIVE_IMAGE_URLS } from "../actions";

// Urls of image that the UI needs to render
const initialState = {
  imageUrls: []
};

const imageUrlsByUser = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_IMAGE_URLS:
      return {
        ...state,
        imageUrls: action.imageUrls
      };
    case CLEAR_IMAGE_URLS:
      return {
        ...state,
        imageUrls: []
      };
    default:
      return state;
  }
};

export default imageUrlsByUser;
