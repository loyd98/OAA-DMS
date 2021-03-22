import React, { Component } from 'react';
import './SearchBar.scoped.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';
import axios from 'axios';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { username, onChange } = this.props;

    return (
      <div className="search flex--horizontal">
        <div className="search__container flex--horizontal">
          <input onChange={(e) => onChange(e)} />
          <button type="button">
            <FontAwesomeIcon icon="search" />
          </button>
        </div>
        <div className="username flex--horizontal">
          <FontAwesomeIcon icon="user" />
          <p>{username}</p>
        </div>
      </div>
    );
  }
}
