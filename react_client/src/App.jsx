import React, { Component } from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';
import './components/FontAwesomeIcons/FontAwesomeIcon';
import './App.css';
import axios from 'axios';

// Components
import Navigation from './components/Navigation/Navigation';
import Dashboard from './scenes/Dashboard/Dashboard';
import Login from './scenes/Login/Login';
import Notification from './components/Notification/Notification';
import ViewDonors from './scenes/Views/ViewDonors';
import ViewDonations from './scenes/Views/ViewDonations';
import ViewScholarships from './scenes/Views/ViewScholarships';

const config = require('./data.config');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTable: sessionStorage.getItem('currentTable'),
      username: '',
      password: '',
      showNotif: 'none',
      notifMessage: '',
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

  setShowNotif = (showNotif) => this.setState({ showNotif });

  setNotifMessage = (notifMessage) => new Promise((resolve) => {
    this.setState({ notifMessage }, resolve);
  });

  handleView = (history, table, id) => {
    switch (table) {
      case 'donors':
        this.setCurrentTable('donors');
        history.push({
          pathname: '/donor',
          state: {
            id,
          },
        });
        break;
      case 'donations':
        this.setCurrentTable('donations');
        history.push({
          pathname: '/donation',
          state: {
            id,
          },
        });
        break;
      default:
        console.log('ERROR');
        break;
    }
  };

  handleInnerDelete = (url, table, callback, id) => {
    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };

    switch (table) {
      case 'donors':
        axios
          .delete(`${url}/donor/${id}`, options)
          .then(() => {
            callback();
            this.setNotifMessage(`Donor ID ${id} successfulyl deleted.`);
            this.handleNotification();
          })
          .catch((err) => console.log(err));
        break;
      case 'donations':
        axios
          .delete(`${url}/donation/${id}`, options)
          .then(() => {
            callback();
            this.setNotifMessage(`Donation ID ${id} successfully deleted.`);
            this.handleNotification();
          })
          .catch((err) => console.log(err));
        break;
      default:
        console.log('ERROR');
        break;
    }
  };

  delay = (ms) => new Promise((res) => setTimeout(res, ms));

  render() {
    const {
      username, password, currentTable, showNotif, notifMessage,
    } = this.state;

    return (
      <div className="App">
        <Notification showNotif={showNotif}>{notifMessage}</Notification>
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
                  <Navigation />
                  <Dashboard
                    username={username}
                    url={this.url}
                    currentTable={currentTable}
                    config={this.config}
                    onTabClick={this.setCurrentTable}
                    onShow={this.setShowNotif}
                    onMessage={this.setNotifMessage}
                  />
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
                  onDelete={this.handleInnerDelete}
                  onNotif={this.handleNotification}
                  onShow={this.setShowNotif}
                  onMessage={this.setNotifMessage}
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
                  onDelete={this.handleInnerDelete}
                  onNotif={this.handleNotification}
                  onShow={this.setShowNotif}
                  onMessage={this.setNotifMessage}
                />
              )}
            />
            <Route
              exact
              path="/scholarship"
              render={() => (
                <ViewScholarships
                  url={this.url}
                  currentTable={currentTable}
                  config={config}
                  onView={this.handleView}
                  onDelete={this.handleInnerDelete}
                  onNotif={this.handleNotification}
                  onShow={this.setShowNotif}
                  onMessage={this.setNotifMessage}
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
