import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Button.scoped.css';

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.state = { isClicked: false, isHidden: true };
  }

  toggleBtnActive = () => {
    const { isClicked } = this.state;

    this.setState({ isClicked: !isClicked });
  };

  hideCaption = () => {
    this.setState({ isHidden: true });
  };

  unhideCaption = () => {
    this.setState({ isHidden: false });
  };

  render() {
    const { isClicked, isHidden } = this.state;
    const {
      children, isTransparent, message, type, onClick, id,
    } = this.props;
    const transparent = isTransparent ?
      'button flex--vertical transparent'
      : 'button flex--vertical';
    const clicked = isClicked ? 'btn--active' : '';

    let hidden;
    if (!message) {
      hidden = 'hidden';
    } else if (isHidden) {
      hidden = 'hidden';
    } else {
      hidden = '';
    }

    let position;
    if (type === 'center') {
      position = '';
    } else if (type === 'left') {
      position = 'caption__left';
    } else if (type === 'right') {
      position = 'caption__right';
    }

    return (
      <>
        <button
          data-id={id}
          type="button"
          className={`${transparent} ${clicked}`}
          onMouseDown={this.toggleBtnActive}
          onMouseUp={this.toggleBtnActive}
          onMouseEnter={this.unhideCaption}
          onMouseLeave={this.hideCaption}
          onClick={onClick}
        >
          {children}
          <div
            data-id={id}
            className={`caption flex--vertical ${hidden} ${position}`}
          >
            <span data-id={id} className="triangle">
              ab
            </span>
            <div data-id={id} className="caption__content flex--horizontal">
              {message}
            </div>
          </div>
        </button>
      </>
    );
  }
}

Button.propTypes = {
  children: PropTypes.shape({}),
  id: PropTypes.number.isRequired,
  isTransparent: PropTypes.bool.isRequired,
  message: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};

Button.defaultProps = {
  children: '',
  message: '',
  type: 'center',
};
