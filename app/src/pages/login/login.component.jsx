import React from 'react';
import axios from 'axios';
import Loading from '../../components/loading/loading.component';
import { toastr } from '../../components/toastr/toastr.component';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';

import './login.scss';

class LoginPage extends React.Component {
  constructor() {
    super();

    this.state = {
      pending: false,
      email: '',
      password: '',
      message: null,
      authenticated: null
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { setCurrentUser } = this.props;

    if (this.validation()) {
      this.setState({ pending: true });
      axios.post('/login', { email: this.state.email, password: this.state.password }).then(resp => {
        this.setState({ pending: false });
        if (!resp.data.success && !resp.data.token) {
          this.setState({ message: resp.data.message + '!' });
        } else {
          this.setState({ message: '' });
          setCurrentUser(resp.data);
          this.props.history.push('/appointment');
        }
      }).catch(() => toastr('error', 'Eroare autentificare!'));
    } else {
      this.setState({ pending: false });
    }
  }

  validation() {
    let regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    if (!this.state.email) {
      toastr('error', 'Adresa de email este obligatorie!');
      return false;
    }
    if (this.state.email && !regexEmail.test(this.state.email)) {
      toastr('error', 'Adresa de email nu este corectă!');
      return false;
    }
    if (!this.state.password) {
      toastr('error', 'Parola este obligatorie!');
      return false;
    }
    return true;
  }

  render() {
    const { pending, email, password, message } = this.state;

    return (
      <div>
        <Loading pending={pending} />
        <section className='main'>
          <p className='sign' align='center'>Autentificare</p>
          <form>
            <div className='form-group mb-3'>
              <input className='email' name='email' autoComplete='off' value={email} onChange={this.handleChange} type='email' placeholder='Email' />
              <input className='password' name='password' autoComplete='off' value={password} onChange={this.handleChange} type='password' placeholder='Parola' />
              <button onClick={this.handleSubmit}></button>
              <button className='submit-btn' onClick={this.handleSubmit}>
                <span className='text-uppercase'>Autentificare</span>
              </button>
            </div>
            <div className='clearfix'></div>
            {message ? <div className='error mt-3 text-center text-danger'>{message}</div> : null}
          </form>
        </section>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(LoginPage);
