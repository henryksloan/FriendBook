import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Header from '../Header';
import Scenario from '../Scenario';
import NewsFeed from '../NewsFeed';
import Profile from '../Profile';
import GeneralSettings from '../GeneralSettings';
import Chat from '../Chat';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Scenario />

        <Switch>
          <Route exact path='/' component={NewsFeed} />
          <Route path="/profile/:user" component={Profile} />
          <Route path="/settings_general/:section" component={GeneralSettings} />
        </Switch>

        <Chat />
      </div>
    </Router>
  );
}

export default App;
