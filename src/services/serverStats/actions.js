import { createAction } from 'redux-api-middleware';
import { serviceAddresses } from 'config';

export const getServerStats = createAction({
  endpoint: `${serviceAddresses.stats}/stats`,
  method: 'GET',
  types: ['SERVER_STATS_REQUEST', 'SERVER_STATS_SUCCESS', 'SERVER_STATS_FAILURE']
});
