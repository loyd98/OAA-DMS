import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from '../Buttons/Button/Button';
import Notification from '../Notification/Notification';
import '../Add/Add.scoped.css';

export default class ImportModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectecDonor: null,
      selectedDonation: null,
      selectedConnection: null,
      selectedMoa: null,
      selectedScholarship: null,
      selectedScholar: null,
      selectedDocument: null,
      showNotif: 'none',
      notifMessage: '',
    };
  }

  async setNotif(onMessage, onShow, message) {
    await onMessage(message);
    onShow(true);
    await this.delay(3000);
    onShow(false);
    await this.delay(1000);
    onShow('none');
  }

  delay = (ms) => new Promise((res) => setTimeout(res, ms));

  setShowNotif = (showNotif) => this.setState({ showNotif });

  setNotifMessage = (notifMessage) => new Promise((resolve) => {
    this.setState({ notifMessage }, resolve);
  });

  onDonorChange = (event) => {
    this.setState({ selectecDonor: event.target.files[0] });
  }

  onDonationChange = (event) => {
    this.setState({ selectedDonation: event.target.files[0] });
  }

  onConnectionChange = (event) => {
    this.setState({ selectedConnection: event.target.files[0] });
  }

  onMoaChange = (event) => {
    this.setState({ selectedMoa: event.target.files[0] });
  }

  onScholarshipChange = (event) => {
    this.setState({ selectedScholarship: event.target.files[0] });
  }

  onScholarChange = (event) => {
    this.setState({ selectedScholar: event.target.files[0] });
  }

  onDocumentChange = (event) => {
    this.setState({ selectedDocument: event.target.files[0] });
  }

  onImport = async () => {
    const {
      selectecDonor,
      selectedDonation,
      selectedConnection,
      selectedMoa,
      selectedScholarship,
      selectedScholar,
      selectedDocument,
    } = this.state;

    const { onCancel, onSubmit } = this.props;

    if (
      selectecDonor == null ||
      selectedDonation == null ||
      selectedConnection == null ||
      selectedMoa == null ||
      selectedScholarship == null ||
      selectedScholar == null ||
      selectedDocument == null
    ) {
      await this.setNotif(this.setNotifMessage, this.setShowNotif, 'One of the fields is empty.');
      return;
    }

    const { url } = this.props;

    const donorData = new FormData();
    const donationData = new FormData();
    const connectionData = new FormData();
    const moaData = new FormData();
    const scholarshipData = new FormData();
    const scholarData = new FormData();
    const documentData = new FormData();

    donorData.append('file', selectecDonor, selectecDonor.name);
    donationData.append('file', selectedDonation, selectedDonation.name);
    connectionData.append('file', selectedConnection, selectedConnection.name);
    moaData.append('file', selectedMoa, selectedMoa.name);
    scholarshipData.append('file', selectedScholarship, selectedScholarship.name);
    scholarData.append('file', selectedScholar, selectedScholar.name);
    documentData.append('file', selectedDocument, selectedDocument.name);

    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };

    await axios.post(`${url}/csv/upload/donors`, donorData, options);
    await axios.post(`${url}/csv/upload/donations`, donationData, options);
    await axios.post(`${url}/csv/upload/connections`, connectionData, options);
    await axios.post(`${url}/csv/upload/moas`, moaData, options);
    await axios.post(`${url}/csv/upload/scholarships`, scholarshipData, options);
    await axios.post(`${url}/csv/upload/scholars`, scholarData, options);
    await axios.post(`${url}/csv/upload/documents`, documentData, options).then(() => { onSubmit(); onCancel(false); });
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

          <div className="view__detailContainer">
            <div className="view__detailTitle">Donors CSV</div>
            <input
              className="fileInput"
              type="file"
              onChange={this.onDonorChange}
            />
          </div>

          <div className="view__detailContainer">
            <div className="view__detailTitle">Donations CSV</div>
            <input
              className="fileInput"
              type="file"
              onChange={this.onDonationChange}
            />
          </div>

          <div className="view__detailContainer">
            <div className="view__detailTitle">Connections CSV</div>
            <input
              className="fileInput"
              type="file"
              onChange={this.onConnectionChange}
            />
          </div>

          <div className="view__detailContainer">
            <div className="view__detailTitle">MOAs CSV</div>
            <input
              className="fileInput"
              type="file"
              onChange={this.onMoaChange}
            />
          </div>

          <div className="view__detailContainer">
            <div className="view__detailTitle">Scholarships CSV</div>
            <input
              className="fileInput"
              type="file"
              onChange={this.onScholarshipChange}
            />
          </div>

          <div className="view__detailContainer">
            <div className="view__detailTitle">Scholars CSV</div>
            <input
              className="fileInput"
              type="file"
              onChange={this.onScholarChange}
            />
          </div>

          <div className="view__detailContainer">
            <div className="view__detailTitle">Documents CSV</div>
            <input
              className="fileInput"
              type="file"
              onChange={this.onDocumentChange}
            />
          </div>

          <Button isTransparent onClick={this.onImport}>
            Import
          </Button>
        </form>
      </>
    );
  }
}

ImportModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
