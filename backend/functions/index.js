const functions = require("firebase-functions");

const admin = require("firebase-admin");
var serviceAccount = require("./instagram-55ddc-41688cf9ff0f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://instagram-55ddc.firebaseio.com",
  storageBucket: "instagram-55ddc.appspot.com"
});

exports.fetchImageURLs = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }
  var imageUrls = await admin
    .firestore()
    .collection("images")
    .where("userId", "==", context.auth.uid)
    .get()
    .then(querySnapshot => {
      var imageUrls = [];
      querySnapshot.forEach(doc => {
        imageUrls.push(doc.data().imageUrl);
      });
      return imageUrls;
    })
    .catch(error => {
      console.log("Error getting documents: ", error);
    });
  return { imageUrls: imageUrls };
});

exports.updateImageURL = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }
  var imageURL = data.imageURL;
  var messageRef = await admin
    .firestore()
    .collection("images")
    .add({
      userId: context.auth.uid,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      imageUrl: imageURL
    });
  return { messageRef: messageRef };
});
