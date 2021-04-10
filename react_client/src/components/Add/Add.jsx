import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Add.scoped.css';

import { withRouter } from 'react-router';
import _ from 'lodash';

import NormalForm from '../NormalForm/NormalForm';
import MultiPartForm from '../MultiPartForm/MultiPartForm';

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

  setNotif = async (onMessage, onShow, message, delay) => {
    await onMessage(message);
    onShow(true);
    await delay(3000);
    onShow(false);
    await delay(1000);
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

  renderForm = (currentTable, form, onCancel, onSubmit, url, onShow, onMessage) => {
    if (currentTable === 'moas') {
      return (
        <MultiPartForm
          form={form}
          currentTable={currentTable}
          onCancel={onCancel}
          setForm={this.setForm}
          onSubmit={onSubmit}
          url={url}
          onShow={onShow}
          onMessage={onMessage}
          delay={this.delay}
        />
      );
    }
    return (
      <NormalForm
        form={form}
        currentTable={currentTable}
        onCancel={onCancel}
        setForm={this.setForm}
        onSubmit={onSubmit}
        url={url}
        onShow={onShow}
        onMessage={onMessage}
        setNotif={this.setNotif}
        delay={this.delay}
      />
    );
  }

  render() {
    const { form } = this.state;
    const {
      currentTable, onCancel, onSubmit, url, onShow, onMessage,
    } = this.props;

    if (_.isEmpty(form)) {
      return <div>Loading...</div>;
    }

    return (
      <div className="add__background">
        {this.renderForm(currentTable, form, onCancel, onSubmit, url, onShow, onMessage)}
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
