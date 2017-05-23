import { combineReducers } from 'redux';
import { i18n } from 'redux-pagan';
import app from './StudyRedux/state';
import router from './modules/Router/state';
import prompt from './components/Prompt/state';
import tabBar from './components/TabBar/state';
import login from './modules/Login/state';
import summary from './modules/Summary/state';
import more from './modules/More/state';
import report from './modules/Report/state';
import loading from './components/Loading/state';

const reducer = combineReducers({
  i18n,
  app,
  loading,
  prompt,
  tabBar,
  router,
  login,
  summary,
  more,
  report,
});

export default reducer;
