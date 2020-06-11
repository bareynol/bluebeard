const initialState = {
  theme: "light",    // possible options: ["dark", "light"]
}

export default (state=initialState, action) => {
  switch(action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.theme,
      }
    default:
      return state
  }
}
