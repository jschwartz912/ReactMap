export const SET_MARKERS = 'SET_MARKERS';
export const REFRESH_MARKERS = 'REFRESH_MARKERS';
export const SET_MARKER_COUNTS = 'SET_MARKER_COUNTS';
export const SET_MARKER_LIMIT = 'SET_MARKER_LIMIT';

export function setMarkers(markers) {
    return {
        type: SET_MARKERS,
        payload: markers
    };
}

export function refreshMarkers() {
    return {
        type: REFRESH_MARKERS,
        payload: []
    };
}

export function setMarkerCounts(counts) {
    return {
        type: SET_MARKER_COUNTS,
        payload: counts
    };
}

export function setMarkerLimit(limit) {
    return {
        type: SET_MARKER_LIMIT,
        payload: limit
    };
}
