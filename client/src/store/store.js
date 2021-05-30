import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/reducer';

// function logger(store) {
//   return function (next) {
//     return function (action) {
//       console.log(action, "LAGI DI MIDDLEWARE")
//       next(action);
//     };
//   };
// }

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
