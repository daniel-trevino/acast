import React, { Component } from "react";

export default class AdWrapper extends Component {
  render() {
    switch (this.props.type) {
      case "ad":
        return (
          <a href={this.props.link} target="_blank">
            {this.props.content}
          </a>
        );
      case "image":
        return (
          <img
            src={process.env.REACT_APP_DEV_API_URL + this.props.content}
            alt="ad"
          />
        );
      default:
        return <p>{this.props.content}</p>;
    }
  }
}
