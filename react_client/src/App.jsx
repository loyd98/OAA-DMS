import React, { Component, Fragment } from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';
import './components/FontAwesomeIcons/FontAwesomeIcon';
import './App.css';

// Components
import Navigation from './components/Navigation/Navigation';
import Dashboard from './scenes/Dashboard/Dashboard';
import Login from './scenes/Login/Login';
import View from './scenes/View/View';
import Modal from './components/Modal/Modal';
import Add from './scenes/Add/Add';

const axios = require('axios');
const config = require('./data.config');
const debounce = require('lodash.debounce');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTable: sessionStorage.getItem('currentTable'),
      username: '',
      password: '',
      showAdd: false,
    };
    this.url = config.URL;
    this.config = config;
  }

  componentDidMount() {
    const currentTable = sessionStorage.getItem('currentTable');
    if (currentTable) {
      this.setState({ currentTable });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentTable } = this.state;
    if (prevState.currentTable !== currentTable) {
      sessionStorage.setItem('currentTable', currentTable);
    }
  }

  setUsername = (username) => this.setState({ username });
  setPassword = (password) => this.setState({ password });
  setCurrentTable = (currentTable) => this.setState({ currentTable });

  render() {
    const { username, password, showAdd, currentTable } = this.state;

    return (
      <div className="App">
        <HashRouter>
          {showAdd && <Add />}
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Login
                  url={this.url}
                  username={username}
                  password={password}
                  onPasswordChange={this.setPassword}
                  onUsernameChange={this.setUsername}
                  onSubmit={this.setCurrentTable}
                />
              )}
            />
            <Route
              exact
              path="/dashboard"
              render={() => (
                <>
                  <>
                    <Navigation />
                    <Dashboard
                      url={this.url}
                      currentTable={currentTable}
                      config={this.config}
                      onTabClick={this.setCurrentTable}
                    />
                  </>
                </>
              )}
            />
            <Route exact path-="view/1?id=:id" render={() => <View />} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
