import moment from 'moment';
import { Actions } from 'react-native-router-flux';

import store from '../store';
import * as loginActions from '../modules/Login/state';


const UPDATE_CURRENT_TIME = 'app/UPDATE_CURRENT_TIME';
const LOGIN = 'app/LOGIN';

const getCurrentTime = () => {
  return moment().set({ second: 0, millisecond: 0 });
};

export const updateCurrentTime = () => {
  return { type: UPDATE_CURRENT_TIME, payload: getCurrentTime() };
};

const _getInitialState = () => {
  return {
    currentTimeInMinutes: getCurrentTime(),
    currentScheduleDate: null,
    user: null,
  };
};

const reducer = (state = _getInitialState(), action) => {
  switch (action.type) {
    case UPDATE_CURRENT_TIME: {
      let currentScheduleDate = state.currentScheduleDate;
      const latestScheduleDate = action.payload.getScheduleDate();
      if (currentScheduleDate.valueOf() !== latestScheduleDate.valueOf()) {
        currentScheduleDate = latestScheduleDate;
      }

      return { ...state, currentScheduleDate, currentTimeInMinutes: action.payload };
    }
    case LOGIN:
      return { ...state, user: action.payload };
    case 'clearState':
      return _getInitialState();
    case 'switchRestaurant':
      return { ..._getInitialState(), user: state.user };
    default:
      return state;
  }
};

export default reducer;
