// import axios from '../../API/axios'; // ganti pake axios
const RevenueDB = 'http://localhost:4000/revenue';
const RoomDB = 'http://localhost:4000/room';
const TenantDB = 'http://localhost:4000/tenant';

// const RevenueDB = 'http://localhost:3001/revenue';
// const RoomDB = 'http://localhost:3001/room';


export const fetchRevenue = () => {
  return (dispatch) => {
    fetch(RevenueDB, { method: 'GET' })
      .then((response) => response.json())
      .then((revenue) => {
        console.log(revenue, '<<<< diAction');
        return dispatch({ type: 'REVENUE/FETCH', payload: revenue });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchRoom = () => {
  return (dispatch) => {
    fetch(RoomDB, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, '<<<< di Action Room');
        return dispatch({ type: 'ROOM/FETCH', payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const fetchTenant = () => {
  return (dispatch) => {
    fetch(TenantDB, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, '<<<< di Action Room');
        return dispatch({ type: 'TENANT/FETCH', payload: data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
