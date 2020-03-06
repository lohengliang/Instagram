import { CLEAR_IMAGE_URLS, RECEIVE_IMAGE_URLS } from "../actions";

// Urls of image that the UI needs to render
const initialState = {
  imageURLs: []
};

const imageURLsByUser = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_IMAGE_URLS:
      return {
        ...state,
        imageURLs: action.imageURLs
      };
    case CLEAR_IMAGE_URLS:
      return {
        ...state,
        imageURLs: []
      };
    default:
      return state;
  }
};

export default imageURLsByUser;
