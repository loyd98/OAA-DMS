import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from '../Buttons/Button/Button';
import config from '../../data.config';

export default class NormalForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSubmit = async () => {
    const {
      form,
      currentTable,
      onSubmit,
      url,
      onCancel,
      onShow,
      onMessage,
      setNotif,
      delay,
    } = this.props;
    const formSubmit = form;

    Object.keys(formSubmit).forEach((key) => {
      if (formSubmit[key] === '') {
        formSubmit[key] = null;
      }
    });

    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };

    try {
      const res = await axios.post(`${url}/${currentTable.slice(0, -1)}/add`, formSubmit, options);
      const { id } = res.data;
      onSubmit();
      onCancel(false);
      await setNotif(onMessage, onShow, `Succesfully added ${currentTable.slice(0, -1)} with ID no. ${id}.`, delay);
    } catch (err) {
      const message = err.response.data.errors?.[0].defaultMessage || 'Error in one of the input fields. Please double check.';
      await setNotif(onMessage, onShow, message, delay);
    }
  };

  render() {
    const {
      currentTable, form, setForm, onCancel,
    } = this.props;

    return (
      <div>
        <form className="add">
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
                    onChange={(e) => setForm(e.target.name, e.target.value)}
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
              obj.key === 'id' ||
              obj.key === 'connectionId'
            ) {
              return null;
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
                    onChange={(e) => setForm(e.target.name, e.target.value)}
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
                  onChange={(e) => setForm(e.target.name, e.target.value)}
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

NormalForm.propTypes = {
  currentTable: PropTypes.string.isRequired,
  form: PropTypes.shape({}).isRequired,
  setForm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  onShow: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired,
  setNotif: PropTypes.func.isRequired,
  delay: PropTypes.func.isRequired,
};
