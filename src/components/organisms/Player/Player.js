import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import FloatingActionButton from "material-ui/FloatingActionButton";
import PlayArrowIcon from "material-ui/svg-icons/av/play-arrow";
import ReplayIcon from "material-ui/svg-icons/av/replay-5";
import ForwardIcon from "material-ui/svg-icons/av/forward-5";
import PauseIcon from "material-ui/svg-icons/av/pause";
import {
  getPosition,
  clickPercent,
  getTimelineWidth,
  secondsToTime
} from "./actions-player";

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props,
      duration: "0",
      currentTime: "0",
      onPlayHead: false,
      timeline: null,
      paused: true,
      playhead: null,
      playheadStyle: {
        marginLeft: "0%"
      }
    };

    this.play = this.play.bind(this);
    this.timeUpdate = this.timeUpdate.bind(this);
    this.setMusicDuration = this.setMusicDuration.bind(this);
    this.reply = this.reply.bind(this);
    this.forward = this.forward.bind(this);
    this.restart = this.restart.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.movePlayHead = this.movePlayHead.bind(this);
  }
  componentDidMount() {
    const music = this.rap.audioEl;
    const playhead = document.getElementById("playhead");

    const timeline = document.getElementById("timeline");
    music.addEventListener("timeupdate", this.timeUpdate, false);
    music.addEventListener("canplaythrough", this.setMusicDuration, false);
    timeline.addEventListener(
      "click",
      event => {
        const { duration } = this.state;
        this.movePlayHead(event);
        music.currentTime = duration * clickPercent(event);
      },
      false
    );

    // Make it draggable
    playhead.addEventListener("mousedown", this.mouseDown, false);
    window.addEventListener("mouseup", this.mouseUp, false);

    this.setState({
      timeline,
      playhead
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps });
  }
  setMusicDuration() {
    const music = this.rap.audioEl;
    this.setState({ duration: music.duration });
  }
  timeUpdate() {
    const music = this.rap.audioEl;
    const { duration } = this.state;
    // Multiplying to 98 since the playhead size should be taken in consideration
    const playPercent = 98 * (music.currentTime / duration);

    this.setState({
      playheadStyle: {
        marginLeft: `${playPercent}%`
      },
      currentTime: music.currentTime
    });
  }
  mouseDown() {
    const music = this.rap.audioEl;
    this.setState({ onPlayHead: true });
    window.addEventListener("mousemove", this.movePlayHead, true);
    music.removeEventListener("timeupdate", this.timeUpdate, false);
  }
  mouseUp(event) {
    const music = this.rap.audioEl;
    const { onPlayHead, duration } = this.state;
    if (onPlayHead) {
      this.movePlayHead(event);
      window.removeEventListener("mousemove", this.movePlayHead, true);
      // change current time
      music.currentTime = duration * clickPercent(event);
      music.addEventListener("timeupdate", this.timeUpdate, false);
    }
    this.setState({ onPlayHead: false });
  }
  movePlayHead(event) {
    const { timeline, playhead, duration } = this.state;
    const timelineWidth = getTimelineWidth(timeline, playhead);
    const newMargLeft = event.clientX - getPosition(timeline);
    const newCurrentTime = duration * clickPercent(event);

    if (newMargLeft >= 0 && newMargLeft <= timelineWidth) {
      playhead.style.marginLeft = newMargLeft + "px";
    }
    if (newMargLeft < 0) {
      playhead.style.marginLeft = "0px";
    }
    if (newMargLeft > timelineWidth) {
      playhead.style.marginLeft = timelineWidth + "px";
    }

    this.setState({
      currentTime: newCurrentTime > duration ? duration : newCurrentTime
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
      playhead: {
        marginLeft: "0%"
      }
    });
  }
  render() {
    return (
      <div className="player">
        <div className="container-fluid">
          <div className="row flex-center">
            <div className="player__replayIcon">
              <FloatingActionButton mini secondary onClick={this.reply}>
                <ReplayIcon />
              </FloatingActionButton>
            </div>
            <div className="player__playIcon">
              <FloatingActionButton secondary onClick={this.play}>
                {this.state.paused ? <PlayArrowIcon /> : <PauseIcon />}
              </FloatingActionButton>
            </div>
            <div className="player__forwardIcon">
              <FloatingActionButton mini secondary onClick={this.forward}>
                <ForwardIcon />
              </FloatingActionButton>
            </div>
            <div className="col-md-8 flex-center">
              <div className="player__timeline" id="timeline">
                <div
                  className="player__playhead"
                  id="playhead"
                  style={this.state.playheadStyle}
                />
              </div>
            </div>
            <div className="col-md-2 flex-center">
              <div className="player__duration">
                <p>
                  {secondsToTime(this.state.currentTime)}/{secondsToTime(
                    this.state.duration
                  )}
                </p>
              </div>
            </div>
            <ReactAudioPlayer
              src="https://acast.tredan.se/audio/short.mp3"
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
