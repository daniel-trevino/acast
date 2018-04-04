import React, { Component } from "react";
import equal from "deep-equal";
import ReactAudioPlayer from "react-audio-player";
import FloatingActionButton from "material-ui/FloatingActionButton";
import PlayArrowIcon from "material-ui/svg-icons/av/play-arrow";
import ReplayIcon from "material-ui/svg-icons/av/replay-5";
import ForwardIcon from "material-ui/svg-icons/av/forward-5";
import PauseIcon from "material-ui/svg-icons/av/pause";
import Slider from "material-ui/Slider";
import {
  secondsToTime,
  getPercentOfDuration,
  generatePodcastSrc
} from "./actions-player";

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      duration: 0,
      currentTime: 0,
      currentTimeDuration: 0,
      paused: true
    };

    this.play = this.play.bind(this);
    this.timeUpdate = this.timeUpdate.bind(this);
    this.setMusicDuration = this.setMusicDuration.bind(this);
    this.reply = this.reply.bind(this);
    this.forward = this.forward.bind(this);
    this.restart = this.restart.bind(this);
    this.updateDuration = this.updateDuration.bind(this);
  }
  componentDidMount() {
    const music = this.rap.audioEl;
    music.addEventListener("timeupdate", this.timeUpdate, false);
    music.addEventListener("canplaythrough", this.setMusicDuration, false);
  }
  componentWillReceiveProps(nextProps) {
    if (
      !equal(
        this.props.podcasts.selectedPodcast,
        nextProps.podcasts.selectedPodcast
      )
    ) {
      this.restart();
    }
    this.setState({ ...nextProps });
  }
  setMusicDuration() {
    const music = this.rap.audioEl;
    this.setState({ duration: music.duration });
  }
  updateDuration(event, newValue) {
    const music = this.rap.audioEl;
    const { duration } = this.state;
    music.currentTime = duration * (newValue * 0.01);
  }
  timeUpdate() {
    const music = this.rap.audioEl;
    const { duration, podcasts, storeMarker } = this.state;
    const playPercent = getPercentOfDuration(music.currentTime, duration);

    let currentMarkerTemp = null;
    currentMarkerTemp = podcasts.selectedPodcast.markers.find(
      marker =>
        music.currentTime >= marker.start &&
        music.currentTime <= marker.start + marker.duration
    );

    if (!equal(currentMarkerTemp, storeMarker)) {
      this.props.currentMarker(currentMarkerTemp);
    }

    this.setState({
      currentTime: playPercent,
      currentTimeDuration: music.currentTime
    });
  }
  reply() {
    const music = this.rap.audioEl;
    music.currentTime = music.currentTime -= 5;
  }
  forward() {
    const music = this.rap.audioEl;
    music.currentTime = music.currentTime += 5;
  }
  play() {
    const music = this.rap.audioEl;

    music.paused
      ? this.setState({ paused: false }, () => music.play())
      : this.setState({ paused: true }, () => music.pause());
  }
  restart() {
    this.setState({
      paused: true,
      currentTime: 0,
      currentTimeDuration: 0
    });
  }
  render() {
    const { podcasts } = this.state;
    return (
      <div className="player">
        <div className="container-fluid">
          <div className="row flex-center">
            <div className="player__replayIcon">
              <FloatingActionButton
                mini
                secondary
                onClick={this.reply}
                disabled={podcasts.selectedPodcast ? false : true}
              >
                <ReplayIcon />
              </FloatingActionButton>
            </div>
            <div className="player__playIcon">
              <FloatingActionButton
                secondary
                onClick={this.play}
                disabled={podcasts.selectedPodcast ? false : true}
              >
                {this.state.paused ? <PlayArrowIcon /> : <PauseIcon />}
              </FloatingActionButton>
            </div>
            <div className="player__forwardIcon">
              <FloatingActionButton
                mini
                secondary
                onClick={this.forward}
                disabled={podcasts.selectedPodcast ? false : true}
              >
                <ForwardIcon />
              </FloatingActionButton>
            </div>
            <div className="col-md-8 flex-center">
              <Slider
                className="player__timeline"
                defaultValue={0}
                value={this.state.currentTime ? this.state.currentTime : 0}
                min={0}
                max={101}
                step={1}
                onChange={this.updateDuration}
                disabled={podcasts.selectedPodcast ? false : true}
              />
            </div>
            <div className="col-md-2 flex-center">
              <div className="player__duration">
                <p>
                  {secondsToTime(this.state.currentTimeDuration)}/{secondsToTime(
                    this.state.duration
                  )}
                </p>
              </div>
            </div>
            <ReactAudioPlayer
              src={
                podcasts.selectedPodcast
                  ? generatePodcastSrc(podcasts.selectedPodcast)
                  : ""
              }
              ref={element => {
                this.rap = element;
              }}
              onEnded={this.restart}
            />
          </div>
        </div>
      </div>
    );
  }
}
