const initialState = {
  payments: [],
};

const paymentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'PAYMENT/FETCH':
      console.log(payload, '<<<<< DI STORE PAYMENT');
      return { ...state, payments: payload };
    default:
      return state;
  }
};

export default paymentReducer;
