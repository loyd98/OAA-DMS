import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Add.scoped.css';

import { withRouter } from 'react-router';
import axios from 'axios';
import _ from 'lodash';

import Button from '../Buttons/Button/Button';

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {},
    };
  }

  componentDidMount() {
    const { config, currentTable } = this.props;

    const form = {};

    config.ordering[currentTable].forEach((obj) => {
      if (
        obj.key !== 'createdBy' &&
        obj.key !== 'creationDate' &&
        obj.key !== 'lastModifiedDate' &&
        obj.key !== 'lastModifiedBy'
      ) {
        form[obj.key] = '';
      }
    });
    this.setState({ form });
  }

  setForm = (name, value) => {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
    }));
  };

  async setNotif(onMessage, onShow, message) {
    await onMessage(message);
    onShow(true);
    await this.delay(3000);
    onShow(false);
    await this.delay(1000);
    onShow('none');
  }

  delay = (ms) => new Promise((res) => setTimeout(res, ms));

  handleSubmit = async () => {
    const { form } = this.state;
    const formSubmit = form;
    const {
      currentTable,
      onSubmit,
      url,
      onCancel,
      onShow,
      onMessage,
    } = this.props;

    Object.keys(formSubmit).forEach((key) => {
      if (formSubmit[key] === '') {
        formSubmit[key] = null;
      }
    });

    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const res = await axios.post(`${url}/${currentTable.slice(0, -1)}/add`, formSubmit, options);
      const { accountNumber } = res.data;
      onSubmit();
      onCancel(false);
      await this.setNotif(onMessage, onShow, `Succesfully added ${currentTable.slice(0, -1)} with account number: ${accountNumber}.`);
    } catch (err) {
      const message = err.response.data.errors[0].defaultMessage || 'Error in Add.jsx';
      await this.setNotif(onMessage, onShow, message);
    }
  };

  render() {
    const { form } = this.state;
    const {
      currentTable, config, onCancel,
    } = this.props;

    if (_.isEmpty(form)) {
      return <div>Loading...</div>;
    }

    return (
      <div className="add__background">
        <form className="add">
          <Button isTransparent onClick={() => onCancel(false)}>
            Cancel
          </Button>

          {config.ordering[currentTable].map((obj) => {
            if (
              obj.key === 'createdBy' ||
              obj.key === 'creationDate' ||
              obj.key === 'lastModifiedBy' ||
              obj.key === 'lastModifiedDate'
            ) {
              return null;
            }

            if (obj.key === 'id') {
              return (
                <div key={obj.key} className="view__detailContainer">
                  <div className="view__detailTitle">{obj.name}</div>
                  <input
                    disabled
                    placeholder="AUTO GENERATED"
                  />
                </div>
              );
            }

            return (
              <div key={obj.key} className="view__detailContainer">
                <div className="view__detailTitle">{obj.name}</div>
                <input
                  name={obj.key}
                  type="text"
                  value={form[obj.key]}
                  onChange={(e) => this.setForm(e.target.name, e.target.value)}
                />
              </div>
            );
          })}
          <Button isTransparent onClick={() => this.handleSubmit()}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

Add.propTypes = {
  config: PropTypes.shape({
    ordering: PropTypes.shape({}),
  }).isRequired,
  currentTable: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  onShow: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired,
};

export default withRouter(Add);
