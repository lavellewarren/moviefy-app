import React, { Component } from "react";

class Movie extends Component {
  render() {
    return <div>{this.props.movie.title}</div>;
  }
}

export default Movie;
