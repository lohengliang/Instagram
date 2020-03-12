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
    // eslint-disable-next-line promise/catch-or-return
    query.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
      return;
    });
    return;
  });

  describe("Test updateImageUrl function", () => {
    it("should update database with new image url", () => {
      const snap = {
        imageUrl: "www.imageurl.com",
        timestamp: Date.now(),
        userId: "userForTestingPurpose"
      };

      const wrapped = test.wrap(myFunctions.updateImageUrl);
      wrapped(snap, {
        auth: {
          uid: "userForTestingPurpose"
        }
      });
      return (
        admin
          .firestore()
          .collection("images")
          .get()
          // eslint-disable-next-line promise/always-return
          .then(dataSnapshot => {
            var dataEqual = false;
            const check = dataSnapshot.forEach(doc => {
              if (
                doc.data().imageUrl === snap.imageUrl &&
                doc.data().userId === snap.userId
              ) {
                dataEqual = true;
              }
            });
            if (dataEqual) {
              return assert.equal(true, true);
            } else {
              return assert.equal("Not found", true);
            }
          })
      );
    });
  });
});
