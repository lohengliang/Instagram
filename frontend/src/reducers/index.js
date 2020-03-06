import { combineReducers } from "redux";
import imageURLsByUser from "./imageURLsByUser";
import selectedImageFile from "./selectedImageFile";
import signedInUsername from "./signedInUsername";

export default combineReducers({
  imageURLsByUser,
  selectedImageFile,
  signedInUsername
});
