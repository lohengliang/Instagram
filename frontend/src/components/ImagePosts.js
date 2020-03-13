import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteImage } from "../actions";

// Component that display the images in grid format
class ImagePosts extends Component {
  render() {
    return (
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          {this.props.imageUrls.map((imageUrl, i) => (
            <Grid item xs={3} key={i}>
              <Card>
                <CardMedia
                  image={imageUrl[0]}
                  style={{ height: "240px", backgroundSize: "contain" }}
                />
                <CardActions style={{ float: "right", height: "40px" }}>
                  <IconButton
                    onClick={e => this.props.dispatch(deleteImage(imageUrl[1]))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
}

ImagePosts.propTypes = {
  imageUrls: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(ImagePosts);
