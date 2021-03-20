import React, { Component } from 'react';
import './InnerTable.scoped.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Buttons/Button/Button';
import axios from 'axios';
import { withRouter } from 'react-router';
import InnerAdd from '../../components/InnerAdd/InnerAdd';

class InnerTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.handleRead();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.innerTable !== this.props.innerTable) {
      console.log(prevProps.innerTable, this.props.innerTable);
    }
  }

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
        axios
          .get(`${url}/donation/donors/${id}`, options)
          .then((res) => this.setState({ data: res.data }))
          .catch((err) => console.log(err));
    }
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
    } = this.props;
    const { data } = this.state;
    const fields = config.ordering[innerTable];

    return (
      <>
        {showAdd && (
          <InnerAdd
            url={url}
            innerTable={innerTable}
            onCancel={onAddCancel}
            config={config}
            onSubmit={this.handleRead}
            id={id}
          />
        )}
        <thead id="table__bottom">
          <tr className="table__bottomRow">
            {fields.slice(0, colLimit).map((col) => (
              <th style={{ width: col.width }} key={col.key}>
                {col.name}
              </th>
            ))}
            <th style={{ width: '70px' }} />
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={row.id}>
              {fields.slice(0, colLimit).map((col) => {
                return (
                  <td style={{ width: col.width }} key={col.key}>
                    {row[col.key]}
                  </td>
                );
              })}
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
                    onClick={() =>
                      onDelete(url, innerTable, this.handleRead, row.id)
                    }
                  >
                    <FontAwesomeIcon data-id={row.id} icon="times" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </>
    );
  }
}

export default withRouter(InnerTable);
