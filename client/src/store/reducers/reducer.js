import { combineReducers } from 'redux';
import revenueReducer from './revenue.reducer';

const rootReducer = combineReducers({
  revenue: revenueReducer,
});

export default rootReducer;
