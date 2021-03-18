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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentData: [],
      currentTable: '',
      currentView: [],
      username: '',
      password: '',
      config,
      showAdd: false,
      currentId: null,
      addForm: {},
      editForm: {},
    };
    this.url = config.URL;
  }

  componentDidMount() {
    console.log('APP');
    const currentTable = sessionStorage.getItem('currentTable');
    console.log(currentTable);
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

  handleUsername = (username) => this.setState({ username });
  handlePassword = (password) => this.setState({ password });
  handleCurrentTable = (currentTable) => this.setState({ currentTable });
  handleCurrentData = (currentData) => this.setState({ currentData });
  handleShowAdd = (showAdd) => this.setState({ showAdd });
  handleCurrentId = (currentId) => this.setState({ currentId });
  handleEditForm = (editForm) => this.setState({ editForm });

  handleCurrentView = async (url, path) => {
    try {
      const token = sessionStorage.getItem('token');
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.get(`${url}${path}`, options);
      this.setState({ currentView: res.data });
      return true;
    } catch (err) {
      console.log(err);
    }

    return false;
  };

  // Create
  handleAddFormField = (name, value) => {
    this.setState((prevState) => ({
      addForm: {
        ...prevState.addForm,
        [name]: value,
      },
    }));
  };

  handleAddFormSubmit = async () => {
    const { addForm } = this.state;
    const currentTable = sessionStorage.getItem('currentTable');
    const token = sessionStorage.getItem('token');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    if (currentTable === 'donors') {
      try {
        const res = await axios.post(`${this.url}/donor/add`, addForm, options);
        this.handleRead(this.url, '/donor/asc');
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  };

  // Read
  handleRead = async () => {
    const currentTable = sessionStorage.getItem('currentTable');

    if (currentTable === 'donors') {
      try {
        const token = sessionStorage.getItem('token');
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const res = await axios.get(`${this.url}/donor/asc`, options);
        console.log('fetch');
        this.setState({ currentData: res.data });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  };

  handleReadIndividual = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.get(`${this.url}/donor/${id}`, options);
      console.log('fetch');
      this.setState({ currentView: res.data });
      this.setState({ editForm: res.data });
      return true;
    } catch (err) {
      console.log(err);
    }

    return false;
  };

  // Update
  handleEditFormField = (name, value) => {
    this.setState((prevProps) => ({
      editForm: {
        ...prevProps.editForm,
        [name]: value,
      },
    }));

    console.log(this.state.editForm);
  };

  handleUpdate = () => {
    const { editForm } = this.state;
    const token = sessionStorage.getItem('token');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    axios
      .patch(`${this.url}/donor/update`, editForm, options)
      .then((res) => {
        this.handleRead();
        this.handleReadIndividual(this.state.currentId);
      })
      .catch((err) => console.log(err));
  };

  // delete
  handleDelete = (id) => {
    const token = sessionStorage.getItem('token');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${this.url}/donor/${id}`, options)
      .then((res) => this.handleRead(this.url, '/donor/asc'))
      .catch((err) => console.log(err));
  };

  render() {
    const {
      username,
      password,
      currentData,
      currentTable,
      showAdd,
      currentId,
      currentView,
      editForm,
    } = this.state;

    return (
      <div className="App">
        <HashRouter>
          {showAdd && (
            <Add
              config={config}
              handleAddFormField={this.handleAddFormField}
              handleShowAdd={this.handleShowAdd}
              currentTable={currentTable}
              handleAddFormSubmit={this.handleAddFormSubmit}
            />
          )}
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Login
                  url={this.url}
                  username={username}
                  password={password}
                  handleCurrentData={this.handleCurrentData}
                  handleCurrentTable={this.handleCurrentTable}
                  handleUsername={this.handleUsername}
                  handlePassword={this.handlePassword}
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
                      config={config}
                      currentData={currentData}
                      currentTable={currentTable}
                      handleRead={this.handleRead}
                      handleDelete={this.handleDelete}
                      handleCurrentData={this.handleCurrentData}
                      handleShowAdd={this.handleShowAdd}
                      handleCurrentId={this.handleCurrentId}
                      handleReadIndividual={this.handleReadIndividual}
                    />
                  </>
                </>
              )}
            />
            <Route
              exact
              path-="view/1?id=:id"
              render={() => (
                <View
                  currentTable={currentTable}
                  currentId={currentId}
                  handleRead={this.handleRead}
                  config={config}
                  currentView={currentView}
                  handleCurrentView={this.handleCurrentView}
                  editForm={editForm}
                  handleEditFormField={this.handleEditFormField}
                  handleEditForm={this.handleEditForm}
                  handleUpdate={this.handleUpdate}
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
