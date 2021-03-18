import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import './Add.scoped.css';

import Button from '../../components/Buttons/Button/Button';
import { withRouter } from 'react-router';

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {};

  handleSubmit = (setShowAdd, handleAddFormSubmit) => {
    setShowAdd(false);
    handleAddFormSubmit();
  };

  render() {
    const {
      currentTable,
      handleShowAdd,
      handleAddFormField,
      config,
      handleAddFormSubmit,
    } = this.props;

    return (
      <div className="add__background">
        <form className="add">
          <Button isTransparent onClick={() => handleShowAdd(false)}>
            Cancel
          </Button>
          {config.ordering[currentTable].map((key) => {
            if (
              key.key === 'createdBy' ||
              key.key === 'creationDate' ||
              key.key === 'lastModifiedBy' ||
              key.key === 'lastModifiedDate'
            ) {
              return null;
            }
            return (
              <div key={key.key} className="view__detailContainer">
                <div className="view__detailTitle">{key.name}</div>
                <input
                  name={key.key}
                  type="text"
                  value={this.state[key.key]}
                  onChange={(e) =>
                    handleAddFormField(e.target.name, e.target.value)
                  }
                />
              </div>
            );
          })}
          <Button
            isTransparent
            onClick={() =>
              this.handleSubmit(handleShowAdd, handleAddFormSubmit)
            }
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(Add);
