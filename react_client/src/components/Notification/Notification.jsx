import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Notification.scoped.css';

class Notification extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // const { show } = this.state;
    const { children, showNotif } = this.props;

    const onEntryExit = () => {
      if (showNotif === true) {
        return 'notification alert-enter';
      } if (showNotif === false) {
        return 'notification alert-exit';
      }

      return 'notification hidden';
    };

    return (
      <div className={onEntryExit(showNotif)}>
        {' '}
        {children}
      </div>
    );
  }
}

Notification.propTypes = {
  children: PropTypes.string,
  showNotif: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

Notification.defaultProps = {
  children: '',
};

export default Notification;
