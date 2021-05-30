import axios from '../../API/axios'; // ganti pake axios
import baseUrl from "../../API/baseUrl"
const RevenueDB = 'http://localhost:4000/revenue';
const RoomDB = `${baseUrl}/rooms`;
const TenantDB = 'http://localhost:4000/tenant';

// const RevenueDB = 'http://localhost:3001/revenue';
// const RoomDB = 'http://localhost:3001/room';

export const postLogin = (email, password) => {
  return axios({
    method: "POST",
    url: `/login`,
    data: {
      email,
      password
    }
  })
  .then(response => {
    const access_token = response.data.access_token;
    console.log(access_token);
    localStorage.setItem("access_token", access_token);
    return response;
  })
  .catch(err => {
    console.log(err);
  })
};


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

    axios({
      method: "GET",
      url: `${baseUrl}/rooms`,
      headers: {access_token: localStorage.getItem('access_token')}
    })
    .then(response => {
      console.log(response.data);
      const dataRooms = response.data;
      return dispatch({ type: 'ROOM/FETCH', payload: dataRooms });
    })
    .catch(err => {
      console.log(err);
    })
    
    // console.log(localStorage.getItem('access_token'))
    // fetch(RoomDB, requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data, '<<<< di Action Room');
    //     return dispatch({ type: 'ROOM/FETCH', payload: data });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
