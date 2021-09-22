import React from 'react';
import axios from 'axios';
import { toastr } from '../../../components/toastr/toastr.component';

class Error extends React.Component {
  constructor() {
    super();

    this.state = {
      pending: false,
      errors: []
    }
  }

  componentDidMount() {
    this.setState({ pending: true });
    axios.get(`/api/logError`).then(({ data }) => {
      this.setState({ pending: false, errors: data });
    }).catch(() => toastr('error', 'Eroare la prealuarea erorilor!'));
  }

  render() {
    return (
      <div>salut</div>
    )
  }
}

export default Error;
