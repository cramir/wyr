import { showLoading, hideLoading } from 'react-redux-loading';
import { getInitialData } from '../util/api';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';
import { setAuthedUser } from './authUser';

const AUTHED_ID = 'tylermcginnis';

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(setAuthedUser(AUTHED_ID));
        dispatch(hideLoading());
      });
  };
}
