const openedWeatherReducer = (state = {}, action) => {
    // eslint-disable-next-line
    console.log("keOLOLOLOk");

    switch (action.type) {
      case 'extraInfo':
        return action.location;
      default:
        return state;
  }
}

const addTownReducer = (state = [], action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case 'addedTown':
      return [...state, action.town];
    default:
      return state;
}
}


export { openedWeatherReducer, addTownReducer }