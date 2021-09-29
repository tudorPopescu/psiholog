import React from 'react';
import axios from 'axios';
import * as dayjs from 'dayjs';
import Loading from '../../../components/loading/loading.component';
import { toastr } from '../../../components/toastr/toastr.component';
import { Link } from 'react-router-dom';
import { DatePicker } from 'rsuite';

import './appointment.styles.scss';

class Appointment extends React.Component {
  constructor() {
    super();

    this.state = {
      pending: false,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      date: null,
      required: {}
    }
  }

  handleChange = (name, value) => {
    this.setState({ ...this.state, [name]: name === 'date' ? new Date(value) : value, required: { ...this.state.required, [name]: false, email_regex: [name] === 'email' ? false : this.state.required.email_regex } });
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.validation()) {
      this.setState({ ...this.state, pending: true });
      axios.post('/api/appointment', this.state).then(() => {
        toastr('success', 'Programarea a fost făcută cu succes!');
        this.setState({ first_name: '', last_name: '', email: '', phone: '', date: '', success: true, pending: false, required: {} });
      }).catch(() => toastr('error', 'Eroare la realizarea programării!'));
    }
  }

  validation() {
    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const { first_name, last_name, email, phone, date } = this.state;
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
    if (!date) {
      required.date = true;
      ok = false;
    }

    this.setState({ ...this.state, required: required });

    return ok;
  }

  render() {
    const { first_name, last_name, email, phone, date, required, pending, success } = this.state;

    return (
      <div className='appointment'>
        <Loading pending={pending} />

        <div className='row mx-0 mt-2'>
          <div className='col-12 breadcrumbs fw-bold'>
            <Link className='nav-link px-0 d-inline-block' to='/'>Acasă</Link>
            <span className='mx-1'>&gt;</span>
            <Link className='nav-link px-0 d-inline-block active' to='/appointment'>Programări online</Link>
          </div>
        </div>

        <div className='container'>
          <div className='row mx-0'>
            <div className='col-12'>
              <h3 className='title fst-italic'>Completează datele necesare pentru o programare:</h3>
              <hr className='custom-hr' />
            </div>

            <div className='col-12 appointment-form'>
              <form className='row mx-0'>
                <div className='col-12 col-lg-6 p-0'>
                  <div className='row mx-0'>
                    <div className='col-12 col-sm-6 pb-3 p-0 pe-sm-2 pe-lg-3 position-relative'>
                      <label className='label'>Nume*</label>
                      <input className='form-control text-capitalize' name='first_name' value={first_name} onChange={e => this.handleChange('first_name',  e.target.value)} autoComplete='off' maxLength='60' />
                      { required.first_name && <small className='error-msg'>Câmpul este obligatoriu.</small> }
                    </div>
                    <div className='col-12 col-sm-6 pb-3 p-0 ps-sm-2 ps-lg-3 position-relative'>
                      <label className='label'>Prenume*</label>
                      <input className='form-control text-capitalize' name='last_name' value={last_name} onChange={e => this.handleChange('last_name',  e.target.value)} autoComplete='off' maxLength='60' />
                      { required.last_name && <small className='error-msg'>Câmpul este obligatoriu.</small> }
                    </div>
                    <div className='col-12 col-sm-6 pb-3 p-0 pe-sm-2 pe-lg-3 position-relative'>
                      <label className='label'>Email*</label>
                      <input className='form-control' value={email} name='email' onChange={e => this.handleChange('email',  e.target.value)} autoComplete='off' type='email' maxLength='90' />
                      { required.email && <small className='error-msg'>Câmpul este obligatoriu.</small> }
                      { required.email_regex && <small className='error-msg'>Adresa de email nu este validă!</small> }
                    </div>
                    <div className='col-12 col-sm-6 pb-3 p-0 ps-sm-2 ps-lg-3 position-relative'>
                      <label className='label'>Telefon*</label>
                      <input className='form-control' value={phone} name='phone' onChange={e => this.handleChange('phone',  e.target.value)} autoComplete='off' type='phone' maxLength='11' />
                      { required.phone && <small className='error-msg'>Câmpul este obligatoriu.</small> }
                    </div>
                    <div className='col-12 col-sm-6 pb-3 p-0 pe-lg-3 position-relative'>
                      <label className='label'>Data*</label>
                      <DatePicker name='date' block disabledDate={date => date < new Date() || new Date(date).getDay() === 0 || new Date(date).getDay() === 6 } value={date} onOk={date => this.handleChange('date',  date)} oneTap onSelect={date => this.handleChange('date',  date)} onClean={() => this.setState({ date: null })} locale={locale} placeholder='zz.ll.aaaa' isoWeek ranges={ranges} format='dd.MM.yyyy' />
                      { required.date && <small className='error-msg'>Câmpul este obligatoriu.</small> }
                    </div>
                  </div>
                </div>

                <div className='col-12 p-0 pt-3 mt-4 pt-lg-1'>
                  <button className='submit-btn' onClick={this.handleSubmit}>
                    <span className='text-uppercase'>Trimite</span>
                  </button>
                </div>

                { success &&
                  <div className='col-12 p-0 pt-3'>
                    <span className='text-success subtitle fw-bold fst-italic'>Mulțumesc pentru programare.<br/>Te voi contacta în cel mai scurt timp posibil!</span>
                  </div>
                }
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default Appointment;

const locale= {
  sunday: 'Du',
  monday: 'Lu',
  tuesday: 'Ma',
  wednesday: 'Mie',
  thursday: 'Joi',
  friday: 'Vi',
  saturday: 'Sâ',
  ok: 'Adaugă',
  yesterday: 'Ieri'
};

const ranges = [{
  label: 'Mâine',
  value: new Date() + 1
}]