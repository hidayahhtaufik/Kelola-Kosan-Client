const initialState = {
  tenants: [],
};

const tenantReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'TENANT/FETCH':
      console.log(payload, '<<<<< DI STORE TENANT');
      return { ...state, tenants: payload };
    default:
      return state;
  }
};

export default tenantReducer;
