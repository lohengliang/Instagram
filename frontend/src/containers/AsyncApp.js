import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  clearImage,
  clearImageURLs,
  fetchImageURLs,
  getSignedInUsername
} from "../actions";
import ImagePosts from "../components/ImagePosts";
import firebase from "../firebase";
import UploadImage from "./UploadImage";
var firebaseui = require("firebaseui");

// Use firebase ui to handle user login
var ui = new firebaseui.auth.AuthUI(firebase.auth());

class AsyncApp extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult) {
          // Get signed in username to display "{username} is logged in" message
          dispatch(getSignedInUsername(authResult.user.displayName));
          // Fetch image URLs
          dispatch(fetchImageURLs());
        }
      },
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE
    };
    if (localStorage.getItem("user")) {
      // If at componentDidMount stage, local storage has user information, display the images as if the user logged in
      dispatch(
        getSignedInUsername(
          JSON.parse(localStorage.getItem("user")).displayName
        )
      );
      dispatch(fetchImageURLs());
    } else {
      // If at componentDidMount stage, local storage has no user information, clear image urls at store and start
      // the Firebase login UI
      dispatch(clearImageURLs());
      dispatch(clearImage());
      ui.start("#firebaseui-auth-container", uiConfig);
    }
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // When user logged out, remove user information from local storage, clear username and image urls in the
        // store and load the Firebase login UI
        localStorage.removeItem("user");
        dispatch(getSignedInUsername(""));
        dispatch(clearImageURLs());
        dispatch(clearImage());
        ui.start("#firebaseui-auth-container", uiConfig);
      } else {
        // When user logged in, store user information at local storage so that user do not need to login again
        // even after page refresh, initialize the store with the username and image urls.
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(getSignedInUsername(user.displayName));
        dispatch(fetchImageURLs());
      }
    });
  }
  render() {
    const { signedInUsername, imageURLs, selectedImageFile } = this.props;
    return (
      <div style={{ margin: 20 }}>
        <div id="firebaseui-auth-container"></div>
        <UploadImage
          signedInUsername={signedInUsername}
          selectedImageFile={selectedImageFile}
        />
        <ImagePosts imageURLs={imageURLs} />
      </div>
    );
  }
}
AsyncApp.propTypes = {
  signedInUsername: PropTypes.string.isRequired,
  imageURLs: PropTypes.array.isRequired,
  selectedImageFile: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired
};
function mapStateToProps(state) {
  const signedInUsername = state.signedInUsername.signedInUsername;
  const imageURLs = state.imageURLsByUser.imageURLs;
  const selectedImageFile = state.selectedImageFile.selectedImageFile;
  return { signedInUsername, imageURLs, selectedImageFile };
}
export default connect(mapStateToProps)(AsyncApp);
