import { TOGGLE_NAVIGATION } from 'Actions';

export default function(state = {}, action) {
  switch (action.type) {
    case TOGGLE_NAVIGATION:
      return {
        ...state,
        isNavOpen: !state.isNavOpen,
      };
    default:
      return state;
  }
}
