import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { handleInitialData } from './actions/shared';
import Dashboard from './components/Dashboard';
import NewQuestion from './components/NewQuestion';
import QuestionPage from './components/QuestionPage';
import Nav from './components/Nav';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    const { loading } = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            { loading === true
              ? null
              : (
                <div>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/question/:id" component={QuestionPage} />
                  <Route path="/add" component={NewQuestion} />
                </div>
              )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  };
}

export default connect(mapStateToProps)(App);
