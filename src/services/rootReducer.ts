import { combineReducers } from 'redux'

import serverStats from 'services/serverStats/reducers';
import torrents from 'services/torrents/reducers';
import settings from 'services/settings/reducers';
import ui from 'services/ui/reducers';

export default combineReducers({
  serverStats,
  torrents,
  settings,
  ui,
})
