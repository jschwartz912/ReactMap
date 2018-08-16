import { SET_MARKERS, REFRESH_MARKERS, SET_CLUSTERS } from '../actions';

// reducer for updating markers
export function markersReducer(state = [], action) {
  switch (action.type) {
    case SET_MARKERS:
      return action.payload;
    case REFRESH_MARKERS:
      return action.payload;
    default:
      break;
  }
  return state;
}

export function clustersReducer(state = [], action) {
  if (action.type === SET_CLUSTERS) {
    return action.payload;
  } else {
    return state;
  }
}
