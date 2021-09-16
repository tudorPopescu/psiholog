import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import './price.styles.scss';

class Price extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className='price'>
        <div className='row mx-0 mt-2'>
          <div className='col-12 fw-bold'>
            <Link className='nav-link px-0 d-inline-block' to='/'>Acasă</Link>
            <span className='mx-1'>&gt;</span>
            <Link className='nav-link px-0 d-inline-block active' to='/price'>Tarife</Link>
          </div>
        </div>
        <div className='row mx-0 mt-5'>
          <div className='col-12 col-lg-6'>
            <ul>
            <li class="card">
                <div class="card__flipper">
                  <div class="card__front">
                    <p class="card__name"><span>Tony</span><br/>Romo</p>
                    <p class="card__num">9</p>
                  </div>
                  <div class="card__back">
                    <svg height="180" width="180">
                      <circle cx="90" cy="90" r="55" stroke="#514d9b" stroke-width="35"  />
                    </svg>
                    <span>113.2</span>
                  </div>
                </div>

              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Price;
