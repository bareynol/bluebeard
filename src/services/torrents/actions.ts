import { createAction } from 'redux-api-middleware';
import { serviceAddresses } from 'config';

import {TRANSMISSION_AUTH_TOKEN} from 'react-native-dotenv';

export function getTorrents() {
  return async (dispatch, getState) => {
    const sessionId = await dispatch(getTransmissionSessionId());
    
    return dispatch(createAction({
      endpoint: `${serviceAddresses.transmission}/transmission/rpc`,
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${TRANSMISSION_AUTH_TOKEN}`,
        "X-Transmission-Session-Id": sessionId,
      },
      body: JSON.stringify({
        method: "torrent-get",
        arguments: {
          fields: [
            'id', 'addedDate', 'error', 'errorString', 'eta', 'isFinished', 'isStalled', 'leftUntilDone',
            'name', 'peersConnected', 'peersGettingFromUs', 'peersSendingToUs', 'percentDone', 'queuePosition',
            'rateDownload', 'rateUpload', 'sizeWhenDone', 'status', 'totalSize', 'uploadRatio', 'uploadedEver',
          ]
        }
      }),
      types: ['TORRENT_REQUEST', 'TORRENT_SUCCESS', 'TORRENT_FAILURE']
    }))
  }
}

export function getTransmissionSessionId() {
  return async (dispatch, getState) => {
    // check for existing session ID in store
    let transmissionSessionId = getState()?.torrents?.transmissionSessionId;
    if (transmissionSessionId) {
      return transmissionSessionId;
    }

    // if no session ID, send a request to get one
    const response = await fetch(`${serviceAddresses.transmission}/transmission/rpc`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${TRANSMISSION_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          method: "session-get"
        }),
      }
    )

    // store the session ID
    transmissionSessionId = response.headers?.map?.['x-transmission-session-id'];
    if (transmissionSessionId) {
      await dispatch({type: "UPDATE_TRANSMISSION_SESSION_ID", transmissionSessionId});
    }
    
    return transmissionSessionId;
  }
}