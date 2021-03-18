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
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { handleEditForm, currentView } = this.props;
    if (prevProps.currentView !== this.props.currentView) {
      handleEditForm(currentView);
    }
  }

  handleCancel = () => {
    const { handleEditForm, currentView } = this.props;
    this.handleIsEditing(false);
    handleEditForm(currentView);
  };

  handleReturn = () => {
    const { history } = this.props;
    history.push('/dashboard');
  };

  handleSubmit = () => {
    const { handleUpdate } = this.props;
    handleUpdate();
    this.handleIsEditing(false);
  };

  handleIsEditing = (isEditing) => this.setState({ isEditing });

  render() {
    console.log('view render');
    const { isEditing } = this.state;
    const { config, currentTable, editForm, handleEditFormField } = this.props;

    if (!editForm || !currentTable) return <div>Loading...</div>;

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
        {/* {showModal && (
          <Modal
            title="Discard your changes?"
            message="The changes in the form have not been submitted yet. Would you like to discard them and return to the Dashboard page, or cancel and return to the form?"
            leftBtnName="Cancel"
            rightBtnName="Discard"
            exitOnClick={() => this.setShowModal(false)}
            leftBtnOnClick={() => this.setShowModal(false)}
            rightBtnOnClick={this.handleDiscardClick}
          />
        )} */}
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
                <p>Table</p>
                <Button
                  isTransparent
                  message={`Add ${currentTable}`}
                  type="right"
                  onClick={() => this.handleShowAdd(true)}
                >
                  <FontAwesomeIcon icon="plus" />
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
            {/* <Table
              fields={config.ordering[currentTable]}
              items={dataInView}
              colLimit={5}
              handleDelete={console.log}
            /> */}
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(View);
