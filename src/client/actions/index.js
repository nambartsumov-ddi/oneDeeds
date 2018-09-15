// Action types
// Set User
export const SET_USER = 'SET_USER';

// Toggle Nav Menu
export const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';

// Close Nav Menu
export const CLOSE_NAVIGATION = 'CLOSE_NAVIGATION';
// Start main video
export const PLAY_VIDEO = 'PLAY_VIDEO';
// Close main video
export const CLOSE_VIDEO = 'CLOSE_VIDEO';

// action creators
//  Toggle Nav action creator
export function toggleNav() {
  return { type: TOGGLE_NAVIGATION };
}

//  Close Nav action creator
export function closeNav() {
  return { type: CLOSE_NAVIGATION };
}

export function playMainVideo() {
  return { type: PLAY_VIDEO };
}

export function closeMainVideo() {
  return { type: CLOSE_VIDEO };
}

export function setUser() {
  return { type: SET_USER };
}
