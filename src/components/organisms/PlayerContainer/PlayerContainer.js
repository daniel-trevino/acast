import React, { Component } from "react";
import Paper from "material-ui/Paper";
import Player from "../Player";
import AdWrapper from "../../molecules/AdWrapper";

export default class PlayerContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      active: {}
    };

    this.toggleActiveItem = this.toggleActiveItem.bind(this);
  }
  componentWillReceiveProps = nextProps => this.setState({ ...nextProps });
  componentDidMount() {
    this.props.fetchPodcasts();
  }
  toggleActiveItem(e, item) {
    e.preventDefault();
    this.props.selectPodcast(item);
    this.setState({ active: { [item.id]: true } });
  }
  render() {
    const { data } = this.state.podcasts;
    return (
      <div className="container">
        <div className="row">
          <Paper className="playerContainer" zDepth={4}>
            <div className="playerContainer__title">
              <h1>My podcasts</h1>
            </div>
            <div className="playerContainer__list">
              <div className="container">
                <div className="row">
                  {data
                    ? data.map(item => (
                        <div className="col-md-6 col-sm-12" key={item.id}>
                          <a
                            href="#click"
                            onClick={e => this.toggleActiveItem(e, item)}
                          >
                            <Paper
                              className={`playerContainer__item ${
                                this.state.active[item.id]
                                  ? "playerContainer__item--active"
                                  : ""
                              }`}
                            >
                              <h1>{item.name}</h1>
                              <p>By Podblaster</p>
                            </Paper>
                          </a>
                        </div>
                      ))
                    : false}
                </div>
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <Paper
                      className={`playerContainer__ad ${
                        this.state.storeMarker
                          ? "playerContainer__ad--active"
                          : ""
                      }`}
                    >
                      <AdWrapper {...this.state.storeMarker} />
                    </Paper>
                  </div>
                </div>
              </div>
            </div>
            <div className="playerContainer__player">
              <Player />
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
