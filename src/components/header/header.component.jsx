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

import  { ADMIN_HEADER_LINKS, CLIENT_HEADER_LINKS } from './header.data';

import './header.styles.scss';

const Header = ({ setCurrentUser, currentUser, history }) => {
  let links = [];
  const { first_name, last_name } = currentUser;

  if (currentUser.role === 'sa' || currentUser.role === 'admin') {
    links = ADMIN_HEADER_LINKS;
  } else {
    links = CLIENT_HEADER_LINKS;
  }

  return (
    <div className='header'>
      <div className='row'>
        <div className='col-sm-1'>
          <div className='logo' onClick={() => history.push('/')}></div>
        </div>
        <div className='col-sm-7 links-wrap'>
          {
            _.map(links, link => (
              link.dropdown ?
              <Dropdown key={link.name}>
                <Dropdown.Toggle>{link.icon} {link.name}</Dropdown.Toggle>

                <Dropdown.Menu>
                  {
                    _.map(link.children, child => (
                      <Link key={child.name} to={child.path}>{child.name}</Link>
                    ))
                  }
                </Dropdown.Menu>
              </Dropdown>
              :
              <Link key={link.name} to={link.path}>{link.icon} {link.name}</Link>
            ))
          }
        </div>
        <div className='col-sm-4 user-wrap'>
          <Dropdown>
            <Dropdown.Toggle><FontAwesomeIcon icon={faCog} className='fa-spin' /> {first_name} {last_name}</Dropdown.Toggle>

            <Dropdown.Menu>
              <Link to='/'><FontAwesomeIcon icon={faIdBadge} /> MODIFICARE PROFIL</Link>
              <Link to='/'><FontAwesomeIcon icon={faKey} /> RESETARE PAROLA</Link>
            </Dropdown.Menu>
          </Dropdown>
          <span className='logout' onClick={() => setCurrentUser(null)}><FontAwesomeIcon icon={faPowerOff} /> DECONECTARE</span>
        </div>
      </div>
    </div>
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
