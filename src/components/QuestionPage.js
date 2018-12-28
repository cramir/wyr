import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleAnswerQuestion } from '../actions/questions';

const QuestionPage = ({
  question,
  found,
  answered,
  dispatch,
}) => {
  if (!found) {
    return <Redirect to="/404" />;
  } if (answered) {
    return (
      <div className="question-page">
        <h1 className="heading">Would you rather?</h1>
        <div>You selected you would rather
            <strong> {question[answered].text } </strong>
            than
            <strong> {answered ===  'optionOne' ? question.optionTwo.text : question.optionOne.text }. </strong>
        </div>
          <div>this option has <strong>{question[answered].votes.length}</strong> votes, which equates to <strong>{(question[answered].votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length) * 100).toFixed(2)}%</strong> of total votes.</div>
      </div>
    );
  }
  return (
    <div className="question-page">
      <h1 className="heading">Would you rather?</h1>
      <button type="button" onClick={() => dispatch(handleAnswerQuestion(question.id, 'optionOne'))}>{question.optionOne.text}</button>
      <span>or</span>
      <button type="button" onClick={() => dispatch(handleAnswerQuestion(question.id, 'optionTwo'))}>{question.optionTwo.text}</button>
    </div>
  );
};


QuestionPage.propTypes = {
  found: PropTypes.bool.isRequired,
  question: PropTypes.shape({
    optionOne: PropTypes.object,
    optionTwo: PropTypes.object,
    author: PropTypes.string,
  }).isRequired,
  answered: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

function mapStateToProps({ authedUser, questions }, props) {
  const { id } = props.match.params;
  let answered = false;
  if (Object.prototype.hasOwnProperty.call(questions, id)) {
    if (questions[id].optionOne.votes.includes(authedUser)) {
      answered = 'optionOne';
    } else if (questions[id].optionTwo.votes.includes(authedUser)) {
      answered = 'optionTwo';
    }
    return {
      question: questions[id],
      found: true,
      answered,
    };
  }
  return {
    found: false,
  };
}

export default connect(mapStateToProps)(QuestionPage);
