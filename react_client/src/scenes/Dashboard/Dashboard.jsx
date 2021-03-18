import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scoped.css';

import SearchBar from '../../components/SearchBar/SearchBar';
import TableContainer from '../../components/TableContainer/TableContainer';

const axios = require('axios');

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      config,
      currentTable,
      currentData,
      handleRead,
      handleCurrentData,
    } = this.props;

    return (
      <div className="dashboard flex--vertical">
        <SearchBar />
        <TableContainer
          config={config}
          currentData={currentData}
          currentTable={currentTable}
          handleRead={handleRead}
          handleCurrentData={handleCurrentData}
        />
      </div>
    );
  }
}
