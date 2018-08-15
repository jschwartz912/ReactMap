import { combineReducers } from 'redux';
import MapReducer from './map_reducer';
import { markerCountReducer, markerLimitReducer } from './legend_reducer';

const rootReducer = combineReducers({
    markers: MapReducer,
    markerCount: markerCountReducer,
    markerLimit: markerLimitReducer
});

export default rootReducer;
