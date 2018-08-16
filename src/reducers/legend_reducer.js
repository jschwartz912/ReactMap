import {
  SET_MARKER_COUNTS,
  SET_MARKER_LIMIT,
  SET_HEMISPHERE_VISIBILITY
} from '../actions';

// Default hemisphere marker counts
const markerCounts = {
  center: 0,
  nw: 0,
  ne: 0,
  sw: 0,
  se: 0
};

// Default visibility for hemisphere markers/clusers
const hemispheres = {
  centerMarker: true,
  northwestMarker: true,
  northeastMarker: true,
  southwestMarker: true,
  southeastMarker: true
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

// Reducer for toggling visibility of markers in selected hemisphere
export function hemisphereVisibilityReducer(state = hemispheres, action) {
  if (action.type === SET_HEMISPHERE_VISIBILITY) {
    // Toggle hemisphere visibility
    if (action.payload === 'centerMarker') {
      return Object.assign(
        {},
        Object.assign({}, { centerMarker: !state.centerMarker }),
        { northwestMarker: state.northwestMarker },
        { northeastMarker: state.northeastMarker },
        { southwestMarker: state.southwestMarker },
        { southeastMarker: state.southeastMarker }
      );
    } else if (action.payload === 'northwestMarker') {
      return Object.assign(
        {},
        { centerMarker: state.centerMarker },
        Object.assign({}, { northwestMarker: !state.northwestMarker }),
        { northeastMarker: state.northeastMarker },
        { southwestMarker: state.southwestMarker },
        { southeastMarker: state.southeastMarker }
      );
    } else if (action.payload === 'northeastMarker') {
      return Object.assign(
        {},
        { centerMarker: state.centerMarker },
        { northwestMarker: state.northwestMarker },
        Object.assign({}, { northeastMarker: !state.northeastMarker }),
        { southwestMarker: state.southwestMarker },
        { southeastMarker: state.southeastMarker }
      );
    } else if (action.payload === 'southwestMarker') {
      return Object.assign(
        {},
        { centerMarker: state.centerMarker },
        { northwestMarker: state.northwestMarker },
        { northeastMarker: state.northeastMarker },
        Object.assign({}, { southwestMarker: !state.southwestMarker }),
        { southeastMarker: state.southeastMarker }
      );
    } else if (action.payload === 'southeastMarker') {
      return Object.assign(
        {},
        { centerMarker: state.centerMarker },
        { northwestMarker: state.northwestMarker },
        { northeastMarker: state.northeastMarker },
        { southwestMarker: state.southwestMarker },
        Object.assign({}, { southeastMarker: !state.southeastMarker })
      );
    } else {
      return state;
    }
  } else {
    return state;
  }
}
