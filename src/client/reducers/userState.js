import { SET_USER } from 'Actions';

export default function(state = { userState: { user: null } }, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload.userState,
      };
    default:
      return state;
  }
}
