const initialState = {
  favorites: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        favorites: {...state.favorites, [action.id]: true},
      };
    case 'REMOVE':
      let newState = state.favorites;
      delete newState[action.id];
      return {
        ...state,
        favorites: {...newState},
      };
    default:
      return state;
  }
};
