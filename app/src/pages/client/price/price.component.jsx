import React from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import './price.styles.scss';

class Price extends React.Component {
  constructor() {
    super();

    this.state = {
      prices: [
        {name: 'Evaluarea psihologică clinică a adultului', price: 60},
        {name: 'Evaluarea psihologică clinică a adultului', price: 60},
        {name: 'Evaluarea psihologică clinică a adultului', price: 60}
      ]
    }
  }

  componentDidMount() {
  }

  render() {
    const { prices } = this.state;

    return (
      <div className='price'>
        <div className='row mx-0 mt-2'>
          <div className='col-12 fw-bold'>
            <Link className='nav-link px-0 d-inline-block' to='/'>Acasă</Link>
            <span className='mx-1'>&gt;</span>
            <Link className='nav-link px-0 d-inline-block active' to='/price'>Tarife</Link>
          </div>
        </div>
        <div className='container'>
          <div className='row mx-0 mt-5'>
            {
              map(prices, r => (
                <div className='col-12 col-md-6 col-lg-4'>
                  <div className='card'>
                    <h5 className='card-title fst-italic'>{r.name}</h5>
                    <hr />
                    <h4 className='card-subtitle text-center pt-3 fs-1'>{r.price} RON</h4>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Price;
