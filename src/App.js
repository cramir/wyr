import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import PropTypes from 'prop-types';
import { handleInitialData } from './actions/shared';
import Dashboard from './components/Dashboard';
import NewQuestion from './components/NewQuestion';
import QuestionPage from './components/QuestionPage';
import Nav from './components/Nav';
import Login from './components/Login';
import { logoutUser } from './actions/authUser';
import Leaderboard from './components/Leaderboard';


class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  initsial = () => {
    const { loading, authedUser } = this.props;
    if (loading === true) {
      return null;
    } if (authedUser) {
      return (
        <div>
          <Route path="/" exact component={Dashboard} />
          <Route path="/question/:id" component={QuestionPage} />
          <Route path="/add" component={NewQuestion} />
        </div>
      );
    }
    return (<Login />);
  };

  logOut = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };


  render() {
    const { loading, authedUser } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav authedUser={authedUser} logOut={this.logOut} />
            {authedUser ? (
              <div>
                <Route path="/" exact component={Dashboard} />
                <Route path="/question/:id" component={QuestionPage} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/leaderboard" component={Leaderboard} />

              </div>
            )
              : <Login />
                  }
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    loading: users === null,
    authedUser,
  };
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(App);
