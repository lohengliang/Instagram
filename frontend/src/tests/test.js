import fetch from "cross-fetch";
import "regenerator-runtime/runtime";
import { selectImage, SELECT_IMAGE } from "../actions";

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

describe("select image", () => {
  it("should create an action to select an image", () => {
    fetch("http://localhost:3000/logo192.png")
      .then(function(response) {
        return response.blob();
      })
      .then(imageBlob => {
        const file = new File([imageBlob], "logo192.png", {
          type: "image/png"
        });
        const expectedAction = {
          type: SELECT_IMAGE,
          selectedImageFile: file
        };
        expect(selectImage(file)).toEqual(expectedAction);
      })
      .catch(function(error) {
        console.error(error);
      });
  });
});
