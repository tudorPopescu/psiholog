import React from 'react';
import axios from 'axios';
import { toastr } from '../../../components/toastr/toastr.component';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Link } from 'react-router-dom';

import Loading from '../../../components/loading/loading.component';

import './contact.styles.scss';

class Contact extends React.Component {
  constructor() {
    super();

    this.state = {
      pending: false,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      message: '',
      required: {}
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value, required: { ...this.state.required, [name]: false, email_regex: [name] === 'email' ? false : this.state.required.email_regex } });
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.validation()) {
      this.setState({ ...this.state, pending: true });
      axios.post('/api/contact', this.state).then(() => {
        toastr('success', 'Mesajul a fost trimis cu succes!');
        this.setState({ pending: false, required: {} })
      }).catch(() => toastr('error', 'Eroare la trimite/rea mesajului!'));
    }
  }

  validation() {
    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const { first_name, last_name, email, phone, message } = this.state;
    const required = {};
    let ok = true;

    if (!first_name) {
      required.first_name = true;
      ok = false;
    }
    if (!last_name) {
      required.last_name = true;
      ok = false;
    }
    if (!email) {
      required.email = true;
      ok = false;
    }
    if (email && !regexEmail.test(email)) {
      required.email_regex = true;
      ok = false;
    }
    if (!phone) {
      required.phone = true;
      ok = false;
    }
    if (!message) {
      required.message = true;
      ok = false;
    }

    this.setState({ ...this.state, required: required });

    return ok;
  }

  render() {
    const { first_name, last_name, email, phone, message, required, pending } = this.state;
    const { google } = this.props;

    return (
      <div className='contact'>
        <Loading pending={pending} />
        <div className='row mx-0 mt-2'>
          <div className='col-12 breadcrumbs fw-bold'>
            <Link className='nav-link px-0 d-inline-block' to='/'>Acasă</Link>
            <span className='mx-1'>&gt;</span>
            <Link className='nav-link px-0 d-inline-block active' to='/contact'>Contact</Link>
          </div>
        </div>

        <div className='container'>
          <div className='row mx-0'>
            <div className='col-12'>
              <h3 className='title fst-italic'>Str. Ana Ipătescu, nr. 10, bl. A, sc. C, ap. 2, Suceava</h3>
              <h3 className='title fst-italic'>+4 0743 210 200</h3>
              <h3 className='title fst-italic'>psihologiuliagherasa@gmail.com</h3>
            </div>

            <div className='col-12 col-lg-6'>
              <h3 className='title'>Lăsați-mi un mesaj:</h3>
              <hr className='custom-hr' />
            </div>

            <div className='col-12 contact-form'>
              <form className='row mx-0'>
                <div className='col-12 col-lg-6 p-0'>
                  <div className='row mx-0'>
                    <div className='col-12 col-sm-6 pb-3 p-0 pe-sm-2 pe-lg-3 position-relative'>
                      <label className='label'>Nume*</label>
                      <input className='form-control text-capitalize' name='first_name' value={first_name} onChange={this.handleChange} autoComplete='off' maxLength='150' />
                      { required.first_name && <small className='error-msg'>Câmpul este obligatoriu.</small> }
                    </div>
                    <div className='col-12 col-sm-6 pb-3 p-0 ps-sm-2 ps-lg-3 position-relative'>
                      <label className='label'>Prenume*</label>
                      <input className='form-control text-capitalize' name='last_name' value={last_name} onChange={this.handleChange} autoComplete='off' maxLength='150' />
                      { required.last_name && <small className='error-msg'>Câmpul este obligatoriu.</small> }
                    </div>
                    <div className='col-12 col-sm-6 pb-3 p-0 pe-sm-2 pe-lg-3 position-relative'>
                      <label className='label'>Email*</label>
                      <input className='form-control' value={email} name='email' onChange={this.handleChange} autoComplete='off' type='email' maxLength='150' />
                      { required.email && <small className='error-msg'>Câmpul este obligatoriu.</small> }
                      { required.email_regex && <small className='error-msg'>Adresa de email nu este validă!</small> }
                    </div>
                    <div className='col-12 col-sm-6 pb-3 p-0 ps-sm-2 ps-lg-3 position-relative'>
                      <label className='label'>Telefon</label>
                      <input className='form-control' value={phone} name='phone' onChange={this.handleChange} autoComplete='off' type='phone' maxLength='20' />
                      { required.phone && <small className='error-msg'>Câmpul este obligatoriu.</small> }
                    </div>
                    <div className='textarea-wrap col-12 pb-3 p-0 position-relative'>
                      <label className='label'>Mesaj*</label>
                      <textarea className='form-control' rows='4' name='message' value={message} onChange={this.handleChange} autoComplete='off' maxLength='1000'></textarea>
                      { required.message && <small className='error-msg'>Câmpul este obligatoriu.</small> }
                    </div>
                  </div>
                </div>

                <div className='col-12 p-0 pt-3 pt-lg-1'>
                  <button className='submit-btn' onClick={this.handleSubmit}>
                    <span className='text-uppercase'>Trimite</span>
                  </button>
                </div>
              </form>
            </div>

            <div className='row px-0'>
              <div className='col-12 position-relative map-wrap'>
                <Map google={google} zoom={20} initialCenter={{lat: -1.2884, lng: 36.8233}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqJPmzM-3zVRMj2tNfT4gtokuWCGgxgcY'
})(Contact);
