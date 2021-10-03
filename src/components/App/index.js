import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './index.css';
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
        <Scenario />

        <div id="app-content">
          <Header />
          <Switch>
            <Route exact path='/' component={NewsFeed} />
            <Route path="/profile/:user" component={Profile} />
            <Route path="/settings_general/:section" component={GeneralSettings} />
          </Switch>
        </div>

        <Chat />
      </div>
    </Router>
  );
}

export default App;
