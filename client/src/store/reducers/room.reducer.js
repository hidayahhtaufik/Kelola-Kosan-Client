const initialState = {
  rooms: [],
};

const roomReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ROOM/FETCH':
      console.log(payload, '<<<<< DI STORE ROOM');
      return { ...state, rooms: payload };
    case 'ROOM/ADD':
      console.log(payload, '<<<< STORE REDUCER ROOM ADD')
      return { ...state, rooms: state.rooms.concat(action.payload) }
    // case 'ROOM/DELETE':
    //   console.log(payload, '<<<<< DI STORE REDUCER ROOM DEL')
    //   return { ...state, rooms: state.rooms.filter( (e) => {return (e !== payload) }) }
    default:
      return state;
  }
};

export default roomReducer;
