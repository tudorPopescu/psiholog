import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/user.reselect';

import ClientHomePage from '../pages/client/home-page/home-page.component';

const Routes = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <Router>
        <Route path='/' component={ClientHomePage} exact strict />
      </Router>
    );
  };
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(
  mapStateToProps
)(Routes);
