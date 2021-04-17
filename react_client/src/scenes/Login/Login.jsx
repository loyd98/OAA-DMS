import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './Login.scoped.css';

const axios = require('axios');

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.nameAutoFocus = true;
  }

  componentDidMount() {
    this.nameAutoFocus = false;
  }

  handleSubmit = async (e, url, username, password) => {
    e.preventDefault();
    const { history, onSubmit } = this.props;
    const loginUser = async (credentials) => {
      try {
        const resp = await axios.post(`${url}/login`, credentials);
        return resp;
      } catch (err) {
        console.error(err);
      }

      return null;
    };

    const token = await loginUser({
      username,
      password,
    });

    if (token) {
      sessionStorage.setItem('token', token.data);
      onSubmit('donors');
      history.push('/dashboard');
    }

    return false;
  };

  render() {
    const {
      url,
      history,
      username,
      password,
      onPasswordChange,
      onUsernameChange,
    } = this.props;

    return (
      <div className="login">
        <div className="login__container">
          <h1 className="blue">Log-in</h1>
          <form id="login__form">
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={(e) => onUsernameChange(e.target.value)}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => onPasswordChange(e.target.value)}
            />
            <button
              type="button"
              id="login__proceed--btn"
              onClick={(e) => {
                this.handleSubmit(e, url, username, password).then((resp) => {
                  if (resp) history.push('/dashboard');
                });
              }}
            >
              Proceed
            </button>
            <div className="red flex-vertical hidden" id="login__error">
              Invalid username or password.
            </div>
            <span className="blue" id="createNewUserbtn">
              <Link to="/signup">Create new User</Link>
            </span>
            <span className="blue">Forgot Password?</span>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default withRouter(Login);
