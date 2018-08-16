import { combineReducers } from 'redux';
import { markersReducer, clustersReducer } from './map_reducer';
import {
  countReducer,
  limitReducer,
  hemisphereVisibilityReducer
} from './legend_reducer';

// App state
const rootReducer = combineReducers({
  // Markers on map
  markers: markersReducer,
  // Clusters on map
  clusters: clustersReducer,
  // Hemisphere marker visibility
  hemisphereVisibility: hemisphereVisibilityReducer,
  // Marker count for each hemisphere and center
  markerCount: countReducer,
  // [ 0-2000 ] limit for rendered markers
  markerLimit: limitReducer
});

export default rootReducer;
