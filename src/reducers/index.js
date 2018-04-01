import { combineReducers } from "redux";
import podcasts from "./reducer-podcasts";

export const allReducers = combineReducers({
  podcasts
});

export default allReducers;
