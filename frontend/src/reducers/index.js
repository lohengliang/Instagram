import { combineReducers } from "redux";
import imageUrlsByUser from "./imageURLsByUser";
import selectedImageFile from "./selectedImageFile";
import signedInUsername from "./signedInUsername";

export default combineReducers({
  imageUrlsByUser,
  selectedImageFile,
  signedInUsername
});
