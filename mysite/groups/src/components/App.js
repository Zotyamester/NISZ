import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import store from '../store';
import { Provider } from 'react-redux'

import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

import Group from './Group';
import GroupNew from './GroupNew';
import Groups from './Groups';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/groups/new/" component={GroupNew} />
          <Route path="/groups/g/:id/" component={Group} />
          <Route exact path="/groups/">
            <Groups />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
