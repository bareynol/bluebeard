const initialState = {
  stats: null,
  isFetching: false,
  error: null,
}

export default (state=initialState, action) => {
  switch(action.type) {
    case "SERVER_STATS_REQUEST":
    case "SERVER_RESTART_REQUEST":
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    case "SERVER_RESTART_SUCCESS":
      return {
        ...state,
        isFetching: false,
      }
    case "SERVER_STATS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        stats: {
          ...state.stats,
          ...action.payload,
        }
      }
    case "SERVER_STATS_FAILURE":
    case "SERVER_RESTART_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: action.payload.response
      }
    case 'SERVER_DELETE_SERIES_REQUEST':
    case 'SERVER_DELETE_MOVIE_REQUEST':
      return {
        ...state,
        isDeleting: true,
      }
    case 'SERVER_DELETE_SERIES_FAILURE':
    case 'SERVER_DELETE_MOVIE_FAILURE':
      return {
        ...state,
        isDeleting: false,
        error: action.payload.response
      }
    case 'SERVER_DELETE_SERIES_SUCCESS':
    case 'SERVER_DELETE_MOVIE_SUCCESS':
      return {
        ...state,
        isDeleting: false,
        stats: {
          ...state.stats,
          ...action.payload,
        }
      }
    default:
      return state
  }
}
