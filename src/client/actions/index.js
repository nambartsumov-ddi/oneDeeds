// Action types
// Set User
export const SET_USER = 'SET_USER';
// Toggle Nav Menu
export const TOGGLE_NAVIGATION = 'TOGGLE_NAVIGATION';

// action creators
//  Toggle Nav action creator
export function toggleNav() {
  return { type: TOGGLE_NAVIGATION };
}
export function setUser() {
  return { type: SET_USER };
}
