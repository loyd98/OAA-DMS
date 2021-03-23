import React, { Component } from 'react';
import './Notification.scoped.css';

class Notification extends Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
    this.state = {
      show: 'none',
    };
  }

  componentDidMount() {
    console.log('hi');
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  //

  render() {
    // const { show } = this.state;
    const { children, showNotif } = this.props;

    const onEntryExit = (showNotif) => {
      if (showNotif === true) {
        return 'notification alert-enter';
      } else if (showNotif === false) {
        return 'notification alert-exit';
      } else if (showNotif === 'none') {
        return 'notification hidden';
      }
    };

    return <div className={onEntryExit(showNotif)}> {children}</div>;
  }
}

export default Notification;
