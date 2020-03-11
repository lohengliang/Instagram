import fetch from "cross-fetch";
import { connect } from "react-redux";
import "regenerator-runtime/runtime";
import { selectImage, SELECT_IMAGE, uploadImage } from "../actions";

const testWrapper = ({ dispatch }) => {
  test("select image", async () => {
    var selectedImageFile = await fetch("http://localhost:3000/logo192.png")
      .then(function(response) {
        return response.arrayBuffer();
      })
      .then(imageBuffer => {
        const file = new File([imageBuffer], "logo192.png", {
          type: "image/png"
        });
        return file;
      })
      .catch(function(error) {
        console.error(error);
      });
    dispatch(uploadImage(selectedImageFile));
  });
};
connect()(testWrapper);

test("compare images", async () => {
  var logo512PngResult = await fetch("http://localhost:3000/logo512.png")
    .then(function(response) {
      return response.blob();
    })
    .catch(function(error) {
      console.error(error);
    });
  var logo192PngResult = await fetch("http://localhost:3000/logo192.png")
    .then(function(response) {
      return response.blob();
    })
    .catch(function(error) {
      console.error(error);
    });
  return expect(logo512PngResult).toEqual(logo192PngResult);
});

test("compare images", async () => {
  const file = new File([""], "test.png", {
    type: "image/png"
  });
  const expectedAction = {
    type: SELECT_IMAGE,
    selectedImageFile: file
  };
  expect(selectImage(file)).toEqual(expectedAction);
});
