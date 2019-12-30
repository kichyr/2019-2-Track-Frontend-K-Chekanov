const audioMessagePageReducer = (state = false, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case 'HIDE_OR_DRAW_RECORDER_PAGE':
      return !state
    default:
      return state
  }
}

export { audioMessagePageReducer }
