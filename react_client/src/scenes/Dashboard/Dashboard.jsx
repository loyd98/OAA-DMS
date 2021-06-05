import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scoped.css';

import _ from 'lodash';
import axios from 'axios';
import SearchBar from '../../components/SearchBar/SearchBar';
import TableContainer from '../../components/TableContainer/TableContainer';
import Add from '../../components/Add/Add';
import ImportModal from '../../components/ImportModal/ImportModal';
import ExportModal from '../../components/ExportModal/ExportModal';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      showAdd: false,
      isAsc: true,
      showImport: false,
      showExport: false,
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

  handleShowImport = (showImport) => this.setState({ showImport });

  handleShowExport = (showExport) => this.setState({ showExport });

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

  handleSort = () => {
    const { isAsc } = this.state;
    const { currentTable, url } = this.props;
    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };

    if (isAsc) {
      axios
        .get(`${url}/${currentTable.slice(0, -1)}/desc`, options)
        .then((res) => {
          this.setState({ data: res.data, isAsc: !isAsc });
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`${url}/${currentTable.slice(0, -1)}/asc`, options)
        .then((res) => {
          this.setState({ data: res.data, isAsc: !isAsc });
        })
        .catch((err) => console.log(err));
    }
  }

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
      case 'moas':
        axios
          .get(`${url}/moa/search?q=${searchString}`, options)
          .then((res) => this.setState({ data: res.data }))
          .catch((err) => console.log(err));
        break;
      case 'scholarships':
        axios
          .get(`${url}/scholarship/search?q=${searchString}`, options)
          .then((res) => this.setState({ data: res.data }))
          .catch((err) => console.log(err));
        break;
      case 'scholars':
        axios
          .get(`${url}/scholar/search?q=${searchString}`, options)
          .then((res) => this.setState({ data: res.data }))
          .catch((err) => console.log(err));
        break;
      case 'connections':
        axios
          .get(`${url}/connection/search?q=${searchString}`, options)
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
      case 'moas':
        axios
          .get(`${url}/moa/asc`, options)
          .then((res) => this.setState({ data: res.data }))
          .catch((err) => console.log(err));
        break;
      case 'scholarships':
        axios
          .get(`${url}/scholarship/asc`, options)
          .then((res) => this.setState({ data: res.data }))
          .catch((err) => console.log(err));
        break;
      case 'scholars':
        axios
          .get(`${url}/scholar/asc`, options)
          .then((res) => this.setState({ data: res.data }))
          .catch((err) => console.log(err));
        break;
      case 'connections':
        axios
          .get(`${url}/connection/asc`, options)
          .then((res) => this.setState({ data: res.data }))
          .catch((err) => console.log(err));
        break;
      case 'documents':
        axios
          .get(`${url}/document/asc`, options)
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
      data, showAdd, showImport, showExport,
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
        {showImport && (
          <ImportModal url={url} onCancel={this.handleShowImport} onSubmit={this.read} />
        )}
        {showExport && (
          <ExportModal url={url} onCancel={this.handleShowExport} />
        )}
        <SearchBar
          username={username}
          currentTable={currentTable}
          onChange={this.handleSearch}
          url={url}
        />
        <TableContainer
          url={url}
          data={data}
          currentTable={currentTable}
          config={config}
          onTabClick={onTabClick}
          onAddClick={this.handleShowAdd}
          onDelete={this.read}
          onSort={this.handleSort}
          onImport={this.handleShowImport}
          onExport={this.handleShowExport}
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
