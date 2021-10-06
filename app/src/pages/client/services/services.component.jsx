import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale, faBriefcase, faDiagnoses, faBrain, faStopwatch, faChalkboardTeacher, faHammer, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import './services.styles.scss';

class Services extends React.Component {
  constructor() {
    super();

    this.state = {
      services: [
        { name: 'Evaluarea psihologică clinică a adultului/ copilului', description: 'Este un interviu condus de către psiholog la care se adaugă o serie de instrumente de testare care evaluează inteligența/abilitatea cognitivă.', icon: faMale },
        { name: 'Psihodiagnostic', description: 'Evaluare complexă ce se concentrează asupra cunoașterii factorilor psihologici cu relevanță pentru sănătatea psihică umană.', icon: faDiagnoses },
        { name: 'Evaluarea psihologică în vederea selecției pentru angajare/admitere', description: 'Avizul psihologic este un document care atestă faptul că o persoană este aptă pentru cererea pe care dorește să o depună.', icon: faBriefcase },
        { name: 'Evaluarea psihologică pentru permis de port armă', description: 'Avizul psihologic pentru permisul de port armă este un document care atestă faptul că o persoană este aptă pentru a deține și utiliza o armă letală/neletală.', icon: faHammer },
        { name: 'Consiliere psihologică', description: 'Este o formă de intervenție psihologică ce se adresează persoanelor sănătoase care se află într-o situație de impas în ceea ce privește rezolvarea anumitor situații de criză, profesionale, familiale sau sociale.', icon: faCommentDots },
        { name: 'Coaching', description: 'Explorarea anumitor gânduri și credințe limitative și identificarea posibilităților de acțiune în vederea îmbunătățirii calității vieții.', icon: faChalkboardTeacher },
        { name: 'Meditație', description: 'O pauză conștientă de la agitația cotidiană și de la activitățile exterioare care par că nu se mai termină niciodată.', icon: faBrain },
        { name: 'Hipnoză', description: 'Componentă clinică și terapeutică ce implică aplicarea unor proceduri și sugestii care duc la trăirea sau retrăirea unor experiențe imaginare.', icon: faStopwatch }
      ]
    }
  }
  render() {
    const { services } = this.state;

    return (
      <div className='services'>
        <div className='row mx-0 mt-2'>
          <div className='col-12 breadcrumbs fw-bold'>
            <Link className='nav-link px-0 d-inline-block' to='/'>Acasă</Link>
            <span className='mx-1'>&gt;</span>
            <Link className='nav-link px-0 d-inline-block active' to='/services'>Servicii</Link>
          </div>
        </div>
        <div className='container'>
          <div className='row mx-0 mt-5'>
            {
              map(services, (r, i) => (
                <div className='col-12 col-md-6 col-lg-4 mb-3' key={i}>
                  <div className='card'>
                    <div className='text-center background-gold color-white pt-3 px-3'><FontAwesomeIcon icon={r.icon} /></div>
                    <div className='wrap'>
                      <h5 className='title fst-italic background-gold color-white py-3 px-3'>{r.name}</h5>
                    </div>
                    <h4 className='subtitle text-secondary fst-italic lh-base pt-3 pb-3 px-3'>{r.description}</h4>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        {/* <div className='row mx-0 mt-5'>
          <div className='col-12 col-lg-6'>
            <div className='card'>
              <div className='card-body'>
                <div className='text-center'><FontAwesomeIcon icon={faMale} /></div>
                <h5 className='title text-center mt-3'><em>Evaluarea psihologică clinică a adultului</em></h5>
                <hr className='mx-2'/>
                <h6 className='subtitle mb-2 mx-2 text-muted'><em>Card subtitle</em></h6>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

export default Services;
