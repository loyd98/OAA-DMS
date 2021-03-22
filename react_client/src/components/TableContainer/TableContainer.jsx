import PropTypes, { string } from 'prop-types';
import React, { Component } from 'react';
import './TableContainer.scoped.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Buttons/Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import { Redirect, withRouter } from 'react-router';
import Table from '../Table/Table';
import axios from 'axios';
import DeleteModal from '../DeleteModal/DeleteModal';

const config = require('../../data.config');

class TableContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      currentPage: 1,
      numOfPages: 1,
      itemsPerPage: Math.floor((window.innerHeight - 250) / 40),
      showModal: false,
      idToBeDeleted: null,
      inputValue: '',
    };
  }

  componentDidMount() {
    const temp = sessionStorage.getItem('pageDetails');
    const loadedData = JSON.parse(temp);

    if (loadedData) {
      const { currentPage, numOfPages, itemsPerPage } = loadedData;
      this.setState({ currentPage, numOfPages, itemsPerPage });
    } else {
      const height = window.innerHeight;
      const currentPage = 1;
      const itemsPerPage = Math.floor((height - 250) / 40);
      let numOfPages;

      if (this.props.data.length === 0) {
        numOfPages = 1;
      } else {
        numOfPages = Math.ceil(this.props.data.length / itemsPerPage);
      }

      this.setState({ currentPage, itemsPerPage, numOfPages });
      const pageDetails = JSON.stringify({
        currentPage,
        itemsPerPage,
        numOfPages,
      });

      sessionStorage.setItem('pageDetails', pageDetails);
    }
    window.addEventListener('resize', this.updateHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateHeight);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      const height = window.innerHeight;
      const itemsPerPage = Math.floor((height - 250) / 40);
      const numOfPages = Math.ceil(this.props.data.length / itemsPerPage) || 1;
      this.setState({ numOfPages });
    }

    // Go to the nearest number of pages when current page is greater than require number of pages
    const { numOfPages, currentPage } = this.state;
    const { currentTable } = this.props;

    if (prevState.numOfPages !== numOfPages && currentPage > numOfPages) {
      this.setState({ currentPage: numOfPages || 1 });
    }

    if (prevProps.currentTable !== currentTable) {
      this.setState({
        currentDropdownItem: config.dropdowns[currentTable][0].name,
      });
    }
  }

  setShowModal = (showModal) => this.setState({ showModal });

  handleLeftClick = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage > 1 ? prevState.currentPage - 1 : 1,
    }));
  };

  handleRightClick = () => {
    const { numOfPages } = this.state;

    this.setState((prevState) => ({
      currentPage:
        prevState.currentPage < numOfPages
          ? prevState.currentPage + 1
          : numOfPages,
    }));
  };

  sliceItems = (data, itemsPerPage, currentPage) => {
    currentPage--;
    let start = itemsPerPage * currentPage;
    let end = start + itemsPerPage;
    let paginatedItems = data.slice(start, end);
    return paginatedItems;
  };

  updateHeight = () => {
    const { height, currentPage } = this.state;
    const { data } = this.props;

    this.setState({ height: window.innerHeight });

    const itemsPerPage = Math.floor((height - 250) / 40);
    const numOfPages = Math.ceil(data.length / itemsPerPage);
    if (itemsPerPage > 0) {
      this.setState({ currentPage, itemsPerPage, numOfPages });
    }
  };

  handleDelete = (id) => {
    this.setState({ idToBeDeleted: id });
    this.setState({ showModal: true });
  };

  handleRedirect = (id) => {
    const { currentTable, history } = this.props;

    switch (currentTable) {
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

  render() {
    const {
      currentPage,
      numOfPages,
      itemsPerPage,
      showModal,
      idToBeDeleted,
    } = this.state;
    const { config, data, onTabClick, onAddClick, url, onDelete } = this.props;

    if (!data) {
      return <div>Loading ...</div>;
    } else {
      const currentTable = sessionStorage.getItem('currentTable');
      const tables = config.tables;
      const fields = config.ordering[currentTable];
      const items = this.sliceItems(data, itemsPerPage, currentPage);

      // const dropdownItems = config.dropdowns[currentTable];

      return (
        <React.Fragment>
          {showModal && (
            <DeleteModal
              title="Delete entry?"
              message={`Do you really want to delete this entry with ID ${idToBeDeleted}.`}
              deleteConfirmation={`Type "${idToBeDeleted}" to confirm.`}
              leftBtnName="Cancel"
              rightBtnName="Delete"
              onClose={this.setShowModal}
              idToBeDeleted={idToBeDeleted}
              currentTable={currentTable}
              url={url}
              onDelete={onDelete}
            />
          )}
          <table className="table">
            <thead id="table__top">
              <tr className="table__topRow flex--horizontal">
                <td className="flex--horizontal">
                  <div className="table__flags flex--horizontal">
                    {tables.map((table) => {
                      if (table.toLowerCase() === currentTable) {
                        return (
                          <div
                            data-id={table}
                            key={table}
                            className="table__flag flex--horizontal flag--active"
                          >
                            <span>{table}</span>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            data-id={table}
                            key={table}
                            className="table__flag flex--horizontal"
                            onClick={(e) => {
                              onTabClick(
                                e.currentTarget.dataset.id.toLowerCase(),
                              );
                            }}
                          >
                            <span>{table}</span>
                          </div>
                        );
                      }
                    })}
                  </div>
                </td>
                <td className="table__pagination flex--horizontal">
                  <Button isTransparent onClick={this.handleLeftClick}>
                    <FontAwesomeIcon icon="arrow-left" />
                  </Button>
                  <span>
                    <sup>{currentPage}</sup>&frasl;<sub>{numOfPages}</sub>
                  </span>
                  <Button isTransparent onClick={this.handleRightClick}>
                    <FontAwesomeIcon icon="arrow-right" />
                  </Button>
                </td>
              </tr>
            </thead>
            <thead id="table__middle" className="flex--horizontal">
              <tr>
                <td className="flex--horizontal">
                  <div className="flex--horizontal">
                    <Button isTransparent message="Import" type="left">
                      <FontAwesomeIcon icon="file-upload" />
                    </Button>
                    <Button isTransparent message="Export" type="left">
                      <FontAwesomeIcon icon="file-download" />
                    </Button>
                    {/* <Dropdown
                    title="Dropdown"
                    list={dropdownItems.map((i) => i.name)}
                  /> */}
                    <Button isTransparent message="Sort" type="center">
                      <FontAwesomeIcon icon="sort" />
                    </Button>
                  </div>
                  <div className="flex--horizontal">
                    <Button
                      isTransparent
                      message="Add Entry"
                      type="right"
                      onClick={() => onAddClick(true)}
                    >
                      <FontAwesomeIcon icon="plus" />
                    </Button>
                  </div>
                </td>
              </tr>
            </thead>
            <Table
              fields={fields}
              items={items}
              redirectToView={(id) => this.handleRedirect(id)}
              colLimit={7}
              handleDelete={this.handleDelete}
            />
          </table>
        </React.Fragment>
      );
    }
  }
}

export default withRouter(TableContainer);
