import React from 'react';

import './not-found.styles.scss';

class NotFoundPage extends React.Component {
  render() {
    return (
      <div className='not-found'>
        <div className='row mx-0'>
          <div className='col-12 text-center'>
            <h1 className='404'>404</h1>
          </div>
          <div className='col-12 text-center mt-3'>
            <h3 className='title fst-italic'>Această pagină nu a putut fi gasită!</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default NotFoundPage;
