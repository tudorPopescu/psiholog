import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.reselect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPowerOff, faIdBadge, faKey } from '@fortawesome/free-solid-svg-icons';
import { setCurrentUser } from '../../redux/user/user.actions';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

import  { ADMIN_HEADER_LINKS, CLIENT_HEADER_LINKS } from './header.data';

// import logo from '../../assets/images/logo_100x100.png';
// import logo from '../../assets/images/logo.png';
import logo from '../../assets/images/logo-no-bg.png';
import './header.styles.scss';

const Header = ({ setCurrentUser, currentUser, history }) => {
  let links = [];

  if (currentUser) {
    links = ADMIN_HEADER_LINKS;
  } else {
    links = CLIENT_HEADER_LINKS;
  }

  return (
    <div className='row' id='header'>
      <div className='col-12'>
        <Navbar className='navbar' expand="lg">
          <div>
            <Link to='/' className='navbar-brand me-0'>
              <img className='logo' src={logo} alt='Psiholog Gherasă Iulia' />
            </Link>
            <div className='title-wrap'>
              <span className='title'>Psiholog Iulia Gherasă</span>
              <span className='subtitle'>Cabinet psihologic</span>
            </div>
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <ul className='navbar-nav ms-auto'>
              <li className='navbar-item active'><Link className='nav-link' to='/'>Acasă</Link></li>
              <li className='navbar-item active'><Link className='nav-link' to='/about'>Despre mine</Link></li>
              <li className='navbar-item active'><Link className='nav-link' to='/services'>Servicii</Link></li>
              <li className='navbar-item active'><Link className='nav-link' to='/price'>Tarife</Link></li>
              <li className='navbar-item active'><Link className='nav-link' to='/appointment'>Programări online</Link></li>
              <li className='navbar-item active'><Link className='nav-link' to='/contact'>Contact</Link></li>
            </ul>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
    // <div className='row' id='header'>
    //   <div className='col-12'>
    //     <nav className='navbar navbar-expand-lg navbar-light'>
          // <Link to='/' className='navbar-brand me-0'>
          //   <img className='logo' src={logo} alt='Psiholog Gherasă Iulia' />
          // </Link>
          // <div>
          //   <span className='title'>Psiholog Iulia Gherasă</span>
          //   <span className='subtitle'>Cabinet psihologic</span>
          // </div>
    //       <button className='navbar-toggler menu-toggle' type='button' data-toggle='collapse' data-target='#toggleHeader' aria-controls='toggleHeader' aria-expanded='false' aria-label='Toggle navigation'>
    //         <span className='navbar-toggler-icon'></span>
    //       </button>
    //       <div className='collapse navbar-collapse' id='toggleHeader'>
            // <ul className='navbar-nav ms-auto'>
            //     <li className='navbar-item active'><Link className='nav-link' to='/'>Acasă</Link></li>
            //     <li className='navbar-item active'><Link className='nav-link' to='/about'>Despre mine</Link></li>
            //     <li className='navbar-item active'><Link className='nav-link' to='/services'>Servicii</Link></li>
            //     <li className='navbar-item active'><Link className='nav-link' to='/price'>Tarife</Link></li>
            //     <li className='navbar-item active'><Link className='nav-link' to='/appointment'>Programare online</Link></li>
            //     <li className='navbar-item active'><Link className='nav-link' to='/contact'>Contact</Link></li>
            // </ul>
    //       </div>
    //     </nav>
    //   </div>
    // </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Header));
