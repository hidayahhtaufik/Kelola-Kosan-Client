const RevenueDB = 'http://localhost:3001/revenue';

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
