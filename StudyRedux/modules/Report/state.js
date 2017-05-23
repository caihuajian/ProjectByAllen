import * as summaryActions from '../Summary/state';

const SET_STATE = 'Report/SET_STATE';
const CLEAR_STATE = 'Report/CLEAR_STATE';

export const setState = (state) => {
  return { type: SET_STATE, payload: state };
};

export const clearState = () => {
  return { type: CLEAR_STATE };
};

export const save = (guest) => {
  return async (dispatch) => {
    //await Guests.create(guest);
    dispatch(summaryActions.refresh({isOnBusiness: false}));

    Actions.pop();
  };
};

export const setOnBusinessValue= () => {
  return async (dispatch) => {
    //const historyResult = await Guests.fetchHistory(guest, null, restaurant);
    dispatch(setState({ isOnBusiness: false }));
  };
};

const _getInitialState = () => {
  return {
    mode: 'days',
    isOnBusiness: true,
    totalOrders: null,
    reservedOrders: null,
    reservedGuests: null,
    walkInOrders: null,
    walkInGuests: null,
    totalGuests: null,
    vipGuests: null,
    regularGuests: null,
    repeatGuests: null,
    shifts: [],
    days: [],
    updatedAt: null,
    needInitCalendar: false,
  };
};

const reducer = (state = _getInitialState(), action) => {
  switch (action.type) {
    case SET_STATE: {
      return { ...state, ...action.payload };
    }
    case CLEAR_STATE:
    case 'clearState':
      return _getInitialState();
    case 'switchRestaurant':
      return { ..._getInitialState(), mode: state.mode, needInitCalendar: true };
    default:
      return state;
  }
};

export default reducer;
