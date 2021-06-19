import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/user.reselect';

import LoginPage from '../pages/login/login.component';
import AdminHomePage from '../pages/admin/home/home.component';
import ClientHomePage from '../pages/client/home-page/home-page.component';

const Routes = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <Router>
        <Redirect to='/' />
        <Route path='/' component={LoginPage} exact strict key='login' />
      </Router>
    );
  };

  if (currentUser) {
    axios.defaults.headers.common['x-access-token'] = currentUser.token;

    if (currentUser.role === 'sa' || currentUser.role === 'admin') {
      return (
        <Router>
          <Route path='/' component={AdminHomePage}  />
        </Router>
      );
    };

    if (currentUser.role === 'sa' || currentUser.role === 'admin') {
      return (
        <Router>
          <Route path='/' component={ClientHomePage} exact strict />
        </Router>
      );
    };
  }
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(
  mapStateToProps
)(Routes);
