import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GoogleMapReact from 'google-map-react';
import Marker from '../components/marker';
import { setMarkers, setMarkerCounts, setClusters } from '../actions';

class Map extends Component {
  static defaultProps = {
    zoom: 9
  };

  constructor(props) {
    super(props);
    this.state = {
      mapBounds: {},
      spans: {},
      // Atlanta, GA
      center: {
        lat: 33.753746,
        lng: -84.38633
      },
      clustering: false
    };

    this.generateMarkers = this.generateMarkers.bind(this);
  }

  /**
   * Generate new markers before rendering map
   * @param {Object} nextProps - new map props
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.markers.length === 0) {
      this.generateMarkers();
    }
  }

  /**
   * Update map state (mapBounds, spans, center)
   * @param {Object} - map props
   */
  _onChange = props => {
    // Get map bounds
    const mapBounds = props.bounds;

    // Calculate lng and lat spans
    const spans = {
      lat: mapBounds.ne.lat - mapBounds.sw.lat,
      lng: mapBounds.ne.lng - mapBounds.sw.lng
    };

    // Get new center
    const center = props.center;

    // Update map state
    this.setState({ mapBounds, spans, center });

    // Generate new markers only on page load
    if (this.props.markers.length === 0) {
      this.generateMarkers();
    }
  };

  /**
   * Generate new markers
   */
  generateMarkers() {
    // Calculate hemisphere bounds
    const [hemispheres, clusters] = this.calcMap();
    const [hemNW, hemNE, hemSW, hemSE] = hemispheres;
    var [clusterNW, clusterNE, clusterSW, clusterSE] = clusters;

    // Keep count of how many markers are in each hemisphere
    var centerCount = 1;
    var nwCount = 0;
    var neCount = 0;
    var swCount = 0;
    var seCount = 0;

    // Generate 2000 Random Markers within map bounderies
    var marks = [];
    for (let i = 0; i < this.props.markerLimit; i++) {
      const mark = {
        lat: this.state.mapBounds.sw.lat + this.state.spans.lat * Math.random(),
        lng: this.state.mapBounds.sw.lng + this.state.spans.lng * Math.random(),
        hemisphereClass: '',
        key: i
      };

      // Determine what hemisphere point is in and update count
      if (this.containsMarker(mark, hemNW)) {
        // NW Hemisphere
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
        // SE Hemisphere
        mark.hemisphereClass = 'southeastMarker';
        seCount = seCount + 1;
      }
      marks.push(mark);
    }

    // Center Mark
    const center = {
      lat: this.state.center.lat,
      lng: this.state.center.lng,
      hemisphereClass: 'centerMarker',
      key: marks.length
    };

    marks.push(center);

    // Marker counts
    const markerCounts = {
      center: centerCount,
      nw: nwCount,
      ne: neCount,
      sw: swCount,
      se: seCount
    };

    // Set cluster text to hemisphere marker counts
    clusterNW.text = markerCounts.nw;
    clusterNE.text = markerCounts.ne;
    clusterSW.text = markerCounts.sw;
    clusterSE.text = markerCounts.se;

    // Update legend counts
    this.props.setMarkerCounts(markerCounts);
    // Update map with new clusters
    this.props.setClusters([clusterNW, clusterNE, clusterSW, clusterSE]);
    // Update map with the new markers
    this.props.setMarkers(marks);
  }

  // Calculate hemisphere bounds and cluster centers
  calcMap() {
    const { nw, ne, sw, se } = this.state.mapBounds;
    const { lat: latSpan, lng: lngSpan } = this.state.spans;

    // Hemispheres
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

    // Clusters
    const clusterNW = {
      lat: nw.lat - latSpan / 4,
      lng: nw.lng + lngSpan / 4,
      hemisphereClass: 'northwestMarker',
      key: 'nw'
    };
    const clusterNE = {
      lat: ne.lat - latSpan / 4,
      lng: ne.lng - lngSpan / 4,
      hemisphereClass: 'northeastMarker',
      key: 'ne'
    };
    const clusterSW = {
      lat: sw.lat + latSpan / 4,
      lng: sw.lng + lngSpan / 4,
      hemisphereClass: 'southwestMarker',
      key: 'sw'
    };
    const clusterSE = {
      lat: se.lat + latSpan / 4,
      lng: se.lng - latSpan / 4,
      hemisphereClass: 'southeastMarker',
      key: 'se'
    };

    const hemispheres = [hemNW, hemNE, hemSW, hemSE];
    const clusters = [clusterNW, clusterNE, clusterSW, clusterSE];

    return [hemispheres, clusters];
  }

  /**
   * Determine if marker is in hemisphere bounds
   * @param {Object} marker - map marker
   * @param {Object} hem - hemisphere bounds
   */
  containsMarker(marker, hem) {
    const { lat: markLat, lng: markLng } = marker;
    return (
      markLng >= hem.nw.lng &&
      markLng <= hem.ne.lng &&
      markLat >= hem.sw.lat &&
      markLat <= hem.nw.lat
    );
  }

  // Render marker on map
  renderMarker(marker) {
    const { lat, lng, hemisphereClass, key } = marker;
    const markerClass = `${hemisphereClass} marker`;
    return <Marker markerClass={markerClass} lat={lat} lng={lng} key={key} />;
  }

  // Render cluster on map
  renderCluster(cluster) {
    const { lat, lng, hemisphereClass, key, text } = cluster;
    const clusterClass = `${hemisphereClass} cluster`;
    return (
      <Marker
        markerClass={clusterClass}
        lat={lat}
        lng={lng}
        key={key}
        text={text}
      />
    );
  }

  render() {
    return (
      <div
        className="map"
        onMouseDown={() => this.setState({ clustering: true })}
        onMouseUp={() => this.setState({ clustering: false })}
        onMouseLeave={() => this.setState({ clustering: false })}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDv2c9lqjsZZLwzFpYmhN5lNVWcRKH3yKY' }}
          // The map will begin centered on Atlanta, GA
          center={this.state.center}
          defaultZoom={this.props.zoom}
          onChange={this._onChange}
          onZoomAnimationStart={() => this.setState({ clustering: true })}
          onZoomAnimationEnd={() => this.setState({ clustering: false })}
        >
          {this.state.clustering
            ? this.props.clusters.map(cluster => this.renderCluster(cluster))
            : this.props.markers.map(mark => this.renderMarker(mark))}
        </GoogleMapReact>
      </div>
    );
  }
}

// Map redux states to props
function mapStateToProps({ markers, clusters, markerLimit }) {
  return { markers, clusters, markerLimit };
}

// Action creators
function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { setMarkers, setClusters, setMarkerCounts },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
