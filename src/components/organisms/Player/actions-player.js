import moment from "moment";

export const secondsToTime = seconds =>
  moment.utc(seconds * 1000).format("mm:ss");

export const getPercentOfDuration = (currentTime, duration) =>
  100 * (currentTime / duration);

export const generatePodcastSrc = podcast =>
  process.env.REACT_APP_DEV_API_URL + podcast.audio;
