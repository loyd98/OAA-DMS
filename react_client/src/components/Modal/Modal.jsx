import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import './Modal.scoped.css';

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      title,
      message,
      leftBtnName,
      rightBtnName,
      exitOnClick,
      leftBtnOnClick,
      rightBtnOnClick,
    } = this.props;

    return (
      <div className="modal__background">
        <div className="modal flex--vertical">
          <div className="modal__exit">
            <FontAwesomeIcon icon="times" onClick={exitOnClick} />
          </div>
          <div className="modal__icon">
            <FontAwesomeIcon icon="exclamation" size="3x" />
          </div>
          <p className="modal__title">{title}</p>
          <p className="modal__message">{message}</p>
          <div className="modal__btnContainer flex--horizontal">
            <button type="button" onClick={leftBtnOnClick}>{leftBtnName}</button>
            <button type="button" onClick={rightBtnOnClick}>{rightBtnName}</button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  exitOnClick: PropTypes.func.isRequired,
  leftBtnName: PropTypes.string.isRequired,
  leftBtnOnClick: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  rightBtnName: PropTypes.string.isRequired,
  rightBtnOnClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
