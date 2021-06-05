import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from '../Buttons/Button/Button';
import Notification from '../Notification/Notification';
import '../Add/Add.scoped.css';
import './ExportModal.scoped.css';

export default class ImportModal extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleDownload = (entity) => {
    const { url } = this.props;
    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` }, responseType: 'blob' };

    axios.get(`${url}/csv/export/${entity}`, options).then((response) => {
      const address = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = address;
      link.setAttribute('download', `${entity}.csv`); // or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }

  render() {
    const { showNotif, notifMessage } = this.state;
    const { onCancel } = this.props;

    return (
      <>
        <Notification showNotif={showNotif}>{notifMessage}</Notification>
        <form className="add">
          <Button isTransparent onClick={() => onCancel(false)}>
            Cancel
          </Button>
          <button type="button" onClick={() => this.handleDownload('donors')} style={{ marginBottom: '30px' }}>Download Donors Table</button>
          <button type="button" onClick={() => this.handleDownload('donations')} style={{ marginBottom: '30px' }}>Download Donations Table</button>
          <button type="button" onClick={() => this.handleDownload('connections')} style={{ marginBottom: '30px' }}>Download Connections Table</button>
          <button type="button" onClick={() => this.handleDownload('moas')} style={{ marginBottom: '30px' }}>Download MOAs Table</button>
          <button type="button" onClick={() => this.handleDownload('scholarships')} style={{ marginBottom: '30px' }}>Download Scholarships Table</button>
          <button type="button" onClick={() => this.handleDownload('scholars')} style={{ marginBottom: '30px' }}>Download Scholars Table</button>
          <button type="button" onClick={() => this.handleDownload('documents')} style={{ marginBottom: '30px' }}>Download Documents Table</button>
        </form>
      </>
    );
  }
}

ImportModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};
