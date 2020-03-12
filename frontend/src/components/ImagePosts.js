import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import React, { Component } from "react";

export default class ImagePosts extends Component {
  render() {
    return (
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          {this.props.imageUrls.map((imageUrl, i) => (
            <Grid item xs={3} key={i}>
              <Card>
                <CardMedia
                  image={imageUrl}
                  style={{ height: "240px", backgroundSize: "contain" }}
                />
                <CardActions style={{ float: "right", height: "40px" }}>
                  <IconButton>
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
  imageUrls: PropTypes.array.isRequired
};
