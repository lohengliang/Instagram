import { CLEAR_IMAGE, SELECT_IMAGE } from "../actions";

// selectedImageFile is the image file that the user selected to upload
const initialState = {
  selectedImageFile: []
};

const selectedImageFile = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_IMAGE:
      return {
        ...state,
        selectedImageFile: action.selectedImageFile
      };
    case CLEAR_IMAGE:
      return {
        selectedImageFile: []
      };
    default:
      return state;
  }
};

export default selectedImageFile;
