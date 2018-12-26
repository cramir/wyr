import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';

class NewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionOne: '',
      optionTwo: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  handleSubmit = () => {
    console.log();
  };

  render() {
    const { optionOne, optionTwo } = this.state;
    return (
      <div>
        <div>Would you rather?</div>
        <form onSubmit={this.handleSubmit}>
          <DebounceInput
            type="text"
            value={optionOne}
            placeholder="Option 1"
            onChange={this.handleChange}
            name="optionOne"
            debounceTimeout="200"
          />
          <DebounceInput
            type="text"
            value={optionTwo}
            placeholder="Option 2"
            name="optionTwo"
            onChange={this.handleChange}
            debounceTimeout="200"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

NewQuestion.propTypes = {};

export default NewQuestion;
