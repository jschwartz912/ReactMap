import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleMapReact from 'google-map-react';
import Marker from '../components/marker';
import { setMarkers, setMarkerCounts } from '../actions';

class Map extends Component {
    static defaultProps = {
        // The map will begin centered on Atlanta, GA
        center: {
            lat: 33.753746,
            lng: -84.38633
        },
        zoom: 10
    };

    constructor(props) {
        super(props);
        this.state = {
            mapBounds: {},
            spans: {},
            center: {
                lat: 33.753746,
                lng: -84.38633
            }
        };
        this.generateMarkers = this.generateMarkers.bind(this);
        this.onBoundsChange = this.onBoundsChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if (nextProps.markers.length === 0) {
            this.generateMarkers(this.state.mapBounds, this.state.spans);
        }
    }

    onBoundsChange(props) {
        // Get map bounds
        const mapBounds = {
            nw: props.bounds.nw,
            ne: props.bounds.ne,
            sw: props.bounds.sw,
            se: props.bounds.se
        };

        // Calculate lng and lat spans
        const spans = {
            lat: mapBounds.ne.lat - mapBounds.sw.lat,
            lng: mapBounds.ne.lng - mapBounds.sw.lng
        };

        const center = props.center;

        this.setState({ mapBounds });
        this.setState({ spans });
        this.setState({ center });

        if (this.props.markers.length === 0) {
            this.generateMarkers(mapBounds, spans);
        }
    }

    generateMarkers(mapBounds, spans) {
        console.log(mapBounds, spans);

        // Calculate hemisphere bounds
        const [hemNW, hemNE, hemSW, hemSE] = this.calcHemispheres(mapBounds, spans);

        // Generate 2000 Random Markers within map bounderies
        var marks = [];
        var centerCount = 1;
        var nwCount = 0;
        var neCount = 0;
        var swCount = 0;
        var seCount = 0;

        for (let i = 0; i < this.props.markerLimit; i++) {
            const mark = {
                lat: mapBounds.sw.lat + spans.lat * Math.random(),
                lng: mapBounds.sw.lng + spans.lng * Math.random(),
                hemisphereClass: '',
                key: i
            };

            // NW Hemisphere
            if (this.containsMarker(mark, hemNW)) {
                mark.hemisphereClass = 'northwestMarker';
                nwCount = nwCount + 1;
            } else if (this.containsMarker(mark, hemNE)) {
                // NE Hemisphere
                mark.hemisphereClass = 'northeastMarker';
                neCount = neCount + 1;
            } else if (this.containsMarker(mark, hemSW)) {
                // SW Hemisphere
                mark.hemisphereClass = 'southwestMarker';
                swCount = swCount + 1;
            } else if (this.containsMarker(mark, hemSE)) {
                // Has to be in SE Hemisphere
                mark.hemisphereClass = 'southeastMarker';
                seCount = seCount + 1;
            }

            marks.push(mark);
        }

        const center = {
            lat: this.state.center.lat,
            lng: this.state.center.lng,
            hemisphereClass: 'centerMarker',
            key: marks.length
        };
        // Center Mark
        marks.push(center);

        // Update map with the new markers
        this.props.setMarkers(marks);

        // Marker counts
        const markerCounts = [centerCount, nwCount, neCount, swCount, seCount];
        this.props.setMarkerCounts(markerCounts);
    }

    calcHemispheres(mapBounds, spans) {
        const { nw, ne, sw, se } = mapBounds;
        const { lat: latSpan, lng: lngSpan } = spans;

        // console.log('****MAP BOUNDS****');
        // console.log('nw: ', nw);
        // console.log('ne: ', ne);
        // console.log('sw: ', sw);
        // console.log('se: ', se);

        // console.log('****MAP SPAN****');
        // console.log(`lngSpan: ${lngSpan}`);
        // console.log(`latSpan: ${latSpan}`);

        // 4 coordinates for each corner of hemisphere
        const hemNW = {
            nw: { lat: nw.lat, lng: nw.lng },
            ne: { lat: ne.lat, lng: ne.lng - lngSpan / 2 },
            sw: { lat: nw.lat - latSpan / 2, lng: nw.lng },
            se: { lat: nw.lat - latSpan / 2, lng: ne.lng - lngSpan / 2 }
        };
        const hemNE = {
            nw: { lat: ne.lat, lng: ne.lng - lngSpan / 2 },
            ne: { lat: ne.lat, lng: ne.lng },
            sw: { lat: ne.lat - latSpan / 2, lng: ne.lng - lngSpan / 2 },
            se: { lat: ne.lat - latSpan / 2, lng: ne.lng }
        };
        const hemSW = {
            nw: { lat: nw.lat - latSpan / 2, lng: sw.lng },
            ne: { lat: nw.lat - latSpan / 2, lng: ne.lng - lngSpan / 2 },
            sw: { lat: sw.lat, lng: sw.lng },
            se: { lat: sw.lat, lng: se.lng - lngSpan / 2 }
        };
        const hemSE = {
            nw: { lat: nw.lat - latSpan / 2, lng: ne.lng - lngSpan / 2 },
            ne: { lat: nw.lat - latSpan / 2, lng: ne.lng },
            sw: { lat: sw.lat, lng: sw.lng },
            se: { lat: sw.lat, lng: se.lng - lngSpan / 2 }
        };

        const hems = [hemNW, hemNE, hemSW, hemSE];

        return hems;
    }

    containsMarker(marker, hem) {
        const { lat: markLat, lng: markLng } = marker;
        return (
            markLng >= hem.nw.lng &&
            markLng <= hem.ne.lng &&
            markLat >= hem.sw.lat &&
            markLat <= hem.nw.lat
        );
    }

    renderMarker(marker) {
        const { lat, lng, hemisphereClass, key } = marker;
        return <Marker hemisphereClass={hemisphereClass} lat={lat} lng={lng} key={key} />;
    }

    render() {
        return (
            // Important! Always set the container height explicitly
            <div
                style={{
                    height: '100vh',
                    width: '75vw',
                    flex: '1 1 auto',
                    borderLeft: '1px solid #004278'
                }}
            >
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDv2c9lqjsZZLwzFpYmhN5lNVWcRKH3yKY' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    onChange={this.onBoundsChange}
                >
                    {/* <Marker
                        lat={this.props.center.lat}
                        lng={this.props.center.lng}
                        text={'Atlanta'}
                        hemisphereClass="centerMarker"
                    /> */}

                    {this.props.markers.map(mark => this.renderMarker(mark))}
                </GoogleMapReact>
            </div>
        );
    }
}

function mapStateToProps({ markers, markerLimit }) {
    return { markers, markerLimit };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setMarkers, setMarkerCounts }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Map);
