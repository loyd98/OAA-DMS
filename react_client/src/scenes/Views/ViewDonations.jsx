import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Views.scoped.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';
import axios from 'axios';

import Navigation from '../../components/Navigation/Navigation';
import Button from '../../components/Buttons/Button/Button';
import Modal from '../../components/Modal/Modal';
import InnerTable from '../../components/InnerTable/InnerTable';

class ViewDonors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      form: {},
      isEditing: false,
      index: 0,
      showAdd: false,
      showModal: false,
      id: null,
      innerTableId: null,
    };
    this.tableName = 'donations';
    this.title = 'Donation';
  }

  componentDidMount() {
    this.handleRead();
  }

  componentDidUpdate(prevProps, prevState) {
    const { id } = this.state;
    if (prevState.id !== id) {
      sessionStorage.setItem('currentId', id);
    }
  }

  handleRead = () => {
    const { history, url, currentTable } = this.props;
    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };
    let id = history.location.state?.id;

    if (!id) {
      id = sessionStorage.getItem('currentId');
      this.setState({ id });
    } else {
      this.setState({ id });
    }

    axios
      .get(`${url}/${currentTable.slice(0, -1)}/${id}`, options)
      .then((res) => {
        this.setState({ data: res.data, innerTableId: res.data.id });
        this.copyData();
      })
      .catch((err) => console.log(err));
  };

  setIsEditing = (isEditing) => this.setState({ isEditing });

  setShowModal = (showModal) => this.setState({ showModal });

  setShowAdd = (showAdd) => this.setState({ showAdd });

  setForm = (name, value) => {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
    }));
  };

  copyData = () => {
    const { data } = this.state;
    const { config, currentTable } = this.props;

    const form = {};
    config.ordering[currentTable].forEach((obj) => {
      if (
        obj.key !== 'createdBy' &&
        obj.key !== 'creationDate' &&
        obj.key !== 'lastModifiedDate' &&
        obj.key !== 'lastModifiedBy'
      ) {
        form[obj.key] = data[obj.key];
      }
    });
    this.setState({ form });
  };

  handleCancel = () => {
    this.setIsEditing(false);
    this.copyData();
  };

  handleIndexInc = () => {
    const { config, currentTable } = this.props;

    const end = config.innerTables[currentTable].length;

    this.setState((prevState) => ({
      index: prevState.index < end - 1 ? prevState.index + 1 : end - 1,
    }));
  };

  handleIndexDec = () => {
    this.setState((prevState) => ({
      index: prevState.index > 0 ? prevState.index - 1 : 0,
    }));
  };

  handleReturn = () => {
    const { history } = this.props;
    history.push('/dashboard');
  };

  handleReturn = () => {
    const { isEditing } = this.state;
    const { history } = this.props;

    if (isEditing) {
      this.setShowModal(true);
    } else {
      history.push('/dashboard');
    }
  };

  handleDiscard = () => {
    const { history } = this.props;
    this.setIsEditing(false);
    this.setShowModal(false);
    history.push('/dashboard');
  };

  handleSubmit = () => {
    const { form } = this.state;
    const { url, currentTable } = this.props;
    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };

    axios
      .patch(`${url}/${currentTable.slice(0, -1)}/update`, form, options)
      .then((res) => {
        this.setState({ data: res.data });
        this.copyData();
        this.setIsEditing(false);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      data, isEditing, form, index, showAdd, showModal, id, innerTableId,
    } = this.state;
    const {
      config, currentTable, url, onDelete, onView, onShow, onMessage,
    } = this.props;
    let button;

    const inputs = config.ordering[currentTable].map((obj) => {
      if (
        obj.key !== 'createdBy' &&
        obj.key !== 'creationDate' &&
        obj.key !== 'lastModifiedDate' &&
        obj.key !== 'lastModifiedBy' &&
        obj.key !== 'id' &&
        obj.key !== 'connectionId'
      ) {
        return (
          <div key={obj.key} className="view__detailContainer">
            <div className="view__detailTitle">{obj.name}</div>
            <input
              disabled={!isEditing}
              name={obj.key}
              type="text"
              value={form[obj.key] == null ? '' : form[obj.key]}
              onChange={(e) => this.setForm(e.target.name, e.target.value)}
            />
          </div>
        );
      }
      return (
        <div key={obj.key} className="view__detailContainer">
          <div className="view__detailTitle">{obj.name}</div>
          <input
            disabled
            name={obj.key}
            type="text"
            defaultValue={data[obj.key]}
          />
        </div>
      );
    });

    if (!isEditing) {
      button = (
        <Button
          isTransparent
          message="Edit"
          type="right"
          onClick={() => this.setIsEditing(true)}
        >
          <FontAwesomeIcon icon="edit" />
        </Button>
      );
    } else {
      button = (
        <div className="flex--horizontal">
          <Button
            isTransparent
            message="Submit"
            type="rigth"
            onClick={this.handleSubmit}
          >
            <FontAwesomeIcon icon="share-square" />
          </Button>
          <Button
            isTransparent
            message="Cancel"
            type="right"
            onClick={this.handleCancel}
          >
            <FontAwesomeIcon icon="times" />
          </Button>
        </div>
      );
    }

    const innerTableName = config.innerTables[this.tableName][index][0].toUpperCase() +
    config.innerTables[this.tableName][index].slice(1);
    const innerTable = innerTableName === 'Moas' ? 'MOAs' : innerTableName;

    if (form.length === 0 || !id || !innerTableId) {
      return <div>Loading...</div>;
    }

    return (
      <>
        {showModal && (
          <Modal
            title="Discard your changes?"
            message="The changes in the form have not been submitted yet. Would you like to discard them and return to the Dashboard page?"
            leftBtnName="Cancel"
            rightBtnName="Discard"
            exitOnClick={() => this.setShowModal(false)}
            leftBtnOnClick={() => this.setShowModal(false)}
            rightBtnOnClick={this.handleDiscard}
          />
        )}
        <Navigation />
        <div className="view flex--horizontal">
          <div className="view__left">
            <div className="view__titlebar flex--horizontal">
              <p>{this.title}</p>
              {button}
            </div>
            <form className="view__details">{inputs}</form>
          </div>
          <div className="view__right">
            <div className="view__titlebar flex--horizontal">
              <div className="flex--horizontal">
                <p>{innerTable}</p>
                <Button
                  isTransparent
                  message="Prev table"
                  type="right"
                  onClick={this.handleIndexDec}
                >
                  <FontAwesomeIcon icon="arrow-left" />
                </Button>
                <Button
                  isTransparent
                  message="Next table"
                  type="right"
                  onClick={this.handleIndexInc}
                >
                  <FontAwesomeIcon icon="arrow-right" />
                </Button>
              </div>

              <Button
                isTransparent
                message="Return to Dashboard"
                type="right"
                onClick={this.handleReturn}
              >
                <FontAwesomeIcon icon="arrow-left" />
              </Button>
            </div>
            <InnerTable
              id={innerTableId}
              url={url}
              showAdd={showAdd}
              config={config}
              innerTable={innerTable.toLowerCase()}
              colLimit={6}
              onDelete={onDelete}
              onView={onView}
              onAddCancel={this.setShowAdd}
              onShow={onShow}
              onMessage={onMessage}
              currentTable={currentTable}
            />
          </div>
        </div>
      </>
    );
  }
}

ViewDonors.propTypes = {
  config: PropTypes.shape({
    innerTables: PropTypes.shape(),
    ordering: PropTypes.shape({}),
  }).isRequired,
  currentTable: PropTypes.string.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      state: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      }),
    }),
    push: PropTypes.func,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  onShow: PropTypes.func.isRequired,
  onMessage: PropTypes.func.isRequired,
};

export default withRouter(ViewDonors);
