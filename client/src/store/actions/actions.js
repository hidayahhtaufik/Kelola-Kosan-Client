import axios from '../../API/axios'; // ganti pake axios
// const RevenueDB = 'http://localhost:4000/revenues';
// const expensesDB = 'http://localhost:4000/expenses';
// const RoomDB = 'http://localhost:4000/rooms';
// const TenantDB = 'http://localhost:4000/tenant';
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJkZXZlbG9wbWVudEBtYWlsLmNvbSIsImlhdCI6MTYyMjM2ODIzOX0.KHtaQ7w_Q0Z9uitiXS9gVuLWmr7Aj6pxe4pa8OmFTCE"
// ACTION REVENUE ===========================================================
export const fetchRevenue = () => {
  
  return (dispatch) => {
    axios
      .get('/revenues', {
        headers: {
          access_token: token
        }
      })
      .then((revenue) => {
        console.log(revenue.data, '<<<< di Action Expenses');
        return dispatch({ type: 'REVENUE/FETCH', payload: revenue.data });
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
          access_token: token
        }
      })
      .then((expenses) => {
        console.log(expenses.data, '<<<< di Action Expenses');
        return dispatch({ type: 'EXPENSES/FETCH', payload: expenses.data });
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
          access_token: token
        }
      })
      .then((properties) => {
        console.log(properties.data, '<<<< di Action Properties');
        setProperty(properties.data);
        setLoading(false);
        return dispatch({ type: 'PROPERTIES/FETCH', payload: properties.data });
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
          access_token: token
        }
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
          access_token: token
        }
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
