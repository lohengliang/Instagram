import PropTypes from "prop-types";
import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default class ImagePosts extends Component {
  render() {
    return (
      <Container>
        <Row>
          {this.props.imageURLs.map((imageURL, i) => (
            <Col md="4" key={i}>
              <Card>
                <Card.Img key={i} src={imageURL} alt="" />
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
ImagePosts.propTypes = {
  imageURLs: PropTypes.array.isRequired
};
