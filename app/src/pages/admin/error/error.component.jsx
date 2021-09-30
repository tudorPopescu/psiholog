import React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { cloneDeep, filter, findIndex } from 'lodash';
import { Row, Col, Tooltip, Whisper } from 'rsuite';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setRenderedComponent } from '../../../redux/renderComponent/renderComponent.actions';
import { selectedRenderedComponent } from '../../../redux/renderComponent/renderComponent.reselect';
import { Button } from 'rsuite';
import { toastr } from '../../../components/toastr/toastr.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Loading from '../../../components/loading/loading.component';
import Table from '../../../components/rsuite/table/table.component';
import ErrorModal from './modal/error-modal.component';

class ErrorPage extends React.Component {
  constructor() {
    super();

    this.state = {
      pending: false,
      errors: [],
      oldData: []
    };

    this.table = React.createRef();
  }

  componentDidMount() {
    this.setState({ pending: true });
    axios.get('/api/logError').then(({ data }) => {
      this.setState({ pending: false, errors: data, oldData: cloneDeep(data) });
    }).catch(() => toastr('error', 'Eroare la preluarea datelor!'));
  };

  handleDelete = id => {
    const { errors } = this.state;

    this.setState({ pending: true });
    axios.delete(`/api/logError/${id}`).then(() => {
      this.setState({ pending: false, errors: filter(errors, r => r.id !== id)});
      toastr('success', 'Eroarea a fost ștearsă cu succes!');
    }).catch(() => toastr('error', 'Eroare la ștergerea erorii!'));
  };

  handleDeleteAll = () => {
    this.setState({ pending: true });
    axios.delete('/api/logError').then(() => {
      this.setState({ pending: false, errors: []});
      toastr('success', 'Erorile au fost șterse cu succes!');
    }).catch(() => toastr('error', 'Eroare la ștergerea erorilor!'));
  };

  handleClick = (action, data) => {
    this.props.setRenderedComponent({ name: action, ...data, unMountSelf: this.handleChildUnmount });
  };

  handleChildUnmount = (action, otherArguments) => {
    this.props.setRenderedComponent({ name: null, subComponent: { name: null } });

    if (action === 'deleteError' && otherArguments && otherArguments.id) {
      const errors = filter(this.state.errors, r => r.id !== otherArguments.id);
      this.setState({ ...this.state, pending: false, errors: errors, oldData: cloneDeep(errors) }, () => {
        this.table.current.handleDimensions();
      });
    }
    if (action === 'errorModal' && otherArguments) {
      let errors = [...this.state.errors];

      let errorIndex = findIndex(this.state.errors, r => r.id === otherArguments.id && otherArguments.id !== null);

      if (errorIndex > -1) {
        errors[errorIndex] = otherArguments
      } else {
        errors = [otherArguments, ...errors];
      }

      this.setState({ errors: errors, oldData: cloneDeep(errors) }, () => {
        this.handleFilter();
      });
    }
  };

  handleTable = () => {
    const { errors, oldData } = this.state;

    const table = {
      items: errors,
      rowHeight: 30,
      bottom: 120,
      columns: [
        { width: 200, header: 'Acțiune', dataKey: 'action', className: 'no-wraptext', rowData: (rowData, dataKey) => (
            <div
              className='cursor-pointer'
              onDoubleClick={() => this.handleClick('errorModal', {item: rowData})}
              onMouseLeave={() => this.setState({ ...this.state, showTooltip: null })}
              onMouseEnter={() => this.setState({ ...this.state, showTooltip: dataKey })}>
              {
                this.state.showTooltip === dataKey && rowData.action.length > 30 ?
                  <Whisper placement='left' trigger='hover' speaker={<Tooltip>{rowData.action}</Tooltip>} delayHide={0} delayShow={0}>
                    <span>{rowData.action}</span>
                  </Whisper>
                :
                <span>{rowData.action}</span>
              }
            </div>
          )
        },
        { flexGrow: 1, header: 'Eroare', dataKey: 'error', align: 'center',
          rowData: (rowData) => <div className='cursor-pointer' onDoubleClick={() => this.handleClick('errorModal', {item: rowData})}>{rowData.error}</div>
        },
        { width: 150, header: 'Data - Ora', dataKey: 'createdAt', align: 'left',
          rowData: rowData => (
            <span>{rowData.createdAt ? dayjs(rowData.createdAt).format('DD.MM.YYYY - HH:mm') : ''}</span>
          )
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
  }

  render() {
    const { pending, errors } = this.state;
    const { renderedComponent } = this.props;

    return (
      <div className='error-page container mt-3'>
        <Loading pending={pending} />

        { renderedComponent.name === 'errorModal' && <ErrorModal /> }

        <Row>
          <Col xs={8}>Total erori: <span className='bold'>{errors.length}</span></Col>
          <Col xs={8}>
            <h4 className='text-center'>Erori</h4>
          </Col>
          <Col xs={8} className='text-end'>
            <Button type='button' appearance='primary' color='red' size='xs' onClick={this.handleDeleteAll}>
              <FontAwesomeIcon icon={faTrashAlt}/> Șterge toate
            </Button>
          </Col>
        </Row>

        { this.handleTable() }
      </div>
    );
  };
}

const mapStateToProps = createStructuredSelector({
  renderedComponent: selectedRenderedComponent
});

const mapDispatchToProps = dispatch => ({
  setRenderedComponent: component => dispatch(setRenderedComponent(component))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorPage);

const tooltip = (<Tooltip>Șterge eroare</Tooltip>);