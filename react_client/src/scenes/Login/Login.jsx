import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './Login.scoped.css';

const axios = require('axios');

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showError: false,
    };
    this.nameAutoFocus = true;
  }

  componentDidMount() {
    this.nameAutoFocus = false;
  }

  setShowEror = (showError) => {
    this.setState({ showError });
  }

  handleSubmit = async (e, url, username, password) => {
    e.preventDefault();
    localStorage.setItem('url', url);
    const { history, onSubmit } = this.props;
    const loginUser = async (credentials) => {
      try {
        const resp = await axios.post(`${url}/login`, credentials);
        return resp;
      } catch (err) {
        console.error(err);
        this.setShowEror(true);
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
    const { showError } = this.state;

    const {
      url,
      history,
      username,
      password,
      onPasswordChange,
      onUsernameChange,
      onUrlChange,
    } = this.props;

    return (
      <div className="login">
        <div className="login__container">
          <h1 className="blue">Log-in</h1>
          <form
            id="login__form"
            onSubmit={(e) => {
              this.handleSubmit(e, url, username, password).then((resp) => {
                if (resp) history.push('/dashboard');
              });
            }}
          >
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
            <input
              type="text"
              name="url"
              value={url}
              placeholder="Server Address"
              onChange={(e) => onUrlChange(e.target.value)}
            />
            <button
              type="submit"
              id="login__proceed--btn"
              onClick={(e) => {
                this.handleSubmit(e, url, username, password).then((resp) => {
                  if (resp) history.push('/dashboard');
                });
              }}
            >
              Proceed
            </button>
            <div className={showError ? 'red flex-vertical' : 'red flex-vertical hidden'} id="login__error" style={{ color: 'red' }}>
              Invalid username or password.
            </div>
            <span className="blue" id="createNewUserbtn">
              <Link to="/signup">Create new User</Link>
            </span>
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
  onUrlChange: PropTypes.string.isRequired,
};

export default withRouter(Login);
