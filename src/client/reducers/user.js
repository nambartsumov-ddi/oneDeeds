import { SET_USER } from 'Actions';

export default function(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: state.user,
      };
    default:
      return state;
  }
}
