import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Legend from './containers/legend';
import Map from './containers/map';

class App extends Component {
    render() {
        return (
            <div
                className="App"
                style={{ display: 'flex', justifyContent: 'align-end', alignItems: 'center' }}
            >
                <Legend />
                <Map />
            </div>
        );
    }
}

export default App;
