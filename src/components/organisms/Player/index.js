import { connect } from "react-redux";
import Player from "./Player";

const mapStateToProps = state => {
  return {
    podcasts: state.podcasts
  };
};

export default connect(mapStateToProps, null)(Player);
