import store from '../../store';

const FOCUS = 'focus';

const _getInitialState = () => {
  return {
    scene: {},
  };
};

const reducer = (state = _getInitialState(), action) => {
  switch (action.type) {
    case FOCUS: {
      const scene = action.scene;

      return { ...state, scene };
    }
    default:
      return state;
  }
};

export default reducer;