import { combineReducers } from 'redux';
import revenueReducer from './revenue.reducer';
import roomReducer from './room.reducer';
import tenantReducer from './tenant.reducer';

const rootReducer = combineReducers({
  revenue: revenueReducer,
  room: roomReducer,
  tenant: tenantReducer,
});

export default rootReducer;
