import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const Question = ({
  author, id, optionOne, optionTwo, timestamp,
}) => (
  <Link className="question-link" to={`/question/${id}`}>
    <div className="question-link--wyr">WYR: {optionOne.text} or {optionOne.text}?</div>
    <div className="question-link--author">by: {author}</div>
    <div className="question-link--time">{new Date(timestamp).toLocaleString()}</div>
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
