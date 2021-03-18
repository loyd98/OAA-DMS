import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Dashboard.scoped.css';

import SearchBar from '../../components/SearchBar/SearchBar';
import TableContainer from '../../components/TableContainer/TableContainer';

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
      handleShowAdd,
      handleCurrentId,
      handleDelete,
      handleCurrentView,
      handleReadIndividual,
      handleSearchQuery,
      username,
      searchQuery,
      handleDoSearch,
      handleTabClick,
      handleReadInnerTable,
    } = this.props;

    return (
      <div className="dashboard flex--vertical">
        <SearchBar
          username={username}
          searchQuery={searchQuery}
          handleSearchQuery={handleSearchQuery}
          handleDoSearch={handleDoSearch}
        />
        <TableContainer
          config={config}
          currentData={currentData}
          currentTable={currentTable}
          handleRead={handleRead}
          handleCurrentData={handleCurrentData}
          handleShowAdd={handleShowAdd}
          handleCurrentId={handleCurrentId}
          handleDelete={handleDelete}
          handleCurrentView={handleCurrentView}
          handleReadIndividual={handleReadIndividual}
          handleTabClick={handleTabClick}
          handleReadInnerTable={handleReadInnerTable}
        />
      </div>
    );
  }
}
