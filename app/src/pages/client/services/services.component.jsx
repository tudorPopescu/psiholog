import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import './services.styles.scss';

class Services extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className='services'>
        <div className='row mx-0 mt-2'>
          <div className='col-12 fw-bold'>
            <Link className='nav-link px-0 d-inline-block' to='/'>Acasă</Link>
            <span className='mx-1'>&gt;</span>
            <Link className='nav-link px-0 d-inline-block active' to='/services'>Servicii</Link>
          </div>
        </div>
        <div className='row mx-0 mt-5'>
          <div className='col-12 col-lg-6'>
            <div class='card'>
                <div class='card-body'>
                  <div className='text-center'><FontAwesomeIcon icon={faMale} /></div>
                  <h5 className='card-title text-center mt-3'><em>Evaluarea psihologică clinică a adultului</em></h5>
                  <hr className='mx-2'/>
                  <h6 className='card-subtitle mb-2 mx-2 text-muted'><em>Card subtitle</em></h6>
                </div>
              </div>
            -	Evaluarea psihologică clinică a adultului
            -	evaluareapsihologicăclinică a copilului
            -	psihodiagnostic (C.E.S., ComisiapentruPersoane cu Handicap etc)
            -	Evaluareapsihologicăînvedereaselecțieipentruangajare/admitere
            -	Evaluareapsihologicăpentrudeținereașiutilizareaarmelorșimunițiilorsupuseautorizării
            -	Consiliere psihologică în probleme precum anxietate, depresie, traume, tulburări psihotice, 
            -	Coaching/Dezvoltare personală
            -	Meditație
            -	Hipnoză
          </div>
        </div>
      </div>
    )
  }
}

export default Services;
