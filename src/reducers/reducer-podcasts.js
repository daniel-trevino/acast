import {
  FETCH_PODCASTS,
  FETCH_PODCASTS_SUCCESS,
  FETCH_PODCASTS_FAILURE
} from "../actions/podcasts";

const INITIAL_STATE = {
  data: [],
  error: null,
  loading: false
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
    default:
      return state;
  }
}
