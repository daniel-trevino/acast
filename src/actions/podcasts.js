import axios from "axios";

export const FETCH_PODCASTS = "FETCH_PODCASTS";
export const FETCH_PODCASTS_SUCCESS = "FETCH_PODCASTS_SUCCESS";
export const FETCH_PODCASTS_FAILURE = "FETCH_PODCASTS_FAILURE";
export const SELECT_PODCAST = "SELECT_PODCAST";
export const CURRENT_MARKER = "CURRENT_MARKER";

export const fetchPodcasts = result => {
  const request = axios.get(`${process.env.REACT_APP_DEV_API_URL}/episodes`);

  return {
    type: FETCH_PODCASTS,
    payload: request
  };
};

export function fetchPodcastsSuccess(response) {
  return {
    type: FETCH_PODCASTS_SUCCESS,
    payload: response
  };
}

export function fetchPodcastsFailure(error) {
  return {
    type: FETCH_PODCASTS_FAILURE,
    payload: error
  };
}

export const selectPodcast = podcast => {
  return {
    type: SELECT_PODCAST,
    payload: podcast
  };
};

export const currentMarker = marker => {
  return {
    type: CURRENT_MARKER,
    payload: marker
  };
};
