import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Player from "../Player";

export default class PlayerContainer extends Component {
  componentDidMount() {
    this.props.fetchPodcasts();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <Paper className="playerContainer" zDepth={4}>
            <div className="playerContainer__title">
              <h1>My title</h1>
            </div>
            <div className="playerContainer__list" />
            <div className="playerContainer__player">
              <Player />
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
