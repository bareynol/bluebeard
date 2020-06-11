const initialState = {
  contentManagementDiskIndex: null,
}

export default (state=initialState, action) => {
  switch(action.type) {
    case "SET_CM_DISK_INDEX":
      return {
        ...state,
        contentManagementDiskIndex: action.index,
      }
    default:
      return state
  }
}
