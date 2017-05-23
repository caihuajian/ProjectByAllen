const SET_STATE = 'more/SET_STATE';

export const setState = (state) => {
  return { type: SET_STATE, payload: state };
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default reducer;
