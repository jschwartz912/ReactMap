// Action Types
export const SET_MARKERS = 'SET_MARKERS';
export const SET_CLUSTERS = 'SET_CLUSTERS';
export const REFRESH_MARKERS = 'REFRESH_MARKERS';
export const SET_MARKER_COUNTS = 'SET_MARKER_COUNTS';
export const SET_MARKER_LIMIT = 'SET_MARKER_LIMIT';
export const SET_HEMISPHERE_VISIBILITY = 'SET_HEMISPHERE_VISIBILITY';

// Action Creators
export function setMarkers(markers) {
  return {
    type: SET_MARKERS,
    payload: markers
  };
}

export function setClusters(clusters) {
  return {
    type: SET_CLUSTERS,
    payload: clusters
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

export function setHemisphereVisibility(hemisphere) {
  return {
    type: SET_HEMISPHERE_VISIBILITY,
    payload: hemisphere
  };
}
