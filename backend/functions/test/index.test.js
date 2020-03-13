/* eslint-disable promise/always-return */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
const chai = require("chai");
const assert = chai.assert;

const sinon = require("sinon");

const admin = require("firebase-admin");

const test = require("firebase-functions-test")(
  {
    databaseURL: "https://instagram-55ddc.firebaseio.com",
    storageBucket: "instagram-55ddc.appspot.com",
    projectId: "instagram-55ddc"
  },
  "./instagram-55ddc-4fc7539af546.json"
);

describe("Test cloud function", () => {
  let myFunctions;

  before(() => {
    myFunctions = require("../index");
  });

  after(() => {
    // Do cleanup tasks.
    test.cleanup();
    // Reset the database.
    const query = admin
      .firestore()
      .collection("images")
      .where("userId", "==", "userForTestingPurpose");
    query.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
    const query2 = admin
      .firestore()
      .collection("images")
      .where("userId", "==", "userForTestingPurpose2");
    query2.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
  });

  describe("Test addImageUrl function", () => {
    it("should add image url into the database", () => {
      // Sample data
      const snap = {
        imageUrl: "www.imageurl.com",
        timestamp: Date.now(),
        userId: "userForTestingPurpose",
        filePath: "images/testFilePath"
      };

      /* Query Firestore for sample data. If there is data that matches the sample data, it means the 
      function addImageUrl is working. */
      const wrapped = test.wrap(myFunctions.addImageUrl);
      wrapped(snap, {
        auth: {
          uid: "userForTestingPurpose"
        }
      }).then(() => {
        return admin
          .firestore()
          .collection("images")
          .where("userId", "==", "userForTestingPurpose")
          .get()
          .then(dataSnapshot => {
            if (dataSnapshot.empty) {
              return assert.equal("Data Not Found", true);
            }
            return assert.equal(true, true);
          });
      });
    });
  });

  describe("Test deleteImageUrl function", () => {
    it("should delete image url from the database", () => {
      // Sample data
      const snap = {
        imageUrl: "www.imageurl2.com",
        timestamp: Date.now(),
        userId: "userForTestingPurpose2",
        filePath: "images/testFilePath2"
      };

      let dataFoundBeforeDelete = false;
      const documentRef = admin
        .firestore()
        .collection("images")
        .add(snap)
        .then(documentRef => {
          return documentRef;
        });

      const wrapped = test.wrap(myFunctions.deleteImageUrl);
      wrapped(snap, {
        auth: {
          uid: "userForTestingPurpose2"
        }
      }).then(() => {
        return admin
          .firestore()
          .collection("images")
          .where("userId", "==", "userForTestingPurpose2")
          .get()
          .then(dataSnapshot => {
            if (dataSnapshot.empty) {
              return assert.equal(true, true);
            }
            return assert.equal("Data Not Deleted", true);
          });
      });
    });
  });
});
