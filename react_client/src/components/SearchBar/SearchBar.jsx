import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './SearchBar.scoped.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../Buttons/Button/Button';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      list: ['all'],
      selected: 'all',
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

    const { list } = this.state;
    const { url } = this.props;
    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };
    axios.get(`${url}/donation/years`, options)
      .then((res) => this.setState({ list: [...list, ...res.data] }))
      .catch((err) => console.log(err));
  }

  handleChange = (event) => {
    this.setState({ selected: event.target.value });
  }

  handleSubmit = (selected) => {
    const { url } = this.props;
    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` }, responseType: 'blob' };
    axios.get(`${url}/donation/export/total/${selected}`, options).then((response) => {
      const address = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = address;
      link.setAttribute('download', `${selected}_report.pdf`); // or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }

  render() {
    const { username, list, selected } = this.state;
    const { onChange, currentTable } = this.props;

    return (
      <div className="search flex--horizontal">
        <div className="search__container flex--horizontal">
          <input onChange={(e) => onChange(e)} />
          <button type="button">
            <FontAwesomeIcon icon="search" />
          </button>
        </div>

        <div className="search flex--horizontal">
          {currentTable === 'donations' && (
            <div className="flex--horizontal">
              <select value={selected} onChange={this.handleChange}>
                {list.map((item) => <option value={item} key={item}>{item}</option>)}
              </select>
              <Button onClick={() => this.handleSubmit(selected)} message="Download Report" isTransparent><FontAwesomeIcon icon="download" /></Button>
            </div>
          )}

        </div>

        <div className="username flex--horizontal">
          <FontAwesomeIcon icon="user" />
          <Link to="/manage" style={{ color: 'black' }}><p>{username}</p></Link>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  currentTable: PropTypes.string.isRequired,
};
