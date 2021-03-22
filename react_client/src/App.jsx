import React, { Component, Fragment } from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';
import './components/FontAwesomeIcons/FontAwesomeIcon';
import './App.css';

// Components
import Navigation from './components/Navigation/Navigation';
import Dashboard from './scenes/Dashboard/Dashboard';
import Login from './scenes/Login/Login';
import ViewDonors from './scenes/Views/ViewDonors';
import ViewDonations from './scenes/Views/ViewDonations';
import axios from 'axios';

const config = require('./data.config');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTable: sessionStorage.getItem('currentTable'),
      username: '',
      password: '',
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

  handleView = (history, table, id) => {
    switch (table) {
      case 'donors':
        history.push({
          pathname: `/donor`,
          state: {
            id,
          },
        });
        break;
      case 'donations':
        console.log('HI');
        history.push({
          pathname: `/donation`,
          state: {
            id,
          },
        });
        break;
    }
  };

  handleDelete = (url, table, callback, id) => {
    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };

    switch (table) {
      case 'donors':
        axios
          .delete(`${url}/donor/${id}`, options)
          .then((res) => callback())
          .catch((err) => console.log(err));
        break;
      case 'donations':
        axios
          .delete(`${url}/donation/${id}`, options)
          .then((res) => callback())
          .catch((err) => console.log(err));
        break;
    }
  };

  render() {
    const { username, password, currentTable } = this.state;

    return (
      <div className="App">
        <HashRouter>
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
                      username={username}
                      url={this.url}
                      currentTable={currentTable}
                      config={this.config}
                      onTabClick={this.setCurrentTable}
                    />
                  </>
                </>
              )}
            />
            <Route
              exact
              path="/donor"
              render={() => (
                <ViewDonors
                  url={this.url}
                  currentTable={currentTable}
                  config={config}
                  onView={this.handleView}
                  onDelete={this.handleDelete}
                />
              )}
            />
            <Route
              exact
              path="/donation"
              render={() => (
                <ViewDonations
                  url={this.url}
                  currentTable={currentTable}
                  config={config}
                  onView={this.handleView}
                  onDelete={this.handleDelete}
                />
              )}
            />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
