const initialState = {
  torrentStats: {},
  torrents: [],
  isFetching: false,
  error: null,
  transmissionSessionId: "",
}

export default (state=initialState, action) => {
  switch(action.type) {
    case "UPDATE_TRANSMISSION_SESSION_ID":
      return {
        ...state,
        transmissionSessionId: action.transmissionSessionId
      }
    case "TORRENT_REQUEST":
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    case "TORRENT_SUCCESS":
      return {
        ...state,
        isFetching: false,
        torrents: action.payload.arguments.torrents
      }
    case "TORRENT_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.payload.response
      }
    case "TORRENT_STATS_SUCCESS":
      return {
        ...state,
        torrentStats: action.payload.arguments,
      }
    default:
      return state
  }
}
