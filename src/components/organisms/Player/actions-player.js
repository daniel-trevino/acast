import moment from "moment";

export const getPosition = element => element.getBoundingClientRect().left;

export const clickPercent = event => {
  const timeline = document.getElementById("timeline");
  const playhead = document.getElementById("playhead");
  const timelineWidth = getTimelineWidth(timeline, playhead);
  return (event.clientX - getPosition(timeline)) / timelineWidth;
};

export const getTimelineWidth = (timeline, playhead) =>
  timeline.offsetWidth - playhead.offsetWidth;

export const secondsToTime = seconds =>
  moment.utc(seconds * 1000).format("mm:ss");
