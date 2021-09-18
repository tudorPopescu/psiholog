import React from 'react';
import chairs from '../../../assets/images/chairs.jpg';
import college from '../../../assets/images/colegiu.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';

import './home-page.styles.scss';

class ClientHomePage extends React.Component {
  render() {
    return (
      <div className='home-page'>
        <div className='container'>
          <div className='row mx-0'>
            <div className='col-12 py-3 my-3 text-center'>
              <img className='college' src={college} alt='Cabinetul psihologilor din Romania' />
            </div>
            <div className='col-12'>
              <h5 className='title text-center position-relative my-4 py-4'>
                <span className='d-block mb-3'><FontAwesomeIcon icon={faQuoteRight} className='left-quote' />Unicul om cu care să te compari ești tu, cel din trecut.</span>
                <span className='d-block'>Și singurul, față de care trebuie să fii mai bun ești tu, în prezent.<FontAwesomeIcon icon={faQuoteRight} className='right-quote' /></span>
              </h5>
              <h6 className='text-secondary text-end fst-italic'>Sigmund Freud</h6>
            </div>

            <div className='col-12 mt-3 text-center my-3 py-3'>
            <img className='chairs w-100' src={chairs} alt='Cabinet Psiholog Iulia Gherasa' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ClientHomePage;
