import { createAction } from 'redux-api-middleware';
import { serviceAddresses } from 'config';
import {SERVER_API_KEY} from 'react-native-dotenv';

export const getHardware = createAction({
  endpoint: `${serviceAddresses.stats}/stats/hardware`,
  method: 'GET',
  types: ['SERVER_STATS_REQUEST', 'SERVER_STATS_SUCCESS', 'SERVER_STATS_FAILURE']
});

export const getDisks = createAction({
  endpoint: `${serviceAddresses.stats}/stats/disks`,
  method: 'GET',
  types: ['SERVER_STATS_REQUEST', 'SERVER_STATS_SUCCESS', 'SERVER_STATS_FAILURE']
});

export const getServices = createAction({
  endpoint: `${serviceAddresses.stats}/stats/services`,
  method: 'GET',
  types: ['SERVER_STATS_REQUEST', 'SERVER_STATS_SUCCESS', 'SERVER_STATS_FAILURE']
});

export const restartServer = createAction({
  endpoint: `${serviceAddresses.stats}/commands/restart`,
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({apiKey: SERVER_API_KEY}),
  types: ['SERVER_RESTART_REQUEST', 'SERVER_RESTART_SUCCESS', 'SERVER_RESTART_FAILURE']
});

export const updateServerPackages = createAction({
  endpoint: `${serviceAddresses.stats}/commands/update-packages`,
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({apiKey: SERVER_API_KEY}),
  types: ['SERVER_UPDATE_PACKAGES_REQUEST', 'SERVER_UPDATE_PACKAGES_SUCCESS', 'SERVER_UPDATE_PACKAGES_FAILURE']
});

export const restartDockerServices = (service) => (
  createAction({
    endpoint: `${serviceAddresses.stats}/commands/restart-services`,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({apiKey: SERVER_API_KEY, service}),
    types: ['SERVER_RESTART_SERVICES_REQUEST', 'SERVER_RESTART_SERVICES_SUCCESS', 'SERVER_RESTART_SERVICES_FAILURE']
  })
);

export const updateDockerServices = (service) => (
  createAction({
    endpoint: `${serviceAddresses.stats}/commands/update-services`,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({apiKey: SERVER_API_KEY, service}),
    types: ['SERVER_UPDATE_SERVICES_REQUEST', 'SERVER_UPDATE_SERVICES_SUCCESS', 'SERVER_UPDATE_SERVICES_FAILURE']
  })
);

export const deleteTvSeries = (seriesId) => (
  createAction({
    endpoint: `${serviceAddresses.stats}/commands/delete-series`,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({apiKey: SERVER_API_KEY, seriesId}),
    types: ['SERVER_DELETE_SERIES_REQUEST', 'SERVER_DELETE_SERIES_SUCCESS', 'SERVER_DELETE_SERIES_FAILURE']
  })
);

export const deleteMovie = (movieId) => (
  createAction({
    endpoint: `${serviceAddresses.stats}/commands/delete-movie`,
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({apiKey: SERVER_API_KEY, movieId}),
    types: ['SERVER_DELETE_MOVIE_REQUEST', 'SERVER_DELETE_MOVIE_SUCCESS', 'SERVER_DELETE_MOVIE_FAILURE']
  })
);
