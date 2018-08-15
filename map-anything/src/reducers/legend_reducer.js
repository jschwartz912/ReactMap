import { SET_MARKER_COUNTS, SET_MARKER_LIMIT } from '../actions';

export function markerCountReducer(state = [], action) {
    switch (action.type) {
        case SET_MARKER_COUNTS:
            return action.payload;
    }
    return state;
}

export function markerLimitReducer(state = 200, action) {
    switch (action.type) {
        case SET_MARKER_LIMIT:
            return action.payload;
    }
    return state;
}
