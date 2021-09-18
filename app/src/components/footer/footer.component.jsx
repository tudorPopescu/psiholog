import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCalendarAlt, faCity, faEnvelope, faHome, faMapMarker, faMoneyCheckAlt, faPhone, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faDiscourse, faFacebook} from '@fortawesome/free-brands-svg-icons';

import './footer.styles.scss';

class Footer extends React.Component {
  scrollTop = () => window.scroll({ behavior: 'smooth', left: 0, top: 0 });

  render() {
    return (
      <footer id='footer'>
        <div className='row mx-0 px-0'>
          <div className='col-12 col-lg-4 gx-md-5'>
            <Card>
              <Card.Header>Servicii</Card.Header>
              <Card.Body className='ps-0'>
                <blockquote className='blockquote mb-0'>
                  <ul className='navbar-nav ms-auto'>
                    <li className='navbar-item'><Link className='nav-link py-0 text-secondary' to='/services' onClick={this.scrollTop}><FontAwesomeIcon icon={faAngleRight} /> Evaluarea psihologică clinică</Link></li>
                    <li className='navbar-item'><Link className='nav-link py-0 text-secondary' to='/services' onClick={this.scrollTop}><FontAwesomeIcon icon={faAngleRight} /> Evaluarea psihologică în vederea selecției pentru angajare/admitere</Link></li>
                    <li className='navbar-item'><Link className='nav-link py-0 text-secondary' to='/services' onClick={this.scrollTop}><FontAwesomeIcon icon={faAngleRight} /> Coaching/Dezvoltare personală</Link></li>
                    <li className='navbar-item'><Link className='nav-link py-0 text-secondary' to='/services' onClick={this.scrollTop}><FontAwesomeIcon icon={faAngleRight} /> Meditație</Link></li>
                    <li className='navbar-item'><Link className='nav-link py-0 text-secondary' to='/services' onClick={this.scrollTop}><FontAwesomeIcon icon={faAngleRight} /> Hipnoză</Link></li>
                  </ul>
                </blockquote>
              </Card.Body>
            </Card>
          </div>
          <div className='col-12 col-lg-4 gx-md-5'>
            <Card>
              <Card.Header>Contact</Card.Header>
              <Card.Body className='ps-0'>
                <blockquote className='blockquote mb-0'>
                  <ul className='navbar-nav ms-auto'>
                    <li className='navbar-item'><a className='nav-link py-0 text-secondary' href='tel:+40743210200/'><FontAwesomeIcon icon={faPhone} /> +40743210200</a></li>
                    <li className='navbar-item'><a className='nav-link py-0 text-secondary' href='mailto:psihologiuliagherasa@gmail.com'><FontAwesomeIcon icon={faEnvelope} /> psihologiuliagherasa@gmail.com</a></li>
                    <li className='navbar-item'><a className='nav-link py-0 text-secondary' href='https://facebook.com/psihologiuliagherasa'><FontAwesomeIcon icon={faFacebook} /> Facebook</a></li>
                    <li className='navbar-item'><Link className='nav-link py-0 text-secondary' to='/appointment' onClick={this.scrollTop}><FontAwesomeIcon icon={faCalendarAlt} /> Programări online</Link></li>
                    <li className='navbar-item'><Link className='nav-link py-0 text-secondary' to='/contact'><FontAwesomeIcon icon={faCity} /> Suceava, România</Link></li>
                    <li className='navbar-item'><Link className='nav-link py-0 text-secondary' to='/contact'><FontAwesomeIcon icon={faMapMarker} /> Str. Ana Ipătescu, nr. 10, bl. A, sc. C, ap. 2</Link></li>
                  </ul>
                </blockquote>
              </Card.Body>
            </Card>
          </div>
          <div className='col-12 col-lg-4 gx-md-5'>
            <Card>
              <Card.Header>Legendă</Card.Header>
              <Card.Body className='ps-0'>
                <blockquote className='blockquote mb-0'>
                  <ul className='navbar-nav ms-auto'>
                    <li className='navbar-item'><Link className='nav-link py-0 text-secondary' to='/' onClick={this.scrollTop}><FontAwesomeIcon icon={faHome} /> Acasă</Link></li>
                    <li className='navbar-item'><Link className='nav-link py-0 text-secondary' to='/about' onClick={this.scrollTop}><FontAwesomeIcon icon={faUserAlt} /> Despre mine</Link></li>
                    <li className='navbar-item'><Link className='nav-link py-0 text-secondary' to='/services' onClick={this.scrollTop}><FontAwesomeIcon icon={faDiscourse} /> Servicii</Link></li>
                    <li className='navbar-item'><Link className='nav-link py-0 text-secondary' to='/price' onClick={this.scrollTop}><FontAwesomeIcon icon={faMoneyCheckAlt} /> Tarife</Link></li>
                    <li className='navbar-item'><Link className='nav-link py-0 text-secondary' to='/appointment' onClick={this.scrollTop}><FontAwesomeIcon icon={faCalendarAlt} />  Programări online</Link></li>
                    <li className='navbar-item'><Link className='nav-link py-0 text-secondary' to='/contact' onClick={this.scrollTop}><FontAwesomeIcon icon={faPhone} />  Contact</Link></li>
                  </ul>
                </blockquote>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className='row m-0'>
          <div className='col-12 mt-4'>
              <p className='text-center copyright text-secondary'>&copy; {new Date().getFullYear()} Psiholog Iulia Gherasă. Toate drepturile rezervate.</p>
          </div>
        </div>
      </footer>
    )
  }
};

export default Footer;
