import { combineReducers } from 'redux'

import serverStats from 'services/serverStats/reducers';
import torrents from 'services/torrents/reducers';

export default combineReducers({
  serverStats,
  torrents,
})
