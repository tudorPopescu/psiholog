import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.reselect';
import { setCurrentUser } from '../../redux/user/user.actions';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../../assets/images/logo-no-bg.png';

import './header.styles.scss';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      show: false
    }
  }

  logOut = () => {
    this.props.setCurrentUser(null);

    setTimeout(() => {
      window.location.reload();
    });
  }

  render() {
    const { currentUser, location } = this.props;

    return (
      <div id='header' className='row mx-0'>
        <div className='col-12'>
          <Navbar className='navbar' collapseOnSelect expand='lg'>
            <div>
              <Link to='/' className='navbar-brand me-0'>
                <img className='logo' src={logo} alt='Psiholog Gherasă Iulia' />
              </Link>
              <div className='title-wrap d-none d-sm-inline-block'>
                <span className='title'>Psiholog Iulia Gherasă</span>
                <span className='subtitle text-secondary'>Cabinet Individual de Psihologie</span>
              </div>
            </div>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <ul className='navbar-nav ms-auto'>
                { !currentUser &&
                  <>
                  <Nav.Link as='li' eventKey='1' className='navbar-item'><Link className={`nav-link ${location.pathname === '/' ? 'active': ''}`} to='/'>Acasă</Link></Nav.Link>
                  <Nav.Link as='li' eventKey='2' className='navbar-item'><Link className={`nav-link ${location.pathname === '/about' ? 'active': ''}`} to='/about'>Despre mine</Link></Nav.Link>
                  <Nav.Link as='li' eventKey='3' className='navbar-item'><Link className={`nav-link ${location.pathname === '/services' ? 'active': ''}`} to='/services'>Servicii</Link></Nav.Link>
                  <Nav.Link as='li' eventKey='4' className='navbar-item'><Link className={`nav-link ${location.pathname === '/price' ? 'active': ''}`} to='/price'>Tarife</Link></Nav.Link>
                  <Nav.Link as='li' eventKey='5' className='navbar-item'><Link className={`nav-link ${location.pathname === '/appointment' ? 'active': ''}`} to='/appointment'>Programări online</Link></Nav.Link>
                  <Nav.Link as='li' eventKey='6' className='navbar-item'><Link className={`nav-link ${location.pathname === '/contact' ? 'active': ''}`} to='/contact'>Contact</Link></Nav.Link>
                  </>
                }
                {
                  currentUser &&
                  <>
                  <Nav.Link as='li' eventKey='7' className='navbar-item'><Link className='nav-link' to='/appointment'> Programari online</Link></Nav.Link>
                  <Nav.Link as='li' eventKey='8' className='navbar-item'><Link className='nav-link' to='/errors'> Erori</Link></Nav.Link>
                  <Nav.Link as='li' eventKey='9' className='navbar-item'><Link className='nav-link' to='/' onClick={() => this.logOut()}> Deconectare</Link></Nav.Link>
                  </>
                }
              </ul>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    )
  }
}

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
