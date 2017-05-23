const SHOW = 'tabBar/SHOW';
const HIDE = 'tabBar/HIDE';

export const show = () => {
  return { type: SHOW };
};

export const hide = () => {
  return { type: HIDE };
};

const _getInitialState = () => {
  return {
    shouldHide: false,
  };
};

const reducer = (state = _getInitialState(), action) => {
  switch (action.type) {
    case SHOW:
      return { shouldHide: false };
    case HIDE: {
      return { shouldHide: true };
    }
    default:
      return state;
  }
};

export default reducer;
