import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { Component } from 'react';
import './DeleteModal.scoped.css';

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };
  }

  handleModalDelete = () => {
    const { input } = this.state;
    const { onClose, idToBeDeleted } = this.props;

    if (idToBeDeleted == input) {
      this.delete(idToBeDeleted);
      onClose(false);
    }
  };

  handleModalCancel = () => {
    const { onClose } = this.props;

    onClose(false);
    this.setState({ input: '' });
  };

  delete(id) {
    const { currentTable, onDelete, url } = this.props;
    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };

    switch (currentTable) {
      case 'donors':
        axios
          .delete(`${url}/donor/${id}`, options)
          .then((res) => onDelete())
          .catch((err) => console.log(err));
        break;
      case 'donations':
        axios
          .delete(`${url}/donation/${id}`, options)
          .then((res) => onDelete())
          .catch((err) => console.log(err));
        break;
    }
  }

  render() {
    const { input } = this.state;

    const {
      title,
      message,
      leftBtnName,
      rightBtnName,
      deleteConfirmation,
    } = this.props;

    return (
      <div className="modal__background">
        <div className="deleteModal modal flex--vertical">
          <div className="modal__exit" onClick={this.handleModalCancel}>
            <FontAwesomeIcon icon="times" />
          </div>
          <div className="modal__icon">
            <FontAwesomeIcon icon="exclamation" size="3x" />
          </div>
          <p className="modal__title">{title}</p>
          <p className="modal__message">{message}</p>
          <p className="modal__message">{deleteConfirmation}</p>
          <input
            type="text"
            value={input}
            onChange={(e) => this.setState({ input: e.target.value })}
          />
          <div className="modal__btnContainer flex--horizontal">
            <button onClick={this.handleModalCancel}>{leftBtnName}</button>
            <button onClick={this.handleModalDelete}>{rightBtnName}</button>
          </div>
        </div>
      </div>
    );
  }
}
