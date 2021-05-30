import axios from '../../API/axios'; // ganti pake axios
// const RevenueDB = 'http://localhost:4000/revenues';
// const expensesDB = 'http://localhost:4000/expenses';
// const RoomDB = 'http://localhost:4000/rooms';
// const TenantDB = 'http://localhost:4000/tenant';

// ACTION REVENUE ===========================================================
export const fetchRevenue = () => {
  return (dispatch) => {
    axios
      .get('/revenues', {
        headers: {
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

// ACTION PROPERTIES ===========================================================
export const fetchProperties = (loading, setLoading, property, setProperty) => {
  return (dispatch) => {
    axios
      .get('/properties', {
        headers: {
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

export const editPropertyData = (
  payload,
  loading,
  setLoading,
  property,
  setProperty
) => {
  return (dispatch) => {
    axios
      .put(`/properties/${payload.id}`, payload, {
        headers: {
          access_token: localStorage.access_token,
        },
      })
      .then(() => {
        console.log(payload, '<<<< di Action Properties');
        // setProperty(response.data.properties);
        // setLoading(false);
        return dispatch(
          fetchProperties(loading, setLoading, property, setProperty)
        );
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
