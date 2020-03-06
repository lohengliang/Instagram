import React from "react";
import { connect } from "react-redux";
import { clearImageURLs, selectImage, uploadImage } from "../actions";
import firebase from "../firebase";

const UploadImage = ({ signedInUsername, selectedImageFile, dispatch }) => {
  return (
    <div>
      {signedInUsername && (
        <div>
          {signedInUsername} is currently logged in.
          <button
            onClick={e => {
              e.preventDefault();
              firebase
                .auth()
                .signOut()
                .then(function() {
                  dispatch(clearImageURLs());
                });
            }}
          >
            Logout
          </button>
        </div>
      )}
      <br></br>
      {signedInUsername && (
        <form>
          <input
            type="file"
            name="file"
            id="uploadImageInput"
            onChange={e => {
              e.preventDefault();
              dispatch(selectImage(e.target.files[0]));
            }}
          />
          <button
            onClick={e => {
              e.preventDefault();
              if (selectedImageFile) {
                dispatch(uploadImage(selectedImageFile));
                document.getElementById("uploadImageInput").value = "";
              }
            }}
          >
            Upload Image
          </button>
        </form>
      )}
    </div>
  );
};

export default connect()(UploadImage);
