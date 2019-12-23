const openedPageReducer = (state = {page: 'list', town_id: -1}, action) => {
    // eslint-disable-next-line
    switch (action.type) {
      case 'openList':
        return {page: 'list', town_id: -1};
      case 'townInfo':
        return {page: 'list', town_id: action.town_id};
      default:
        return state;
  }
}

const addTownReducer = (state = [], action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case 'addedTown':
      console.log("kek");
      return [...state, action.town];
    default:
      return state;
}
}


export { openedPageReducer, addTownReducer }