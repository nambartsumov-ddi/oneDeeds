import { TOGGLE_NAVIGATION, CLOSE_NAVIGATION } from 'Actions';

export default function(state = {}, action) {
  switch (action.type) {
    case TOGGLE_NAVIGATION:
      return {
        ...state,
        isNavOpen: !state.isNavOpen,
      };
    case CLOSE_NAVIGATION:
      return {
        ...state,
        isNavOpen: false,
      };
    default:
      return state;
  }
}
