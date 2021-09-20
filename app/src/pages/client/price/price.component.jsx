import React from 'react';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import './price.styles.scss';

class Price extends React.Component {
  constructor() {
    super();

    this.state = {
      prices: [
        { name: 'Examen psihologic pentru Comisia de Handicap', price: '150' },
        { name: 'Evaluare psihologică', price: '150' },
        { name: 'Examen psihologic copii clasa 0', price: '100' },
        { name: 'Examen psihologic copii CES (pentru orientare școlară)', price: '100' },
        { name: 'Examen psihologic pentru Comisia de Expertiză Medicală a Capacității de Muncă', price: '150' },
        { name: 'Examen psihologic copii cu dizabilități pentru Comisia de Handicap', price: '100' },
        { name: 'Evaluare psihologică complexă periodică', price: '80' },
        { name: 'Deplasarea la domiciliu pentru pacienții nedeplasabili', price: '250' },
        { name: 'Consiliere psihologică', price: '150' },
        { name: 'Dezvoltare personală', price: '150' },
        { name: 'Aviz psihologic funcție de conducere', price: '90' },
        { name: 'Aviz psihologic concurs instituție publică', price: '90' },
        { name: 'Aviz psihologic cadru didactic', price: '80' },
        { name: 'Aviz psihologic angajare', price: '50' },
        { name: 'Aviz psihologic control periodic', price: '50' },
        { name: 'Aviz psihologic admitere concurs', price: '80' },
        { name: 'Aviz psihologic obținere/prelungire permis port armă', price: '100' },
        { name: 'Aviz psihologic înființare societate pază și protecție', price: '100' },
        { name: 'Aviz psihologic încadrare/concurs M.A.I./M.Ap.N./A.N.I./A.N.P.', price: '100' },
        { name: 'Aviz psihologic voluntariat I.S.U./S.M.U.R.D.', price: '50' },
        { name: 'Aviz psihologic atestat detectiv particular', price: '100' },
        { name: 'Aviz psihologic pirotehnician/artificier', price: '100' },
        { name: 'Aviz psihologic angajare agent pază/polițist comunitar', price: '100' },
        { name: 'Aviz psihologic agent pază și ordine', price: '100' }
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
          <div className='col-12 breadcrumbs fw-bold'>
            <Link className='nav-link px-0 d-inline-block' to='/'>Acasă</Link>
            <span className='mx-1'>&gt;</span>
            <Link className='nav-link px-0 d-inline-block active' to='/price'>Tarife</Link>
          </div>
        </div>
        <div className='container'>
          <div className='row mx-0 mt-5'>
            {
              map(prices, (r, i) => (
                <div className='col-12 col-md-6 col-lg-4' key={i}>
                  <div className='card'>
                    <h5 className='title fst-italic'>{r.name}</h5>
                    <hr />
                    <h4 className='subtitle text-center pt-3 fs-4'>{r.price} RON</h4>
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
