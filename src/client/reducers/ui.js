import { TOGGLE_NAVIGATION, CLOSE_NAVIGATION, PLAY_VIDEO, CLOSE_VIDEO } from 'Actions';

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
    case PLAY_VIDEO:
      return {
        ...state,
        isClickedPlayButton: true,
      };
    case CLOSE_VIDEO:
      return {
        ...state,
        isClickedPlayButton: false,
      };
    default:
      return state;
  }
}
