// @flow
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { currentMarker } from "../../../actions/podcasts.js";
import Player from "./Player";

const mapStateToProps = (state: Object): Object => {
  return {
    storeMarker: state.podcasts.currentMarker,
    podcasts: state.podcasts
  };
};

const mapDispatchToProps = (dispatch: Function): Function =>
  bindActionCreators({ currentMarker }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);
