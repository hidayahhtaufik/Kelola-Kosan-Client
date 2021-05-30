const initialState = {
  expenses: [],
};

const expensesReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'EXPENSES/FETCH':
      console.log(payload, '<<<<< DI STORE EXPENSES');
      return { ...state, expenses: payload };
    default:
      return state;
  }
};

export default expensesReducer;
