import React, { Component } from "react";
import "./App.css";
import storage from "./storage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  onClickHandler = () => {
    var storageRef = storage.ref();
    storageRef
      .child("images/" + this.state.selectedFile.name)
      .put(this.state.selectedFile)
      .then(function(snapshot) {
        alert("Uploaded a file!");
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form method="post" action="#" id="#">
              <div className="form-group files">
                <label>Upload Your File </label>
                <input
                  type="file"
                  name="file"
                  onChange={this.onChangeHandler}
                />
              </div>
            </form>
            <button
              type="button"
              className="btn btn-success btn-block"
              onClick={this.onClickHandler}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
