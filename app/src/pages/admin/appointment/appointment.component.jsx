import React from 'react';
import axios from 'axios';
import { cloneDeep, filter } from 'lodash';
import { Row, Col, Tooltip, Whisper } from 'rsuite';
import { toastr } from '../../../components/toastr/toastr.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Loading from '../../../components/loading/loading.component';
import Table from '../../../components/rsuite/table/table.component';

class AppointmentPage extends React.Component {
  constructor() {
    super();

    this.state = {
      pending: false,
      appointments: [],
      oldData: []
    };

    this.table = React.createRef();
  }

  componentDidMount() {
    this.setState({ pending: true });
    axios.get('/api/appointment').then(({ data }) => {
      this.setState({ pending: false, appointments: data, oldData: cloneDeep(data) });
    }).catch(() => toastr('error', 'Eroare la preluarea programărilor!'));
  };

  handleDelete = id => {
    const { appointments } = this.state;

    this.setState({ pending: true });
    axios.delete(`/api/appointment/${id}`).then(() => {
      this.setState({ pending: false, appointments: filter(appointments, r => r.id !== id)});
      toastr('success', 'Programarea a fost ștearsă cu succes!');
    }).catch(() => toastr('error', 'Eroare la ștergerea programării!'));
  };

  handleTable = () => {
    const { appointments, oldData } = this.state;

    const table = {
      items: appointments,
      rowHeight: 30,
      bottom: 120,
      columns: [
        {
          flexGrow: 1, header: 'Nume', rowData: (rowData) => <div>{rowData.first_name} {rowData.last_name}</div>
        },
        {
          width: 150, header: 'Email', dataKey: 'email', align: 'center'
        },
        {
          width: 150, header: 'Telefon', dataKey: 'phone', align: 'center'
        },
        {
          width: 150, header: 'Data', dataKey: 'date_view', align: 'center'
        },
        { width: 30, header: ' ', align: 'center', rowData: (rowData, dataKey) => (
          <div className='cursor-pointer' onMouseLeave={() => this.setState({ ...this.state, showTooltip: null })} onMouseEnter={() => this.setState({ ...this.state, showTooltip: dataKey })}>
            {
              this.state.showTooltip === dataKey ?
                <Whisper placement='left' trigger='hover' speaker={tooltip} delayHide={0} delayShow={0}>
                  <span>
                    <FontAwesomeIcon onClick={() => this.handleDelete(rowData.id)} className='text-danger font-16' icon={faTrashAlt} />
                  </span>
                </Whisper>
              :
              <FontAwesomeIcon className='text-danger font-16' icon={faTrashAlt} onClick={() => this.handleDelete(rowData.id)} />
            }
          </div>
        )
      }
      ]
    };

    if (oldData.length) {
      return (
        <Table
          ref={this.table}
          {...table}
        />
      )
    } else {
      return null;
    }
  };

  render() {
    const { pending, appointments } = this.state;
    const todayApp = appointments.filter(r => new Date(r.date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0))

    return (
      <div className='appointment-page container-lg mt-3'>
        <Loading pending={pending} />

        <Row>
          <Col xs={8}>Programări astăzi: <span className='bold'>{todayApp.length}</span></Col>
          <Col xs={8}>
            <h4 className='text-center'>Programări online</h4>
          </Col>
          <Col xs={8} className='text-end'></Col>
        </Row>

        { this.handleTable() }
      </div>
    );
  };

}

export default AppointmentPage;

const tooltip = (<Tooltip>Șterge programare</Tooltip>);