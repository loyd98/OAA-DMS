import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withRouter } from 'react-router';
import axios from 'axios';
import _ from 'lodash';

import Button from '../Buttons/Button/Button';

class InnerAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {},
    };
  }

  componentDidMount() {
    const { config, innerTable, id } = this.props;

    const form = {};

    config.ordering[innerTable].forEach((obj) => {
      if (obj.key === 'donorId') {
        form[obj.key] = id;
      } else if (
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

  handleSubmit = () => {
    const { form } = this.state;
    const {
      innerTable, onSubmit, url, onCancel,
    } = this.props;
    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };

    switch (innerTable) {
      case 'donors':
        axios
          .post(`${url}/donor/add`, form, options)
          .then(() => onSubmit())
          .catch((err) => console.log(err));
        break;
      case 'donations':
        axios
          .post(`${url}/donation/add`, form, options)
          .then(() => onSubmit())
          .catch((err) => console.log(err));
        break;
      default:
        console.log('Error');
        break;
    }
    onCancel(false);
  };

  render() {
    const { form } = this.state;
    const {
      innerTable, config, onCancel,
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

          {/* eslint-disable-next-line react/prop-types */}
          {config.ordering[innerTable].map((obj) => {
            if (
              obj.key === 'createdBy' ||
              obj.key === 'creationDate' ||
              obj.key === 'lastModifiedBy' ||
              obj.key === 'lastModifiedDate'
            ) {
              return null;
            }

            if (obj.key === 'donorId') {
              return (
                <div key={obj.key} className="view__detailContainer">
                  <div className="view__detailTitle">{obj.name}</div>
                  <input
                    disabled
                    name={obj.key}
                    type="text"
                    value={form[obj.key]}
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

InnerAdd.propTypes = {
  config: PropTypes.shape({
    ordering: PropTypes.shape({}),
  }).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  innerTable: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default withRouter(InnerAdd);
