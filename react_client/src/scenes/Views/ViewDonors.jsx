import React, { Component } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import './Views.scoped.css';

import Button from '../../components/Buttons/Button/Button';
import Table from '../../components/Table/Table';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';
import Modal from '../../components/Modal/Modal';
import InnerTable from '../../components/InnerTable/InnerTable';
import axios from 'axios';

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
    };
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
    const { history, url } = this.props;
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
      .get(`${url}/donor/${id}`, options)
      .then((res) => {
        this.setState({ data: res.data });
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
    const { url } = this.props;
    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };

    axios
      .patch(`${url}/donor/update`, form, options)
      .then((res) => {
        this.setState({ data: res.data });
        this.copyData();
        this.setIsEditing(false);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { data, isEditing, form, index, showAdd, showModal, id } = this.state;
    const { config, currentTable, url, onDelete, onView } = this.props;
    let button;
    let inputs;

    inputs = config.ordering[currentTable].map((obj) => {
      if (
        obj.key !== 'createdBy' &&
        obj.key !== 'creationDate' &&
        obj.key !== 'lastModifiedDate' &&
        obj.key !== 'lastModifiedBy'
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
      } else {
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
      }
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

    const innerTable =
      config.innerTables['donors'][index][0].toUpperCase() +
      config.innerTables['donors'][index].slice(1);

    if (form.length === 0) {
      return <div>Loading...</div>;
    }

    if (!id) {
      return null;
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
              <p>Donor:</p>
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
                  message={`Add ${config.innerTables[currentTable][index]}`}
                  type="right"
                  onClick={() => this.setShowAdd(true)}
                >
                  <FontAwesomeIcon icon="plus" />
                </Button>
                <Button
                  isTransparent
                  message={`Prev table`}
                  type="right"
                  onClick={this.handleIndexDec}
                >
                  <FontAwesomeIcon icon="arrow-left" />
                </Button>
                <Button
                  isTransparent
                  message={`Next table`}
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
            <table>
              <InnerTable
                id={id}
                url={url}
                showAdd={showAdd}
                config={config}
                innerTable={innerTable.toLowerCase()}
                colLimit={6}
                onDelete={onDelete}
                onView={onView}
                onAddCancel={this.setShowAdd}
              />
            </table>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(ViewDonors);
