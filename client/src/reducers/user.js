const initialState = null;

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return Object.assign({}, state, {
        user: action.user,
      });
    case 'CLEAR_USER':
      return (state = undefined);
    default:
      return state;
  }
}
