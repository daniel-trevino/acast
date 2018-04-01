import { connect } from "react-redux";
import {
  fetchPodcasts,
  fetchPodcastsSuccess,
  fetchPodcastsFailure
} from "../../../actions/podcasts.js";
import App from "./App";

const mapStateToProps = state => {
  return {
    podcasts: state.podcasts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPodcasts: () => {
      dispatch(fetchPodcasts()).then(response => {
        !response.error
          ? dispatch(fetchPodcastsSuccess(response.payload.data))
          : dispatch(fetchPodcastsFailure(response.payload.data));
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
