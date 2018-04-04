// @flow
import moment from "moment";

export const secondsToTime = (seconds: number): string =>
  moment.utc(seconds * 1000).format("mm:ss");

export const getPercentOfDuration = (
  currentTime: number,
  duration: number
): number => 100 * (currentTime / duration);

export const generatePodcastSrc = (podcast: Object): string =>
  process.env.REACT_APP_DEV_API_URL + podcast.audio;
