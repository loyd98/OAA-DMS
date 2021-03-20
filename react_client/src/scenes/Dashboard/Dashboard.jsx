import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scoped.css';

import SearchBar from '../../components/SearchBar/SearchBar';
import TableContainer from '../../components/TableContainer/TableContainer';
import axios from 'axios';
import Add from '../Add/Add';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      showAdd: false,
    };
  }

  componentDidMount() {
    this.read();
  }

  componentDidUpdate(prevProps) {
    const { currentTable } = this.props;
    if (prevProps.currentTable !== currentTable) {
      this.read();
    }
  }

  handleShowAdd = (showAdd) => this.setState({ showAdd });

  handleSearch = (event) => {
    event.persist();

    if (!this.debouncedFn) {
      this.debouncedFn = _.debounce(() => {
        let searchString = event.target.value;
        this.fetchSearchData(searchString);
      }, 300);
    }
    this.debouncedFn();
  };

  fetchSearchData = (searchString) => {
    const { currentTable, url } = this.props;
    const token = sessionStorage.getItem('token');
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };

    switch (currentTable) {
      case 'donors':
        axios
          .get(`${url}/donor/search?q=${searchString}`, options)
          .then((res) => this.setState({ data: res.data }))
          .catch((err) => console.log(err));
        break;
      case 'donations':
        axios
          .get(`${url}/donation/search?q=${searchString}`, options)
          .then((res) => this.setState({ data: res.data }))
          .catch((err) => console.log(err));
    }
  };

  read = () => {
    const { currentTable, url } = this.props;
    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };

    switch (currentTable) {
      case 'donors':
        axios
          .get(`${url}/donor/asc`, options)
          .then((res) => this.setState({ data: res.data }))
          .catch((err) => console.log(err));
        break;
      case 'donations':
        axios
          .get(`${url}/donation/asc`, options)
          .then((res) => this.setState({ data: res.data }))
          .catch((err) => console.log(err));
        break;
    }
  };

  render() {
    const { data, showAdd } = this.state;
    const { config, onTabClick, currentTable, url } = this.props;

    return (
      <div className="dashboard flex--vertical">
        {showAdd && (
          <Add
            url={url}
            config={config}
            currentTable={currentTable}
            onCancel={this.handleShowAdd}
            onSubmit={this.read}
          />
        )}
        <SearchBar currentTable={currentTable} onChange={this.handleSearch} />
        <TableContainer
          url={url}
          data={data}
          currentTable={currentTable}
          config={config}
          onTabClick={onTabClick}
          onAddClick={this.handleShowAdd}
          onDelete={this.read}
        />
      </div>
    );
  }
}
