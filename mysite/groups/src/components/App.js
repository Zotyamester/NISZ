import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Group from './Group';
import Groups from './Groups';

class App extends Component {
  render() {
    return (
      <div>
        <Groups />
        <Group />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
