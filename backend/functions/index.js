const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp();

exports.updateImageUrl = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }
  const imageUrl = data.imageUrl;
  const documentRef = await admin
    .firestore()
    .collection("images")
    .add({
      userId: context.auth.uid,
      timestamp: Date.now(),
      imageUrl
    });
});
