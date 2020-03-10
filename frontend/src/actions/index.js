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
export function receiveImageURLs(imageURLs) {
  return {
    type: RECEIVE_IMAGE_URLS,
    imageURLs
  };
}

// Clear image urls when user logged out
export function clearImageURLs() {
  return {
    type: CLEAR_IMAGE_URLS
  };
}

// Fetch image urls that are linked to the logged in user
// Firebase security rules can tell the uid of the user that called the functions from the frontend, therefore
// fetchImageURLs function is implemented at the frontend and the security rules at the backend are configured
// to verify the uid during each function call
export function fetchImageURLs() {
  return dispatch => {
    if (firebase.auth().currentUser) {
      firebase
        .firestore()
        .collection("images")
        .where(
          "userId",
          "==",
          firebase.auth().currentUser ? firebase.auth().currentUser.uid : ""
        )
        .orderBy("timestamp", "desc")
        .onSnapshot(
          snapshot => {
            var imageUrls = [];
            snapshot.forEach(doc => {
              imageUrls.push(doc.data().imageUrl);
            });
            dispatch(receiveImageURLs(imageUrls));
          },
          err => {
            console.error(`Encountered error: ${err}`);
          }
        );
    }
  };
}

// Upload image to Firebase Storage and write the image url to Cloud Firestore
// Firebase security rules can tell the uid of the user that called the functions from the frontend, therefore
// uploadImage function is implemented at the frontend and the security rules at the backend are configured
// to verify the uid during each function call
export function uploadImage(imageFile) {
  return dispatch => {
    if (typeof imageFile.name == "string") {
      firebase
        .firestore()
        .collection("images")
        .add({
          userId: firebase.auth().currentUser.uid,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function(messageRef) {
          var filePath =
            "images/" +
            firebase.auth().currentUser.uid +
            "/" +
            messageRef.id +
            "/" +
            imageFile.name;
          return firebase
            .storage()
            .ref(filePath)
            .put(imageFile)
            .then(function(fileSnapshot) {
              return fileSnapshot.ref.getDownloadURL().then(url => {
                return messageRef
                  .update({
                    imageUrl: url,
                    storageUrl: fileSnapshot.metadata.fullPath
                  })
                  .then(function() {
                    dispatch(fetchImageURLs());
                  });
              });
            });
        })
        .catch(function(error) {
          console.error(
            "There was an error uploading a file to Cloud Storage:",
            error
          );
        });
      dispatch(fetchImageURLs());
      dispatch(clearImage());
    }
  };
}
