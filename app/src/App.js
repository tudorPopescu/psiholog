import React from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.reselect';
import { withRouter } from 'react-router'

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';

import ClientHomePage from './pages/client/home-page/home-page.component';
import AboutMe from './pages/client/about-me/about-me.component';
import Services from './pages/client/services/services.component';
import Price from './pages/client/price/price.component';
import Contact from './pages/client/contact/contact.component';
import Appointment from './pages/client/appointment/appointment.component';


import Login from './pages/login/login.component';
import NotFoundPage from './pages/not-found/not-found.component';
import AppointmentPage from './pages/admin/appointment/appointment.component';
import ErrorPage from './pages/admin/error/error.component';


const App = ({currentUser, location}) => {
  if (currentUser) {
    axios.defaults.headers.common['x-access-token'] = currentUser.token;
  }

  return (
    <>
      {location.pathname !== '/login' && <Header /> }

      <Switch>
        <Route exact path="/" component={ClientHomePage} />
        <Route path='/about' component={AboutMe} exact />
        <Route path='/services' component={Services} />
        <Route path='/price' component={Price} />
        <Route path='/contact' component={Contact} />
        <Route path='/login' component={Login} />
        {!currentUser && <Route path='/appointment' component={Appointment} /> }

        {currentUser && <Route path='/errors' component={ErrorPage}  />}
        {currentUser && <Route path='/appointment' component={AppointmentPage} />}

        <Route component={NotFoundPage} />
      </Switch>

      {location.pathname !== '/login' && <Footer /> }
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(
  mapStateToProps
)(withRouter(App));
