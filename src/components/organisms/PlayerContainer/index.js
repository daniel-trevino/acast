import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchPodcasts,
  fetchPodcastsSuccess,
  fetchPodcastsFailure,
  selectPodcast
} from "../../../actions/podcasts.js";
import PlayerContainer from "./PlayerContainer";

const mapStateToProps = state => {
  return {
    storeMarker: state.podcasts.currentMarker,
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
    },
    selectPodcast: bindActionCreators(selectPodcast, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);
