import React, { Component } from 'react';
import './App.css';

import Legend from './containers/legend';
import Map from './containers/map';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Legend />
        <Map />
      </div>
    );
  }
}

export default App;
