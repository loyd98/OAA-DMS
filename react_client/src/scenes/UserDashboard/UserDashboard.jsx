import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../Dashboard/Dashboard.scoped.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Buttons/Button/Button';

export default class UserDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.read();
  }

  read = () => {
    const { url } = this.props;
    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };

    axios
      .get(`${url}/users`, options)
      .then((res) => this.setState({ data: res.data }))
      .catch((err) => console.log(err));
  }

  handleDelete = (id) => {
    const { url } = this.props;
    const token = sessionStorage.getItem('token');
    const options = { headers: { Authorization: `Bearer ${token}` } };

    axios
      .delete(`${url}/users/${id}`, options)
      .then(() => this.read())
      .catch((err) => console.log(err));
  }

  render() {
    const { data } = this.state;

    if (data.length === 0) {
      return <div>Loading...</div>;
    }

    return (
      <div className="dashboard flex--vertical">
        <table className="table" style={{ height: '100%', paddingTop: '10px', marginTop: 0 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>{' '}</th>
              <th><Link to="/dashboard">Back to Dashboard</Link></th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>
                  <Button
                    id={user.id}
                    isTransparent={false}
                    onClick={() => this.handleDelete(user.id)}
                  >
                    <FontAwesomeIcon data-id={user.id} icon="times" />
                  </Button>

                </td>
                <td />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

UserDashboard.propTypes = {
  url: PropTypes.string.isRequired,
};
