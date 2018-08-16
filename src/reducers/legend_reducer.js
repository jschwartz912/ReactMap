import { SET_MARKER_COUNTS, SET_MARKER_LIMIT } from '../actions';

// Default hemisphere marker counts
const markerCounts = {
  center: 0,
  nw: 0,
  ne: 0,
  sw: 0,
  se: 0
};

// Reducer for updating markerCount state
export function countReducer(state = markerCounts, action) {
  if (action.type === SET_MARKER_COUNTS) {
    return action.payload;
  } else {
    return state;
  }
}

// Reducer for updating markerLimit state
export function limitReducer(state = 200, action) {
  if (action.type === SET_MARKER_LIMIT) {
    return action.payload;
  } else {
    return state;
  }
}
