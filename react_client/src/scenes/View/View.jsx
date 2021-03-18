import React, { Component } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import './View.scoped.css';

import Button from '../../components/Buttons/Button/Button';
import Table from '../../components/Table/Table';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';
import Modal from '../../components/Modal/Modal';
import Add from '../Add/Add';

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      showModal: false,
      index: 0,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { handleEditForm, currentView } = this.props;
    if (prevProps.currentView !== this.props.currentView) {
      handleEditForm(currentView);
    }
  }

  handleShowModal = (showModal) => this.setState({ showModal });

  handleCancel = () => {
    const { handleEditForm, currentView } = this.props;
    this.handleIsEditing(false);
    handleEditForm(currentView);
  };

  handleReturn = () => {
    const { isEditing } = this.state;
    const { history } = this.props;

    if (isEditing) {
      this.handleShowModal(true);
    } else {
      history.push('/dashboard');
    }
  };

  handleSubmit = () => {
    const { handleUpdate } = this.props;
    handleUpdate();
    this.handleIsEditing(false);
  };

  handleDiscard = () => {
    console.log('hit');
    const { history } = this.props;
    this.handleIsEditing(false);
    this.handleShowModal(false);
    history.push('/dashboard');
  };

  handleIsEditing = (isEditing) => this.setState({ isEditing });

  handleIndexInc = () => {
    const { config, currentTable } = this.props;

    const end = config.innerTables[currentTable].length;

    this.setState((prevState) => ({
      index: prevState.index < end - 1 ? prevState.index + 1 : end - 1,
    }));
  };

  handleIndexDec = () => {
    this.setState((prevState) => ({
      index: prevState.index > 0 ? prevState.index - 1 : 0,
    }));
  };

  handleRedirect = (id) => {
    const { index } = this.state;
    const {
      history,
      handleReadIndividual,
      handleCurrentId,
      handleReadInnerTable,
      handleCurrentTable,
      currentTable,
      config,
    } = this.props;
    handleCurrentId(id);
    handleCurrentTable(config.innerTables[currentTable][index]).then((res) =>
      handleReadInnerTable(id).then((res) =>
        handleReadIndividual(id).then((res) => history.push('/view')),
      ),
    );
  };

  render() {
    console.log('view render');
    const { isEditing, showModal, index } = this.state;
    const {
      config,
      currentTable,
      editForm,
      handleEditFormField,
      currentInnerTable,
      innerTable,
    } = this.props;

    let button;
    let inputs;

    inputs = config.ordering[currentTable].map((key) => (
      <div key={key.key} className="view__detailContainer">
        <div className="view__detailTitle">{key.name}</div>
        <input
          disabled={!isEditing}
          name={key.key}
          type="text"
          value={editForm[key.key] == null ? '' : editForm[key.key]}
          onChange={(e) => handleEditFormField(e.target.name, e.target.value)}
        />
      </div>
    ));

    if (!isEditing) {
      button = (
        <Button
          isTransparent
          message="Edit"
          type="right"
          onClick={() => this.handleIsEditing(true)}
        >
          <FontAwesomeIcon icon="edit" />
        </Button>
      );
    } else {
      button = (
        <div className="flex--horizontal">
          <Button
            isTransparent
            message="Submit"
            type="rigth"
            onClick={this.handleSubmit}
          >
            <FontAwesomeIcon icon="share-square" />
          </Button>
          <Button
            isTransparent
            message="Cancel"
            type="right"
            onClick={this.handleCancel}
          >
            <FontAwesomeIcon icon="times" />
          </Button>
        </div>
      );
    }

    const tableTitle =
      config.innerTables[currentTable][index][0].toUpperCase() +
      config.innerTables[currentTable][index].slice(1);

    return (
      <>
        {/* {showAdd && (
          <Add
            currentTable={tableInView}
            setShowAdd={this.handleShowAdd}
            // setAddFormField,
            config={config}
            handleAddFormSubmit={handleAddFormSubmit}
          />
        )} */}
        {showModal && (
          <Modal
            title="Discard your changes?"
            message="The changes in the form have not been submitted yet. Would you like to discard them and return to the Dashboard page?"
            leftBtnName="Cancel"
            rightBtnName="Discard"
            exitOnClick={() => this.handleShowModal(false)}
            leftBtnOnClick={() => this.handleShowModal(false)}
            rightBtnOnClick={this.handleDiscard}
          />
        )}
        <Navigation />
        <div className="view flex--horizontal">
          <div className="view__left">
            <div className="view__titlebar flex--horizontal">
              <p>Details</p>
              {button}
            </div>
            <form className="view__details">{inputs}</form>
          </div>
          <div className="view__right">
            <div className="view__titlebar flex--horizontal">
              <div className="flex--horizontal">
                <p>{tableTitle}</p>
                <Button
                  isTransparent
                  message={`Add ${config.innerTables[currentTable][index]}`}
                  type="right"
                  onClick={() => this.handleShowAdd(true)}
                >
                  <FontAwesomeIcon icon="plus" />
                </Button>
                <Button
                  isTransparent
                  message={`Prev table`}
                  type="right"
                  onClick={this.handleIndexDec}
                >
                  <FontAwesomeIcon icon="arrow-left" />
                </Button>
                <Button
                  isTransparent
                  message={`Next table`}
                  type="right"
                  onClick={this.handleIndexInc}
                >
                  <FontAwesomeIcon icon="arrow-right" />
                </Button>
              </div>

              <Button
                isTransparent
                message="Return to Dashboard"
                type="right"
                onClick={this.handleReturn}
              >
                <FontAwesomeIcon icon="arrow-left" />
              </Button>
            </div>
            <table>
              <Table
                fields={
                  config.ordering[config.innerTables[currentTable][index]]
                }
                items={innerTable}
                colLimit={6}
                handleDelete={console.log}
                redirectToView={this.handleRedirect}
              />
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(View);
