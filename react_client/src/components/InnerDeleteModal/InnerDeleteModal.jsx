import PropTypes from 'prop-types';
import axios from 'axios';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

    if (idToBeDeleted === parseInt(input, 10)) {
      this.delete(idToBeDeleted);
      onClose(false);
    }
  };

  handleModalCancel = () => {
    const { onClose } = this.props;
    onClose(false);
  };

  async setNotif(onMessage, onShow, message) {
    await onMessage(message);
    onShow(true);
    await this.delay(3000);
    onShow(false);
    await this.delay(1000);
    onShow('none');
  }

  delay = (ms) => new Promise((res) => setTimeout(res, ms));

  delete = async (id) => {
    const {
      currentTable: innerTable,
      url,
      onRead,
      onShow,
      onMessage,
    } = this.props;
    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };

    if (innerTable === 'donors') {
      try {
        await axios.delete(`${url}/donor/${id}`, options);
        onRead();
        await this.setNotif(
          onMessage,
          onShow,
          `Sucessfully deleted donor ID ${id}.`,
        );
      } catch (err) {
        await this.setNotif(onMessage, onShow, err.status);
      }
    } else if (innerTable === 'donations') {
      try {
        await axios.delete(`${url}/donation/${id}`, options);
        onRead();
        await this.setNotif(
          onMessage,
          onShow,
          `Sucessfully deleted donation ID ${id}.`,
        );
      } catch (err) {
        await this.setNotif(onMessage, onShow, err.status);
      }
    }
  };

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
          <div className="modal__exit">
            <FontAwesomeIcon icon="times" onClick={this.handleModalCancel} />
          </div>
          <div className="modal__icon">
            <FontAwesomeIcon icon="trash" size="3x" />
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
            <button type="button" onClick={this.handleModalCancel}>{leftBtnName}</button>
            <button type="button" onClick={this.handleModalDelete}>{rightBtnName}</button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  currentTable: PropTypes.string.isRequired,
  deleteConfirmation: PropTypes.string.isRequired,
  idToBeDeleted: PropTypes.number.isRequired,
  leftBtnName: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired,
  onRead: PropTypes.func.isRequired,
  onShow: PropTypes.func.isRequired,
  rightBtnName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
