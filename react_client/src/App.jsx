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
import ViewMOAs from './scenes/Views/ViewMOAs';
import ViewScholarships from './scenes/Views/ViewScholarships';
import ViewScholars from './scenes/Views/ViewScholars';
import ViewDocuments from './scenes/Views/ViewDocuments';
import SignUp from './scenes/SignUp/SignUp';
import ManageUsers from './scenes/ManageUsers/ManageUsers';
import UserDashboard from './scenes/UserDashboard/UserDashboard';

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
      url: '',
    };
    this.config = config;
  }

  componentDidMount() {
    const currentTable = sessionStorage.getItem('currentTable');
    if (currentTable) {
      this.setState({ currentTable });
    }

    if (localStorage.getItem('url')) {
      this.setState({ url: localStorage.getItem('url') });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentTable } = this.state;
    if (prevState.currentTable !== currentTable) {
      sessionStorage.setItem('currentTable', currentTable);
    }
  }

  setUrl = (url) => this.setState({ url });

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
      case 'moas':
        this.setCurrentTable('moas');
        history.push({
          pathname: '/moa',
          state: {
            id,
          },
        });
        break;
      case 'scholarships':
        this.setCurrentTable('scholarships');
        history.push({
          pathname: '/scholarship',
          state: {
            id,
          },
        });
        break;
      case 'scholars':
        this.setCurrentTable('scholars');
        history.push({
          pathname: '/scholar',
          state: {
            id,
          },
        });
        break;
      case 'documents':
        this.setCurrentTable('documents');
        history.push({
          pathname: '/document',
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
            this.setNotifMessage(`Donor ID ${id} successfully deleted.`);
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
      case 'moas':
        axios
          .delete(`${url}/moa/${id}`, options)
          .then(() => {
            callback();
            this.setNotifMessage(`MOA ID ${id} successfully deleted.`);
            this.handleNotification();
          })
          .catch((err) => console.log(err));
        break;
      case 'scholarships':
        axios
          .delete(`${url}/scholarships/${id}`, options)
          .then(() => {
            callback();
            this.setNotifMessage(`Scholarship ID ${id} successfully deleted.`);
            this.handleNotification();
          })
          .catch((err) => console.log(err));
        break;
      case 'scholars':
        axios
          .delete(`${url}/scholar/${id}`, options)
          .then(() => {
            callback();
            this.setNotifMessage(`Scholar ID ${id} successfully deleted.`);
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
      username, password, currentTable, showNotif, notifMessage, url,
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
                  url={url}
                  username={username}
                  password={password}
                  onPasswordChange={this.setPassword}
                  onUsernameChange={this.setUsername}
                  onSubmit={this.setCurrentTable}
                  onUrlChange={this.setUrl}
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
                    url={url}
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
                  url={url}
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
                  url={url}
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
              path="/moa"
              render={() => (
                <ViewMOAs
                  url={url}
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
                  url={url}
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
              path="/scholar"
              render={() => (
                <ViewScholars
                  url={url}
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
              path="/document"
              render={() => (
                <ViewDocuments
                  url={url}
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
            <Route exact path="/signup" render={() => <SignUp />} />
            <Route exact path="/manage" render={() => <ManageUsers />} />
            <Route
              exact
              path="/manage/users"
              render={() => (
                <>
                  <Navigation />
                  <UserDashboard url={url} />
                </>
              )}
            />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
