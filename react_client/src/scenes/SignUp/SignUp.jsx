import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SignUp.scoped.css';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';
import Button from '../../components/Buttons/Button/Button';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      nickname: '',
      password: '',
      url: '',
      confirmPassword: '',
    };
  }

  setNickname = (nickname) => {
    this.setState({ nickname });
  }

  setPassword = (password) => {
    this.setState({ password });
  }

  setConfirmPassword = (confirmPassword) => {
    this.setState({ confirmPassword });
  }

  setUrl = (url) => {
    this.setState({ url });
  }

  handleBack = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleSubmit = () => {
    const {
      nickname, password, confirmPassword, url,
    } = this.state;
    const { history } = this.props;

    if (password !== confirmPassword) {
      this.setState({ showError: true });
    } else {
      const payload = { username: nickname, password };
      axios.post(`${url}/register`, payload).then(() => history.push('/'));
    }
  }

  render() {
    const {
      showError, nickname, password, confirmPassword, url,
    } = this.state;

    return (
      <div className="signup">
        <div className="signup__container">
          <div className="signup__title">
            <h1>Sign up</h1>
            <Button
              isTransparent
              message="Back to Log-in page"
              type="right"
              onClick={this.handleBack}
            >
              <FontAwesomeIcon icon="arrow-left" />
            </Button>
          </div>
          <form className="signup__form flex--vertical">
            <input type="text" value={nickname} placeholder="Nickname" onChange={(e) => this.setNickname(e.target.value)} />
            <input type="password" value={password} placeholder="Password" onChange={(e) => this.setPassword(e.target.value)} />
            <input type="password" value={confirmPassword} placeholder="Confirm Password" onChange={(e) => this.setConfirmPassword(e.target.value)} />
            <input type="text" value={url} placeholder="Server Address" onChange={(e) => this.setUrl(e.target.value)} />
            <button type="button" onClick={this.handleSubmit}>Submit</button>
            <div className={showError ? 'red flex-vertical' : 'red flex-vertical hidden'} id="login__error" style={{ color: 'red' }}>
              Passwords do not match.
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(SignUp);
