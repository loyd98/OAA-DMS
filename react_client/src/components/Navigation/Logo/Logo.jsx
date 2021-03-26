import React, { Component } from 'react';
import './Logo.scoped.css';
import ateneoLogo from './ateneo.png';

export default class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="logo flex--vertical">
        <img src={ateneoLogo} alt="Ateneo Logo" />
        <p>OAA SMS</p>
      </div>
    );
  }
}
