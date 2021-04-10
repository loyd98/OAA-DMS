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
    this.copyData();
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

  copyData = () => {
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

    const formData = new FormData();

    Object.keys(formSubmit).forEach((key) => {
      if (formSubmit[key] === '') {
        formSubmit[key] = null;
      }
    });

    Object.keys(formSubmit).forEach((key) => {
      if (formSubmit[key] !== null) {
        formData.append(key, formSubmit[key]);
      }
    });

    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const res = await axios.post(`${url}/${currentTable.slice(0, -1)}/add`, formData, options);
      const { id } = res.data;
      onSubmit();
      onCancel(false);
      await this.setNotif(onMessage, onShow, `Succesfully added ${currentTable.slice(0, -1)} with ID no. ${id}.`);
    } catch (err) {
      const message = err.response.data.errors?.[0].defaultMessage || 'Error in one of the input fields. Please double check.';
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
        <form className="add" encType="multipart/form-data">
          <Button isTransparent onClick={() => onCancel(false)}>
            Cancel
          </Button>

          {config.ordering[currentTable].map((obj) => {
            if (obj.key === 'birthDate' || obj.key === 'date' || obj.key === 'dateSigned' || obj.key === 'dateEstablished') {
              return (
                <div key={obj.key} className="view__detailContainer">
                  <div className="view__detailTitle">{obj.name}</div>
                  <input
                    name={obj.key}
                    type="text"
                    value={form[obj.key] === null ? '' : form[obj.key]}
                    onChange={(e) => this.setForm(e.target.name, e.target.value)}
                    placeholder="Format: YYYY-MM-DD"
                  />
                </div>
              );
            }

            if (
              obj.key === 'createdBy' ||
              obj.key === 'creationDate' ||
              obj.key === 'lastModifiedBy' ||
              obj.key === 'lastModifiedDate' ||
              obj.key === 'id'
            ) {
              return null;
            }

            if (obj.key === 'file') {
              return (
                <div key={obj.key} className="view__detailContainer view__fileUpload">
                  <div className="view__detailTitle">{obj.name}</div>
                  <input
                    name={obj.key}
                    type="file"
                    onChange={(e) => this.setForm(e.target.name, e.target.files[0])}
                  />
                </div>
              );
            }

            if (obj.key === 'criteria') {
              return (
                <div key={obj.key} className="view__detailContainer">
                  <div className="view__detailTitle">{obj.name}</div>
                  <textarea
                    rows="4"
                    cols="51"
                    name={obj.key}
                    type="text"
                    value={form[obj.key] === null ? '' : form[obj.key]}
                    onChange={(e) => this.setForm(e.target.name, e.target.value)}
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
                  value={form[obj.key] === null ? '' : form[obj.key]}
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
