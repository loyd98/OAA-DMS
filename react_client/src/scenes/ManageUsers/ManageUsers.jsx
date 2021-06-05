import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import '../Login/Login.scoped.css';

class ManageUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      showError: false,
    };
    this.nameAutoFocus = true;
  }

  componentDidMount() {
    this.nameAutoFocus = false;
  }

  handlePassword(password) {
    this.setState({ password });
  }

  handleError(showError) {
    this.setState({ showError });
  }

  handleSubmit = async (password) => {
    const { history } = this.props;

    if (password === 'one_big_fight') {
      this.handleError(false);
      history.push('/manage/users');
    }

    this.handleError(true);
  };

  render() {
    const { password, showError } = this.state;

    return (
      <div className="login">
        <div className="login__container">
          <h1 className="blue">Admin</h1>
          <form id="login__form">
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => this.handlePassword(e.target.value)}
            />
            <button
              type="button"
              id="login__proceed--btn"
              onClick={() => this.handleSubmit(password)}
            >
              Proceed
            </button>
            <div className={showError ? 'red flex-vertical' : 'red flex-vertical hidden'} id="login__error" style={{ color: 'red' }}>
              Invalid password.
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ManageUsers.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(ManageUsers);
