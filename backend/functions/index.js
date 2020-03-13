/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp();

// Add image url to the database
exports.addImageUrl = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }
  const imageUrl = data.imageUrl;
  const filePath = data.filePath;
  return await admin
    .firestore()
    .collection("images")
    .add({
      userId: context.auth.uid,
      timestamp: Date.now(),
      imageUrl,
      filePath
    })
    .then(documentRef => {
      return documentRef;
    });
});

// Delete image url from the database
exports.deleteImageUrl = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }
  const filePath = data.filePath;
  const query = admin
    .firestore()
    .collection("images")
    .where("filePath", "==", filePath);
  return await query
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    })
    .then(() => {
      return;
    });
});
