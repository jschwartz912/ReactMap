import { SET_MARKERS, REFRESH_MARKERS } from '../actions';

export default function(state = [], action) {
    switch (action.type) {
        case SET_MARKERS:
            return action.payload;
        case REFRESH_MARKERS:
            return action.payload;
    }
    return state;
}
