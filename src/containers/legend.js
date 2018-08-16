import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { refreshMarkers, setMarkerLimit } from '../actions';
import $ from 'jquery';
import logo from '../../src/logo.svg';

class Legend extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.toggleHemisphere = this.toggleHemisphere.bind(this);
    this.reloadMarkers = this.reloadMarkers.bind(this);
    this.onLimitChange = this.onLimitChange.bind(this);
  }

  // Legend finished rendering
  componentDidMount() {
    // Show all markers on page load
    $('input[type=checkbox]').prop('checked', true);
  }

  /**
   * Toggle marker visibility for selected hemisphere
   *
   * @param {element} e - checkbox clicked
   */
  toggleHemisphere(e) {
    const hemClass = '.' + e.target.id.replace(/Check/i, 'Marker');
    const markers = Array.from(document.querySelectorAll(hemClass));
    markers.forEach(mark => mark.classList.toggle('hidden'));
  }

  // Tell map to reload markers
  reloadMarkers() {
    this.props.refreshMarkers();
  }

  /**
   * Validate and update marker limit
   * Renders markers only when refresh occurs
   *
   * @param {element} e - marker limit input field
   */
  onLimitChange(e) {
    var value = parseInt(e.target.value, 10);
    var regex = new RegExp(/^\d+$/);
    var validated = regex.test(value);
    // Input must be a digit 0-9
    // Input must be smaller or equal to input max value (2000)
    if (value <= e.target.max && validated) {
      this.props.setMarkerLimit(value);
    } else if (!value) {
      this.props.setMarkerLimit(0);
    }
  }

  render() {
    return (
      <div className="legend">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Map</h1>
        </header>

        <div className="card shadow-lg">
          <div className="card-body">
            <h5 className="card-title">Legend</h5>

            <div className="row">
              <div className="col-sm-1" />
              <div className="col-sm-1" />
              <div className="col-sm-5">
                <p className="legend-text">Hemisphere</p>
              </div>
              <div className="col-sm-5">
                <p className="legend-text">Count</p>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-1 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="centerCheck"
                  onChange={this.toggleHemisphere}
                />
              </div>
              <div className="col-sm-1" id="center" />
              <div className="col-sm-5">
                <p className="legend-text">Center</p>
              </div>
              <div className="col-sm-5">
                <p className="legend-text">{this.props.markerCount.center}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-1 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="northeastCheck"
                  onChange={this.toggleHemisphere}
                />
              </div>
              <div className="col-sm-1" id="northeast" />
              <div className="col-sm-5">
                <p className="legend-text">Northeast</p>
              </div>
              <div className="col-sm-5">
                <p className="legend-text">{this.props.markerCount.ne}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-1 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="northwestCheck"
                  onChange={this.toggleHemisphere}
                />
              </div>
              <div className="col-sm-1" id="northwest" />
              <div className="col-sm-5">
                <p className="legend-text">Northwest</p>
              </div>
              <div className="col-sm-5">
                <p className="legend-text">{this.props.markerCount.nw}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-1 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="southeastCheck"
                  onChange={this.toggleHemisphere}
                />
              </div>
              <div className="col-sm-1" id="southeast" />
              <div className="col-sm-5">
                <p className="legend-text">Southeast</p>
              </div>
              <div className="col-sm-5">
                <p className="legend-text">{this.props.markerCount.se}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-1 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="southwestCheck"
                  onChange={this.toggleHemisphere}
                />
              </div>
              <div className="col-sm-1" id="southwest" />
              <div className="col-sm-5">
                <p className="legend-text">Southwest</p>
              </div>
              <div className="col-sm-5">
                <p className="legend-text">{this.props.markerCount.sw}</p>
              </div>
            </div>

            <div className="row">
              <div className="input-group">
                <input
                  min="0"
                  max="2000"
                  type="number"
                  className="form-control"
                  placeholder="Marker Limit"
                  value={this.props.markerLimit}
                  onChange={this.onLimitChange}
                />
                <div className="input-group-append">
                  <button
                    onClick={this.reloadMarkers}
                    className="btn btn-primary"
                    type="button"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="App-footer">
          <div>
            <a href="https://github.com/jschwartz912/jschwartz912.github.io">
              <i className="fa fa-github" />
            </a>
          </div>
          <div>
            <a href="https://jschwartz912.github.io">
              <i className="fa fa-window-maximize" />
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

// Map redux states to props
function mapStateToProps({ markers, markerCount, markerLimit }) {
  return { markers, markerCount, markerLimit };
}

// Action creators
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ refreshMarkers, setMarkerLimit }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Legend);
