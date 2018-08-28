import { TOGGLE_NAVIGATION } from 'Actions';

const initialState = {
  isNavOpen: false,
};

export default function(state = initialState, action) {
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
