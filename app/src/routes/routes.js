import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
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
import NotFoundPage from '../pages/not-found/not-found.component';
import Error from '../pages/admin/error/error.component';
import AppointmentPage from '../pages/admin/appointment/appointment.component';

const Routes = ({ currentUser, location }) => {
  if (currentUser) {
    axios.defaults.headers.common['x-access-token'] = currentUser.token;
  }

  if (!currentUser) {
    return (
      <Route path='/' component={ClientHomePage} exact />
    )
  }


  // return (

  //     { (currentUser || (!currentUser && location.pathname !== '/login')) && <Header /> }

  //     { !currentUser &&
  //       <>
  //         <Route path='/' component={ClientHomePage} exact />
  //         <Route path='/about' component={AboutMe} exact />
  //         <Route path='/services' component={Services} />
  //         <Route path='/price' component={Price} />
  //         <Route path='/contact' component={Contact} />
  //         <Route path='/login' component={Login} />
  //         <Route path='/appointment' component={Appointment} />
  //       </>
  //     }
  //     { currentUser &&
  //       <>
  //         <Route path='/errors' component={Error}  />
  //         <Route path='/appointment' component={AppointmentPage}  />
  //       </>
  //     }

  //     <Route exact path='/not-found' component={NotFoundPage} />

  //     { (currentUser || (!currentUser && location.pathname !== '/login')) && <Footer /> }

  //     <Route path='*'>
  //       <Redirect to='/not-found' />
  //     </Route>

  // );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(
  mapStateToProps
)(Routes);
