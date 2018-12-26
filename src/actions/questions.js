import { showLoading, hideLoading } from 'react-redux-loading';
import { saveQuestionAnswer, saveQuestion } from '../util/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const TOGGLE_QUESTION = 'TOGGLE_QUESTION';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText,
    })
      .then(question => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function toggleQuestion({ id, authedUser, hasLiked }) {
  return {
    type: TOGGLE_QUESTION,
    id,
    authedUser,
    hasLiked,
  };
}

export function handleToggleQuestion(info) {
  return (dispatch) => {
    dispatch(toggleQuestion(info));

    return saveQuestionAnswer(info)
      .catch((e) => {
        console.warn('Error in handleToggleQuestion: ', e);
        dispatch(toggleQuestion(info));
        alert('The was an error liking the question. Try again.');
      });
  };
}

function answerQuestion(question) {
  return {
    type: ANSWER_QUESTION,
    question,
  };
}

export function handleAnswerQuestion(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestionAnswer({
      authedUser,
      qid,
      answer,
    })
      .then(() => dispatch(answerQuestion({ authedUser, qid, answer })))
      .then(() => dispatch(hideLoading()));
  };
}
