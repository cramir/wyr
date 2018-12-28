import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionOne: '',
      optionTwo: '',
      toHome: false,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, id } = this.props;
    const { optionOne, optionTwo } = this.state;
    dispatch(handleAddQuestion(optionOne, optionTwo));
    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: !id,
    }));
  };

  render() {
    const { optionOne, optionTwo, toHome } = this.state;
    if (toHome === true) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="new-question">
        <h1 className="heading">Add a new Question</h1>
        <div className="wyr">Would you rather?</div>
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
          <button type="submit" className="submit">Submit</button>
        </form>
      </div>
    );
  }
}

NewQuestion.propTypes = {
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string,
};

export default connect()(NewQuestion);
