import firebase from "../firebase";

export const GET_SIGNED_IN_USERNAME = "GET_SIGNED_IN_USERNAME";
export const SELECT_IMAGE = "SELECT_IMAGE";
export const CLEAR_IMAGE = "CLEAR_IMAGE";
export const RECEIVE_IMAGE_URLS = "RECEIVE_IMAGE_URLS";
export const CLEAR_IMAGE_URLS = "CLEAR_IMAGE_URLS";

// Get signed in username, which is used to display a "{username} is logged in." message
export function getSignedInUsername(signedInUsername) {
  return {
    type: GET_SIGNED_IN_USERNAME,
    signedInUsername
  };
}

// Get image file that user selected to upload
export function selectImage(selectedImageFile) {
  return {
    type: SELECT_IMAGE,
    selectedImageFile
  };
}

// Get image file that user selected to upload
export function clearImage() {
  return {
    type: CLEAR_IMAGE
  };
}

// Update state with image urls received from Cloud Firestore
export function receiveImageUrls(imageUrls) {
  return {
    type: RECEIVE_IMAGE_URLS,
    imageUrls
  };
}

// Clear image urls when user logged out
export function clearImageUrls() {
  return {
    type: CLEAR_IMAGE_URLS
  };
}

/* Fetch image urls that are linked to the logged in user
Used Firebase function to retrieve image urls as it has a real time update feature through the onSnapshot function. */
export function fetchImageUrls() {
  return dispatch => {
    if (firebase.auth().currentUser) {
      const unsubscribe = firebase
        .firestore()
        .collection("images")
        .where(
          "userId",
          "==",
          firebase.auth().currentUser ? firebase.auth().currentUser.uid : ""
        )
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot => {
          if (!firebase.auth().currentUser) {
            unsubscribe();
          }
          let imageUrls = [];
          snapshot.forEach(doc => {
            imageUrls.push([doc.data().imageUrl, doc.data().filePath]);
          });
          dispatch(receiveImageUrls(imageUrls));
        });
    }
  };
}

/* Upload image to Firebase Storage and write the image url to Cloud Firestore
Used Firebase Storage function in order to get the download url of the image. */
export function uploadImage(imageFile) {
  return async dispatch => {
    if (typeof imageFile.name == "string") {
      const filePath =
        "images/" +
        firebase.auth().currentUser.uid +
        "/" +
        Date.now() +
        "/" +
        imageFile.name;
      const imageUrl = await firebase
        .storage()
        .ref(filePath)
        .put(imageFile)
        .then(function(fileSnapshot) {
          return fileSnapshot.ref.getDownloadURL().then(Url => {
            return Url;
          });
        });
      const addImageUrlToFirebase = firebase
        .functions()
        .httpsCallable("addImageUrl");
      addImageUrlToFirebase({ imageUrl: imageUrl, filePath: filePath });
      dispatch(clearImage());
    }
  };
}

// Delete the image from Firebase Storage as well as delete the related document from Firestore
export function deleteImage(imageFilePath) {
  return dispatch => {
    firebase
      .storage()
      .ref(imageFilePath)
      .delete();
    const deleteImageUrlFromFirebase = firebase
      .functions()
      .httpsCallable("deleteImageUrl");
    deleteImageUrlFromFirebase({ filePath: imageFilePath });
    dispatch(clearImage());
  };
}
