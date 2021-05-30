import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/reducer';

function logger() {
  return function (next) {
    return function (action) {
      next(action);
    };
  };
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

export default store;
