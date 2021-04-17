import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './SearchBar.scoped.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    const sessionUsername = sessionStorage.getItem('username');
    if (!sessionUsername) {
      const { username } = this.props;
      sessionStorage.setItem('username', username);
      this.setState({ username });
    } else {
      this.setState({ username: sessionUsername });
    }
  }

  render() {
    const { username } = this.state;
    const { onChange } = this.props;

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

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};
