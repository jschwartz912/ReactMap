import React, { Component } from 'react';

// Map Markers
export default class Marker extends Component {
  render() {
    return <div className={this.props.markerClass}>{this.props.text}</div>;
  }
}
