import Button from "@material-ui/core/Button";
import React from "react";
import { connect } from "react-redux";
import { clearImageUrls, selectImage, uploadImage } from "../actions";
import firebase from "../firebase";

// Container that holds the login message, logout button, choose file button and upload image button
const UploadImage = ({ signedInUsername, selectedImageFile, dispatch }) => {
  return (
    <div>
      {signedInUsername && (
        <div>
          <label htmlFor="contained-button-file" style={{ float: "right" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={e => {
                e.preventDefault();
                firebase
                  .auth()
                  .signOut()
                  .then(function() {
                    dispatch(clearImageUrls());
                  });
              }}
            >
              Logout
            </Button>
          </label>
          <span
            style={{
              float: "right",
              marginRight: "20px",
              marginBottom: "20px"
            }}
          >
            {signedInUsername} is currently logged in.
          </span>
        </div>
      )}
      <br></br>
      {signedInUsername && (
        <div style={{ paddingBottom: "60px" }}>
          <form
            style={{
              marginTop: "30px"
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={e => {
                e.preventDefault();
                if (selectedImageFile) {
                  dispatch(uploadImage(selectedImageFile));
                  document.getElementById("uploadImageInput").value = "";
                }
              }}
              style={{ float: "right" }}
            >
              Upload Image
            </Button>
            <input
              type="file"
              name="file"
              id="uploadImageInput"
              style={{ display: "none" }}
              onChange={e => {
                e.preventDefault();
                dispatch(selectImage(e.target.files[0]));
              }}
            />
            <label
              htmlFor="uploadImageInput"
              style={{ float: "right", paddingRight: "15px" }}
            >
              <Button variant="contained" color="primary" component="span">
                Choose File
              </Button>
            </label>
            <label style={{ float: "right", paddingRight: "15px" }}>
              {selectedImageFile.name || "No file selected"}
            </label>
          </form>
          <label style={{ float: "left" }}></label>
        </div>
      )}
    </div>
  );
};

export default connect()(UploadImage);
