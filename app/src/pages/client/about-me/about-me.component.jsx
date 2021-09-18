import React from 'react';
import profile from '../../../assets/images/rsz_profile.png';
import { Link } from 'react-router-dom';

import './about-me.styles.scss';

class AboutMe extends React.Component {
  render() {
    return (
      <div className='about-me'>
        <div className='row mx-0 mt-2'>
          <div className='col-12 breadcrumbs fw-bold'>
            <Link className='nav-link px-0 d-inline-block' to='/'>Acasă</Link>
            <span className='mx-1'>&gt;</span>
            <Link className='nav-link px-0 d-inline-block active' to='/about'>Despre mine</Link>
          </div>
        </div>

        <div className='row mx-0 mt-5'>
          <div className='col-12 col-lg-6 order-2 text-center'>
            <em className='d-lg-flex flex-column justify-content-center h-100'>
              <h3 className='title d-block mt-5 mt-lg-0 mb-5 mb-lg-3'>Bună! Eu sunt Iulia.</h3>
              <span className='content d-block mb-3 text-secondary'>
                Am absolvit Facultatea de Psihologie și Științe ale Educației din cadrul Universității Alexandru Ioan Cuza din Iași, programul de masterat Psihologie Clinică și Psihoterapie și în prezent sunt specializată în psihologie clinică și psihologie aplicată în domeniul securității naționale. Totuși, nu pot să nu remarc faptul că cele mai multe cunoștințe le-am dobândit din experiență și mai puțin din cărți.
              </span>
              <span className='content d-block mb-5 text-secondary'>
                Din cauza, sau mai bine spus, datorită faptului că eu însămi am avut o mulțime de întrebări la care nu găseam răspuns, am ales acest drum, să mă descopăr pe mine și ulterior să te ajut și pe tine să te descoperi. Pentru că sunt o fire curioasă, empatică,  altruistă și sunt pasionată de misterele minții umane, practic cu mare drag această profesie  de peste 7 ani.
                Îmi doresc să aflăm împreună ce se întâmplă cu tine și să te ajut să dobândești o perspectivă mai rațională și mai obiectivă asupra diferitelor situații sa uprobleme cu care te confrunți.
              </span>
              <span className='content d-block mb-3 mt-2 text-secondary'>
                Așadar, te aștept cu drag să descoperim lucruri fascinante împreună!
              </span>
            </em>
          </div>
          <div className='col-12 order-1 col-lg-6'>
            <img className='profile' src={profile} alt='Psiholog Gherasă Iulia' />
          </div>
        </div>
      </div>
    )
  }
}

export default AboutMe;
