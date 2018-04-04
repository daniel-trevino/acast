import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { currentMarker } from "../../../actions/podcasts.js";
import Player from "./Player";

const mapStateToProps = state => {
  return {
    storeMarker: state.podcasts.currentMarker,
    podcasts: state.podcasts
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ currentMarker }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Player);
