import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  clearImage,
  clearImageUrls,
  fetchImageUrls,
  getSignedInUsername
} from "../actions";
import ImagePosts from "../components/ImagePosts";
import firebase from "../firebase";
import UploadImage from "./UploadImage";
const firebaseui = require("firebaseui");

// Use firebase ui to handle user login
const ui = new firebaseui.auth.AuthUI(firebase.auth());

class AsyncApp extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult) {
          // Get signed in username to display "{username} is logged in" message
          dispatch(getSignedInUsername(authResult.user.displayName));
        }
      },
      signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE
    };
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        dispatch(getSignedInUsername(""));
        dispatch(clearImageUrls());
        dispatch(clearImage());
        ui.start("#firebaseui-auth-container", uiConfig);
      } else {
        dispatch(getSignedInUsername(user.displayName));
        dispatch(fetchImageUrls());
      }
    });
  }

  render() {
    const { signedInUsername, imageUrls, selectedImageFile } = this.props;
    return (
      <div style={{ margin: 20 }}>
        <div id="firebaseui-auth-container"></div>
        <UploadImage
          signedInUsername={signedInUsername}
          selectedImageFile={selectedImageFile}
        />
        <ImagePosts imageUrls={imageUrls} />
      </div>
    );
  }
}

AsyncApp.propTypes = {
  signedInUsername: PropTypes.string.isRequired,
  imageUrls: PropTypes.array.isRequired,
  selectedImageFile: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const signedInUsername = state.signedInUsername.signedInUsername;
  const imageUrls = state.imageUrlsByUser.imageUrls;
  const selectedImageFile = state.selectedImageFile.selectedImageFile;
  return { signedInUsername, imageUrls, selectedImageFile };
}

export default connect(mapStateToProps)(AsyncApp);
