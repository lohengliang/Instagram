import { CLEAR_IMAGE, SELECT_IMAGE } from "../actions";

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
