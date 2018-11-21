import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DictionariesPage, DictionaryPage } from './pages';
import { AppState } from './store';
import { DictionaryModel } from './models';

interface Props {
	dictionaries: DictionaryModel[]
}

class App extends Component<Props> {
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

const mapStateToProps = ({ dictionaries }: AppState) => ({
	dictionaries
})

export default connect(mapStateToProps)(App);
