import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user/user.reselect';

import Header from '../components/header/header.component';
import Footer from '../components/footer/footer.component';

import ClientHomePage from '../pages/client/home-page/home-page.component';
import AboutMe from '../pages/client/about-me/about-me.component';
import Services from '../pages/client/services/services.component';
import Price from '../pages/client/price/price.component';
import Contact from '../pages/client/contact/contact.component';
import Appointment from '../pages/client/appointment/appointment.component';

import Login from '../pages/login/login.component';

import Error from '../pages/admin/error/error.component';
import AppointmentPage from '../pages/admin/appointment/appointment.component';

const Routes = ({ currentUser, location }) => {
  const { pathname } = location;

  if (currentUser) {
    axios.defaults.headers.common['x-access-token'] = currentUser.token;
  }

  return (
    <Router>
      <Header />
      <Route path='/' component={ClientHomePage} exact strict  />

      { !currentUser &&
        <>
          <Route path='/about' component={AboutMe} exact strict />
          <Route path='/services' component={Services} exact strict />
          <Route path='/price' component={Price} exact strict />
          <Route path='/contact' component={Contact} exact strict />
          <Route path='/login' component={Login} exact strict />
          <Route path='/appointment' component={Appointment} exact strict />
        </>
      }
      { currentUser &&
        <>
          <Route path='/errors' component={Error} exact strict  />
          <Route path='/appointment' component={AppointmentPage} exact strict  />
        </>
      }
      <Footer />
    </Router>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(
  mapStateToProps
)(Routes);
