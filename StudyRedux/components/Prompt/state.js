const SHOW = 'prompt/SHOW';
const HIDE = 'prompt/HIDE';
const UPDATE = 'prompt/UPDATE';

export const show = (content) => {
  return { type: SHOW, payload: content };
};

export const update = (content) => {
  return { type: UPDATE, payload: content };
};

export const hide = () => {
  return { type: HIDE };
};

const _getInitialState = () => {
  return {
    title: '',
    isInput: false,
    autoFocus: true,
    autoHideWhenHideAllModals: true,
    isCancelOnRight: false,
    isCancelVisible: true,
    text: '',
    message: '',
    placeholder: '',
    defaultValue: '',
    cancelText: '',
    submitText: '',
    isVisible: false,
    onCancel: () => {},
    onSubmit: () => {},
    onChangeText: () => {},
    i18n: () => {},
    renderMessage: () => {},
    contentFilter: () => { return false; },
    renderFooter: null,
    messageTextStyle: null,
    cancelTextStyle: null,
    submitTextStyle: null,
    submitDisabledTextStyle: null,
    footerStyle: null,
    data: null,
  };
};

const reducer = (state = _getInitialState(), action) => {
  switch (action.type) {
    case SHOW:
      return { ...state, ...action.payload, isVisible: true };
    case UPDATE:
      return { ...state, ...action.payload };
    case HIDE:
      return _getInitialState();
    default:
      return state;
  }
};

export default reducer;
