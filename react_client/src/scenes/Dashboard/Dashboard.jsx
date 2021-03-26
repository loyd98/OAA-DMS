import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scoped.css';

import _ from 'lodash';
import axios from 'axios';
import SearchBar from '../../components/SearchBar/SearchBar';
import TableContainer from '../../components/TableContainer/TableContainer';
import Add from '../../components/Add/Add';

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
        const searchString = event.target.value;
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
        break;
      default:
        console.log('ERROR in Dashboard.jsx fetchSearchData.');
        break;
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
      default:
        console.log('ERROR in Dashboard.jsx read.');
        break;
    }
  };

  render() {
    const {
      data, showAdd,
    } = this.state;
    const {
      config, onTabClick, currentTable, url, username, onShow, onMessage,
    } = this.props;

    return (
      <div className="dashboard flex--vertical">
        {showAdd && (
          <Add
            url={url}
            config={config}
            currentTable={currentTable}
            onCancel={this.handleShowAdd}
            onSubmit={this.read}
            onShow={onShow}
            onMessage={onMessage}
          />
        )}
        <SearchBar
          username={username}
          currentTable={currentTable}
          onChange={this.handleSearch}
        />
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

Dashboard.propTypes = {
  config: PropTypes.shape({}).isRequired,
  currentTable: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onShow: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired,
};
