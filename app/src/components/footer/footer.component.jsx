import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCalendarAlt, faCity, faEnvelope, faHome, faMapMarker, faMoneyCheckAlt, faPhone, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faDiscourse, faFacebook} from '@fortawesome/free-brands-svg-icons';

import './footer.styles.scss';

const Footer = () => {

  return (
    <footer id='footer'>
      <div className="row m-0">
      <div className="col-12 col-lg-4">
          <Card>
            <Card.Header>Servicii</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <ul className='navbar-nav ms-auto'>
                  <li className='navbar-item'><Link className='nav-link' to='/services'><FontAwesomeIcon icon={faAngleRight} /> Evaluarea psihologică clinică</Link></li>
                  <li className='navbar-item'><Link className='nav-link' to='/services'><FontAwesomeIcon icon={faAngleRight} /> Evaluarea psihologică în vederea selecției pentru angajare/admitere</Link></li>
                  <li className='navbar-item'><Link className='nav-link' to='/services'><FontAwesomeIcon icon={faAngleRight} /> Coaching/Dezvoltare personală</Link></li>
                  <li className='navbar-item'><Link className='nav-link' to='/services'><FontAwesomeIcon icon={faAngleRight} /> Meditație</Link></li>
                  <li className='navbar-item'><Link className='nav-link' to='/services'><FontAwesomeIcon icon={faAngleRight} /> Hipnoză</Link></li>
                </ul>
              </blockquote>
            </Card.Body>
          </Card>
        </div>
        <div className="col-12 col-lg-4">
          <Card>
            <Card.Header>Contact</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <ul className='navbar-nav ms-auto'>
                  <li className='navbar-item'><a className='nav-link' href='tel:+40743210200/'><FontAwesomeIcon icon={faPhone} /> +40743210200</a></li>
                  <li className='navbar-item'><a className='nav-link' href='mailto:psihologiuliagherasa@gmail.com'><FontAwesomeIcon icon={faEnvelope} /> psihologiuliagherasa@gmail.com</a></li>
                  <li className='navbar-item'><a className='nav-link' href='https://facebook.com/psihologiuliagherasa'><FontAwesomeIcon icon={faFacebook} /> Facebook</a></li>
                  <li className='navbar-item'><Link className='nav-link' to='/appointment'><FontAwesomeIcon icon={faCalendarAlt} /> Programări online</Link></li>
                  <li className='navbar-item'><Link className='nav-link' to='/contact'><FontAwesomeIcon icon={faCity} /> Suceava, România</Link></li>
                  <li className='navbar-item'><Link className='nav-link' to='/contact'><FontAwesomeIcon icon={faMapMarker} /> str. Suceava, nr 21</Link></li>
                </ul>
              </blockquote>
            </Card.Body>
          </Card>
        </div>
        <div className="col-12 col-lg-4">
          <Card>
            <Card.Header>Legendă</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <ul className='navbar-nav ms-auto'>
                  <li className='navbar-item'><Link className='nav-link' to='/'><FontAwesomeIcon icon={faHome} /> Acasă</Link></li>
                  <li className='navbar-item'><Link className='nav-link' to='/about'><FontAwesomeIcon icon={faUserAlt} /> Despre mine</Link></li>
                  <li className='navbar-item'><Link className='nav-link' to='/services'><FontAwesomeIcon icon={faDiscourse} /> Servicii</Link></li>
                  <li className='navbar-item'><Link className='nav-link' to='/price'><FontAwesomeIcon icon={faMoneyCheckAlt} /> Tarife</Link></li>
                  <li className='navbar-item'><Link className='nav-link' to='/appointment'><FontAwesomeIcon icon={faCalendarAlt} />  Programări online</Link></li>
                  <li className='navbar-item'><Link className='nav-link' to='/contact'><FontAwesomeIcon icon={faPhone} />  Contact</Link></li>
                </ul>
              </blockquote>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="row m-0">
        <div className="col-12 mt-4">
            <p className="text-center copyright">&copy; {new Date().getFullYear()} Psiholog Iulia Gherasă. Toate drepturile rezervate.</p>
        </div>
      </div>

      <scroll-top></scroll-top>
    </footer>
  )
};

export default Footer;
