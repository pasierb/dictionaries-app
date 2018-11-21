import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DictionariesPage, DictionaryPage } from './pages';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <Switch>
            <Route path="/dictionary/:id" component={DictionaryPage} />
            <Route path="/" component={DictionariesPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}
