import React, { Component } from 'react';

const K_WIDTH = 10;
const K_HEIGHT = 10;

const MarkerStyle = {
    // initially any map object has left top corner at lat lng coordinates
    // it's on you to set object origin to 0,0 coordinates

    position: 'absolute',
    width: K_WIDTH,
    height: K_HEIGHT,
    left: -K_WIDTH / 2,
    top: -K_HEIGHT / 2,

    border: '5px solid',
    borderRadius: K_HEIGHT,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4
};

class Marker extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
    }

    render() {
        return <div style={MarkerStyle} className={this.props.hemisphereClass} />;
    }
}

export default Marker;
