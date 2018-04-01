import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise";
import reducer from "./reducers";

export const configureStoreProd = initialState => {
  const finalCreateStore = compose(applyMiddleware(promise))(createStore);
  const store = finalCreateStore(reducer, initialState);
  return store;
};

export const configureStoreDev = initialState => {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(promise))
  );
  return store;
};

export const store =
  process.env.REACT_APP_HOST_ENV === "production"
    ? configureStoreProd()
    : configureStoreDev();
