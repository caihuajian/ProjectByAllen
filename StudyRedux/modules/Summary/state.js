import { UI } from 'consts';
import store from '../../store';

const SUMMARY_REPORT = 'summary/SUMMARY_REPORT';

const _getInitialState = () => {
  return {
    reservedOrders: null,
    repeatGuests: null,
    rank: null,
    maxReservedOrdersThisWeek: null,
    minReservedOrdersThisWeek: null,
    notificationUnreadCount: null,
    walkInOrders: null,
    reservedGuests: null,
    updatedAt: null,
    turns: [],
    isOnBusiness: true,
    notificationNewUnreadCount: null,
  };
};

export const setState = (state) => {
  return { type: SUMMARY_REPORT, payload: state };
};

export const refresh = (state) => {
  setState(state);
};

const reducer = (state = _getInitialState(), action) => {
  switch (action.type) {
    case SUMMARY_REPORT: {
      return { ...state, ...action.payload };
    }
    case 'focus': {
      if (action.scene.sceneKey === 'main' && action.scene.index === UI.TabIndex.SUMMARY) {
        
      }
      return state;
    }
    case 'clearState':
    case 'switchRestaurant':
      return _getInitialState();
    default:
      return state;
  }
};

export default reducer;
