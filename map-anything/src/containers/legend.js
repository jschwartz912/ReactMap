import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { refreshMarkers, setMarkerLimit } from '../actions';

class Legend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: props.markerLimit
        };

        this.toggleHemisphere = this.toggleHemisphere.bind(this);
        this.reloadMarkers = this.reloadMarkers.bind(this);
        this.onLimitChange = this.onLimitChange.bind(this);
    }

    toggleHemisphere(e) {
        const hemClass = '.' + e.target.id.replace(/Check/i, 'Marker');
        const markers = Array.from(document.querySelectorAll(hemClass));

        markers.forEach(mark => mark.classList.toggle('hidden'));
    }

    reloadMarkers() {
        this.props.refreshMarkers();
    }

    onLimitChange(e) {
        var value = e.target.value;
        if (parseInt(value) <= e.target.max || value == '') {
            this.props.setMarkerLimit(value);
        }
    }

    render() {
        return (
            <div className="card">
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
                                checked
                            />
                        </div>
                        <div className="col-sm-1" id="center" />
                        <div className="col-sm-5">
                            <p className="legend-text">Center</p>
                        </div>
                        <div className="col-sm-5">
                            <p className="legend-text">{this.props.markerCount[0]}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-1 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="northeastCheck"
                                onChange={this.toggleHemisphere}
                                checked
                            />
                        </div>
                        <div className="col-sm-1" id="northeast" />
                        <div className="col-sm-5">
                            <p className="legend-text">Northeast</p>
                        </div>
                        <div className="col-sm-5">
                            <p className="legend-text">{this.props.markerCount[2]}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-1 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="northwestCheck"
                                onChange={this.toggleHemisphere}
                                checked
                            />
                        </div>
                        <div className="col-sm-1" id="northwest" />
                        <div className="col-sm-5">
                            <p className="legend-text">Northwest</p>
                        </div>
                        <div className="col-sm-5">
                            <p className="legend-text">{this.props.markerCount[1]}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-1 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="southeastCheck"
                                onChange={this.toggleHemisphere}
                                checked
                            />
                        </div>
                        <div className="col-sm-1" id="southeast" />
                        <div className="col-sm-5">
                            <p className="legend-text">Southeast</p>
                        </div>
                        <div className="col-sm-5">
                            <p className="legend-text">{this.props.markerCount[4]}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-1 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="southwestCheck"
                                onChange={this.toggleHemisphere}
                                checked
                            />
                        </div>
                        <div className="col-sm-1" id="southwest" />
                        <div className="col-sm-5">
                            <p className="legend-text">Southwest</p>
                        </div>
                        <div className="col-sm-5">
                            <p className="legend-text">{this.props.markerCount[3]}</p>
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
        );
    }
}

function mapStateToProps({ markers, markerCount, markerLimit }) {
    return { markers, markerCount, markerLimit };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ refreshMarkers, setMarkerLimit }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Legend);
