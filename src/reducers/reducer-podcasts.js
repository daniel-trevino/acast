import {
  FETCH_PODCASTS,
  FETCH_PODCASTS_SUCCESS,
  FETCH_PODCASTS_FAILURE,
  SELECT_PODCAST,
  CURRENT_MARKER
} from "../actions/podcasts";

const INITIAL_STATE = {
  data: [],
  error: null,
  loading: false,
  selectedPodcast: null,
  currentMarker: null
};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case FETCH_PODCASTS:
      return { ...state, data: [], error: null, loading: true };
    case FETCH_PODCASTS_SUCCESS:
      return { ...state, data: action.payload, error: null, loading: false };
    case FETCH_PODCASTS_FAILURE:
      error = { message: "There was an error fetching the podcasts." }; // Network or server down errors
      return { ...state, data: [], error: error, loading: false };
    case SELECT_PODCAST:
      return { ...state, selectedPodcast: action.payload };
    case CURRENT_MARKER:
      return { ...state, currentMarker: action.payload };
    default:
      return state;
  }
}
