import React from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'rsuite';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectedRenderedComponent } from '../../../../redux/renderComponent/renderComponent.reselect';

import { toastr } from '../../../../components/toastr/toastr.component';
import Loading from '../../../../components/loading/loading.component';
import ConfirmDialog from '../../../../components/confirm-dialog/confirm-dialog.component';

class ErrorModal extends React.Component {
  constructor(props) {
    super(props);
    const { item } = props.renderedComponent;

    this.state = {
      pending: false,
      id: item.id,
      error: {
        cui: '',
        name: '',
        email: '',
        user_name: '',
        action: '',
        error: '',
        detail: ''
      }
    }
  };

  componentDidMount = () => {
    this.setState({ pending: true });
    axios.get(`/api/logError/${this.state.id}`).then(({ data }) => {
      this.setState({ pending: false, error: data});
    }).catch(() => toastr('error', 'Eroare la preluarea datelor!'));
  };

  render() {
    const { unMountSelf } = this.props.renderedComponent;

    return (
      <>
        <Loading pending={this.state.pending} />
        <ConfirmDialog
          size={'lg'}
          open={true}
          title={`Detalii eroare`}
          body={this.handleBody()}
          close={() => unMountSelf('errorModal')}
        />
      </>
    );
  }

  handleBody = () => (
    <Grid fluid>
      <Row>
        <Col xs={2} className='text-end'>
          <label>Acțiune</label>
        </Col>
        <Col xs={22}>
          <label className='w-100 input-label'>{this.state.error.action}</label>
        </Col>
      </Row>
      <Row>
        <Col xs={2} className='text-end'>
          <label>Eroare</label>
        </Col>
        <Col xs={22}>
          <label className='w-100 input-label'>{this.state.error.error}</label>
        </Col>
      </Row>
      <Row>
        <Col xs={2} className='text-end'>
          <label>Detalii</label>
        </Col>
        <Col xs={22}>
          <pre className='w-100 sm pre sm'>{this.state.error.detail}</pre>
        </Col>
      </Row>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  renderedComponent: selectedRenderedComponent
});

export default connect(
  mapStateToProps
)(ErrorModal);