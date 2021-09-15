import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.reselect';
import { setCurrentUser } from '../../redux/user/user.actions';
import { Navbar } from 'react-bootstrap';

import logo from '../../assets/images/logo-no-bg.png';
import './header.styles.scss';

const Header = ({ location, setCurrentUser, currentUser }) => (
  <div id='header'>
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
            <li className={`navbar-item ${location.pathname === '/' ? 'active': ''}`}><Link className='nav-link' to='/'>Acasă</Link></li>
            <li className={`navbar-item ${location.pathname === '/about' ? 'active': ''}`}><Link className='nav-link' to='/about'>Despre mine</Link></li>
            <li className={`navbar-item`}><Link className='nav-link' to='/services'>Servicii</Link></li>
            <li className={`navbar-item`}><Link className='nav-link' to='/price'>Tarife</Link></li>
            <li className={`navbar-item`}><Link className='nav-link' to='/appointment'>Programări online</Link></li>
            <li className={`navbar-item`}><Link className='nav-link' to='/contact'>Contact</Link></li>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    </div>
  </div>
);

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
