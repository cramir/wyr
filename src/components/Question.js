import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const Question = ({
  author, id, optionOne, optionTwo, timestamp,
}) => (
  <Link to={`/question/${id}`}>
    <ul>
      <li>{author}</li>
      <li>{id}</li>
      <li>{new Date(timestamp).toLocaleString()}</li>
      <li>{optionOne.text}</li>
      <li>{optionTwo.text}</li>
    </ul>
  </Link>
);

Question.propTypes = {
  author: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  optionOne: PropTypes.object.isRequired,
  optionTwo: PropTypes.object.isRequired,
  timestamp: PropTypes.number.isRequired,
};

function mapStateToProps({ questions }, { id }) {
  return {
    ...questions[id],
  };
}


export default withRouter(connect(mapStateToProps)(Question));
