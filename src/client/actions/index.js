// Action types
export const SET_USER = 'SET_USER';
export const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';
export const CLOSE_NAVIGATION = 'CLOSE_NAVIGATION';
export const PLAY_VIDEO = 'PLAY_VIDEO';
export const CLOSE_VIDEO = 'CLOSE_VIDEO';

// action creators
export function toggleNav() {
  document.body.classList.toggle('modal-open');
  return { type: TOGGLE_NAVIGATION };
}

export function closeNav() {
  document.body.classList.remove('modal-open');
  return { type: CLOSE_NAVIGATION };
}

export function playMainVideo() {
  return { type: PLAY_VIDEO };
}

export function closeMainVideo() {
  return { type: CLOSE_VIDEO };
}

export function setUser(user) {
  return { type: SET_USER, payload: user };
}
