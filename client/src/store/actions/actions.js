import axios from '../../API/axios'; // ganti pake axios
// const RevenueDB = 'http://localhost:4000/revenues';
// const expensesDB = 'http://localhost:4000/expenses';
// const RoomDB = 'http://localhost:4000/rooms';
// const TenantDB = 'http://localhost:4000/tenant';
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJkZXZlbG9wbWVudEBtYWlsLmNvbSIsImlhdCI6MTYyMjM4ODU5MH0.NQneFES1xXCiXb68jH02mEXu4hW_Ivgch3d8SyJGenY"
// ACTION REVENUE ===========================================================
export const fetchRevenue = () => {
  
  return (dispatch) => {
    axios
      .get('/revenues', {
        headers: {

//           access_token: token
//         }

          access_token: localStorage.access_token,
        },

      })
      .then((response) => {
        console.log(response.data.revenues, '<<<< di Action Expenses');
        return dispatch({
          type: 'REVENUE/FETCH',
          payload: response.data.revenues,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// ACTION EXPENSES ===========================================================
export const fetchExpenses = () => {
  return (dispatch) => {
    axios
      .get('/expenses', {
        headers: {

//           access_token: token
//         }

          access_token: localStorage.access_token,
        },

      })
      .then((response) => {
        console.log(response.data, '<<<< di Action Expenses');
        return dispatch({ type: 'EXPENSES/FETCH', payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const createExpenses = (payload) => {
  return (dispatch) => {
    axios
    .post('/expenses', payload, {
      headers: {
        access_token: token
      }
    })
    .then( _ => {
        return dispatch(fetchExpenses())
      })
      .catch(err => console.log(err))
  }
}

export const updateExpenses = (id, payload) => {
  return(dispatch) => {
    axios
      .put(`/expenses/${id}`, payload, {
        headers: {
          access_token: token
        }
      })
      .then( _ => { 
        return dispatch(fetchExpenses())
      })
      .catch(err => console.log(err))

  }
}

export const deleteExpense = (id) => {
  return(dispatch) => {
    axios
      .delete(`/expenses/${id}`, {
        headers: {
          access_token: token
        }
      })
      .then( _ => { 
        return dispatch(fetchExpenses())
      })
      .catch(err => console.log(err))
  }
}



// ACTION PROPERTIES ===========================================================
export const fetchProperties = (loading, setLoading, property, setProperty) => {
  return (dispatch) => {
    axios
      .get('/properties', {
        headers: {

//           access_token: token
//         }

          access_token: localStorage.access_token,
        },

      })
      .then((response) => {
        console.log(response.data.properties, '<<<< di Action Properties');
        setProperty(response.data.properties);
        setLoading(false);
        return dispatch({
          type: 'PROPERTIES/FETCH',
          payload: response.data.properties,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// ACTION ROOM ===========================================================
export const fetchRoom = () => {
  return (dispatch) => {
    axios
      .get('/rooms', {
        headers: {

//           access_token: token
//         }

          access_token: localStorage.access_token,
        },

      })
      .then((room) => {
        console.log(room.data, '<<<< di Action Room');
        return dispatch({ type: 'ROOM/FETCH', payload: room.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// ACTION TENANT ===========================================================
export const fetchTenant = () => {
  return (dispatch) => {
    axios
      .get('/tenant', {
        headers: {

//           access_token: token
//         }

          access_token: localStorage.access_token,
        },

      })
      .then((tenant) => {
        console.log(tenant.data, '<<<< di Action Room');
        return dispatch({ type: 'TENANT/FETCH', payload: tenant.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
