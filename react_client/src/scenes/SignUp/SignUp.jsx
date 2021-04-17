import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SignUp.scoped.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';
import Button from '../../components/Buttons/Button/Button';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleBack = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
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
            <input type="text" placeholder="Nickname" />
            <input type="text" placeholder="Password" />
            <input type="text" placeholder="Confirm Password" />
            <input type="text" placeholder="Email" />
            <button type="button">Submit</button>
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
