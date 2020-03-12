const initialState = {
  stats: null,
  isFetching: false,
  error: null,
}

export default (state=initialState, action) => {
  switch(action.type) {
    case "SERVER_STATS_REQUEST":
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    case "SERVER_STATS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        stats: action.payload,
      }
    case "SERVER_STATS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.payload.response
      }
    default:
      return state
  }
}
