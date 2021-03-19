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
      currentData: [],
      currentTable: '',
      currentView: [],
      innerTable: [],
      currentInnerTable: '',
      username: '',
      password: '',
      config,
      showAdd: false,
      currentId: null,
      addForm: {},
      editForm: {},
      searchQuery: '',
      searchTimeout: 0,
    };
    this.url = config.URL;
  }

  componentDidMount() {
    const currentTable = sessionStorage.getItem('currentTable');
    console.log(currentTable);
    if (currentTable) {
      this.setState({ currentTable });
    }

    const currentData = JSON.parse(sessionStorage.getItem('currentData'));
    if (currentData) {
      this.setState({ currentData });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentTable, currentData } = this.state;
    if (prevState.currentTable !== currentTable) {
      console.log('CURRENT TABLE CHANGED');
      sessionStorage.setItem('currentTable', currentTable);
    }

    if (prevState.currentData !== currentData) {
      console.log('CURRENT DATA CHANGED');
      const temp = JSON.stringify(currentData);
      sessionStorage.setItem('currentData', temp);
    }
  }

  handleUsername = (username) => this.setState({ username });
  handlePassword = (password) => this.setState({ password });
  handleCurrentData = (currentData) => this.setState({ currentData });
  handleShowAdd = (showAdd) => this.setState({ showAdd });
  handleCurrentId = (currentId) => this.setState({ currentId });
  handleEditForm = (editForm) => this.setState({ editForm });
  handleSearchQuery = (searchQuery) => this.setState({ searchQuery });
  handleCurrentInnerTable = (currentInnerTable) =>
    this.setState({ currentInnerTable });

  handleCurrentTable = (currentTable) => {
    this.setState({ currentTable });
  };

  handleDoSearch = debounce((e) => {
    const token = sessionStorage.getItem('token');
    const { searchQuery } = this.state;
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    if (currentTable === 'donors') {
      axios
        .get(`${this.url}/donor/search?q=${searchQuery}`, options)
        .then((res) => this.setState({ currentData: res.data }))
        .catch((err) => console.log(err));
    }
  }, 500);

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
    console.log(this.state.addForm);
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

    if (currentTable === 'donations') {
      try {
        const res = await axios.post(
          `${this.url}/donation/add`,
          addForm,
          options,
        );
        this.handleRead(this.url, '/donation/asc');
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }

    this.setState({ addForm: {} });
  };

  handleInnerSubmit = async (table) => {
    const { addForm } = this.state;
    const token = sessionStorage.getItem('token');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    if (table === 'donors') {
      try {
        const res = await axios.post(`${this.url}/donor/add`, addForm, options);
        this.handleRead(this.url, '/donor/asc');
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }

    if (table === 'donations') {
      try {
        const res = await axios.post(
          `${this.url}/donation/add`,
          addForm,
          options,
        );
        this.handleRead(this.url, '/donation/asc');
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }

    this.setState({ addForm: {} });
  };

  handleTabClick = (e) => {
    const currentTable = e.currentTarget.dataset.id.toLowerCase();

    this.setState({ currentTable }, this.handleRead);
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

    if (currentTable === 'donations') {
      try {
        const token = sessionStorage.getItem('token');
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const res = await axios.get(`${this.url}/donation/asc`, options);
        console.log('fetch');
        this.setState({ currentData: res.data });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  };

  handleReadInnerTable = async (id) => {
    const { currentTable } = this.state;

    if (currentTable === 'donations') {
      try {
        const token = sessionStorage.getItem('token');
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        // load all donors connected to donation
        const res = await axios.get(
          `${this.url}/donation/donors/${id}`,
          options,
        );
        console.log('fetch');
        this.setState({ innerTable: res.data });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }

    if (currentTable === 'donors') {
      try {
        const token = sessionStorage.getItem('token');
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const res = await axios.get(
          `${this.url}/donor/donations/${id}`,
          options,
        );
        console.log('fetch');
        this.setState({ innerTable: res.data });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  };

  handleReadIndividual = async (id) => {
    const { currentTable } = this.state;

    if (currentTable === 'donors') {
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
        return false;
      }
    }

    if (currentTable === 'donations') {
      console.log('REACHED DONATIONS');
      try {
        const token = sessionStorage.getItem('token');
        const options = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };

        const res = await axios.get(`${this.url}/donation/${id}`, options);
        console.log('fetch');
        this.setState({ currentView: res.data });
        this.setState({ editForm: res.data });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    }
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

  handleInnerDelete = (table, id) => {
    if (table === 'donors') {
    }

    if (table === 'donations') {
    }
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
      searchQuery,
      currentInnerTable,
      innerTable,
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
                  handleCurrentInnerTable={this.handleCurrentInnerTable}
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
                      searchQuery={searchQuery}
                      config={config}
                      currentData={currentData}
                      currentTable={currentTable}
                      handleRead={this.handleRead}
                      handleDelete={this.handleDelete}
                      handleCurrentData={this.handleCurrentData}
                      handleShowAdd={this.handleShowAdd}
                      handleCurrentId={this.handleCurrentId}
                      handleReadIndividual={this.handleReadIndividual}
                      handleSearchQuery={this.handleSearchQuery}
                      handleDoSearch={this.handleDoSearch}
                      handleTabClick={this.handleTabClick}
                      handleReadInnerTable={this.handleReadInnerTable}
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
                  currentInnerTable={currentInnerTable}
                  innerTable={innerTable}
                  handleCurrentTable={this.handleCurrentTable}
                  handleCurrentId={this.handleCurrentId}
                  handleReadInnerTable={this.handleReadInnerTable}
                  handleReadIndividual={this.handleReadIndividual}
                  handleInnerSubmit={this.handleInnerSubmit}
                  handleAddFormField={this.handleAddFormField}
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
