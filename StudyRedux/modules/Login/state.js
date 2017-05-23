import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { i18n } from '../../i18n';
import store from '../../store';
import Config from '../../Config';

const SET_STATE = 'login/SET_STATE';
const RESTORE_HISTORY_USER = 'login/RESTORE_HISTORY_USER';
const CLEAR_STATE = 'loign/CLEAR_STATE';

export const setState = (state) => {
  return { type: SET_STATE, payload: state };
};

export const login = (authData) => {
  return async () => {
    Actions.main();
    return;
  };
};

export const clearState = () => {
  return { type: CLEAR_STATE };
};

const _getInitialState = () => {
  return {
    authData: {
      restaurantName: '',
      username: '',
      password: '',
      loginFromChain: false,
    },
    isSignInEnabled: false,
    keyboardTopPadding: 0,
  };
};

const reducer = (state = _getInitialState(), action) => {
  switch (action.type) {
    case SET_STATE: {
      const newState = { ...state, ...action.payload };
      if (newState.authData.restaurantName && newState.authData.username && newState.authData.password) {
        newState.isSignInEnabled = true;
      } else {
        newState.isSignInEnabled = false;
      }

      return newState;
    }
    case RESTORE_HISTORY_USER:
      if (!action.payload) {
        return state;
      }

      return { ...state, authData: action.payload };
    case CLEAR_STATE:
      state.authData.password = '';
      state.isSignInEnabled = false;
      return { ...state };
    case 'focus': {
      return state;
    }
    default:
      return state;
  }
};

export default reducer;