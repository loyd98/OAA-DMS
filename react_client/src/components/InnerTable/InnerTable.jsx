import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './InnerTable.scoped.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { withRouter } from 'react-router';
import Button from '../Buttons/Button/Button';
import Add from '../Add/Add';
import DeleteInnerModal from '../InnerDeleteModal/InnerDeleteModal';
import Notification from '../Notification/Notification';

class InnerTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      showModal: false,
      idToBeDeleted: null,
      showNotif: 'none',
      notifMessage: '',
    };
  }

  componentDidMount() {
    this.handleRead();
  }

  setShowModal = (showModal) => this.setState({ showModal });

  setShowNotif = (showNotif) => this.setState({ showNotif });

  setNotifMessage = (notifMessage) => new Promise((resolve) => {
    this.setState({ notifMessage }, resolve);
  });

  handleRead = () => {
    const { url, id, innerTable } = this.props;
    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };

    switch (innerTable) {
      case 'donations':
        axios
          .get(`${url}/donor/donations/${id}`, options)
          .then((res) => this.setState({ data: res.data }))
          .catch((err) => console.log(err));
        break;
      case 'donors':
        console.log('DONOR');
        axios
          .get(`${url}/donation/donors/${id}`, options)
          .then((res) => this.setState({ data: res.data }))
          .catch((err) => console.log(err));
        break;
      default:
        console.log('Error');
        break;
    }
  };

  handleDelete = (id) => {
    this.setState({ idToBeDeleted: id });
    this.setState({ showModal: true });
  };

  render() {
    const {
      id,
      url,
      history,
      config,
      innerTable,
      colLimit,
      onDelete,
      onView,
      showAdd,
      onAddCancel,
      onShow,
      onMessage,
    } = this.props;
    const {
      data,
      showModal,
      idToBeDeleted,
      showNotif,
      notifMessage,
    } = this.state;

    // eslint-disable-next-line react/prop-types
    const fields = config.ordering[innerTable];

    return (
      <>
        <Notification showNotif={showNotif}>{notifMessage}</Notification>
        {showModal && (
          <DeleteInnerModal
            title="Delete entry?"
            message={`Do you really want to delete this entry with ID ${idToBeDeleted}.`}
            deleteConfirmation={`Type "${idToBeDeleted}" to confirm.`}
            leftBtnName="Cancel"
            rightBtnName="Delete"
            onClose={this.setShowModal}
            idToBeDeleted={idToBeDeleted}
            currentTable={innerTable}
            url={url}
            onDelete={onDelete}
            onRead={this.handleRead}
            onShow={this.setShowNotif}
            onMessage={this.setNotifMessage}
          />
        )}
        {showAdd && (
          <Add
            id={id}
            url={url}
            config={config}
            currentTable={innerTable}
            onCancel={onAddCancel}
            onSubmit={this.handleRead}
            onShow={onShow}
            onMessage={onMessage}
          />
        )}
        <table>
          <thead id="table__bottom">
            <tr className="table__bottomRow">
              {
              // eslint-disable-next-line react/prop-types
              fields.slice(0, colLimit).map((col) => (
                <th style={{ width: col.width }} key={col.key}>
                  {col.name}
                </th>
              ))
}
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <th style={{ width: '70px' }} />
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {
                // eslint-disable-next-line react/prop-types
                fields.slice(0, colLimit).map((col) => (
                  <td style={{ width: col.width }} key={col.key}>
                    {row[col.key]}
                  </td>
                ))
}
                <td style={{ width: '70px' }}>
                  <div className="flex--horizontal">
                    <Button
                      isTransparent={false}
                      message="View"
                      type="right"
                      onClick={() => onView(history, innerTable, row.id)}
                    >
                      <FontAwesomeIcon icon="border-all" />
                    </Button>
                    <Button
                      id={row.id}
                      isTransparent={false}
                      message="Delete"
                      type="right"
                      onClick={() => this.handleDelete(row.id)}
                    >
                      <FontAwesomeIcon data-id={row.id} icon="times" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

InnerTable.propTypes = {
  colLimit: PropTypes.number.isRequired,
  config: PropTypes.shape({}).isRequired,
  history: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]).isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  innerTable: PropTypes.string.isRequired,
  onAddCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  showAdd: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  onShow: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired,
};

export default withRouter(InnerTable);
