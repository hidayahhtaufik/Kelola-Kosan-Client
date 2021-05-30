import axios from '../../API/axios'; // ganti pake axios
const RevenueDB = 'http://localhost:4000/revenues';
// const expensesDB = 'http://localhost:4000/expenses';
const RoomDB = 'http://localhost:4000/rooms';
const TenantDB = 'http://localhost:4000/tenant';

// ACTION REVENUE ===========================================================
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

// ACTION EXPENSES ===========================================================
export const fetchExpenses = () => {
  return (dispatch) => {
    axios
      .get('/expenses', {
        // headers: {
        //   access_token: localStorage.access_token
        // }
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

// ACTION PROPERTIES ===========================================================
export const fetchProperties = (loading, setLoading, property, setProperty) => {
  return (dispatch) => {
    axios
      .get('/properties', {
        // headers: {
        //   access_token: localStorage.access_token
        // }
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

// ACTION TENANT ===========================================================
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
