import * as pagan from 'redux-pagan';
import _ from 'lodash';

import store from '../store';

const translations = {
  'en-US': require('./en-US').default,
  'zh-CN': require('./zh-CN').default,
};
const cachedI18n = {};

export const loadLang = (lang) => {
  store.dispatch(pagan.loadLang(lang, () => translations[lang]));
};

export const getLang = () => {
  const i18nState = store.getState().i18n;
  if (cachedI18n[i18nState.locale]) {
    return cachedI18n[i18nState.locale];
  }

  // 第一个 key 一定是 app，写在这里后其它地方可以省略，同时起到缓存作用
  const originalI18n = pagan.getLang(i18nState, 'app');
  cachedI18n[i18nState.locale] = (...args) => {
    const lastArg = args[args.length - 1];
    if (_.isArray(lastArg)) {
      args.pop();
      return _.format(originalI18n(...args), ...lastArg);
    } else if (_.isNumber(lastArg)) {
      args.pop();
      if (lastArg === 1) {
        args.push('singular');
      } else {
        args.push('plural');
      }

      return originalI18n(...args).s;
    }

    return originalI18n(...args).s;
  };

  return cachedI18n[i18nState.locale];
};

export const i18n = (...args) => {
  return getLang()(...args);
};
