import { combineReducers } from 'redux';
import revenueReducer from './revenue.reducer';
import roomReducer from './room.reducer';

const rootReducer = combineReducers({
  revenue: revenueReducer,
  room: roomReducer,
});

export default rootReducer;
