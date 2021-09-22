import React from 'react';
import { Modal, Divider, Button } from 'rsuite';

class ConfirmDialog extends React.Component {
  render() {
    const { open, title, body, close, submit, size, closeBtnName, confirmBtnName, color, className } = this.props;

    return (
      <div className='modal-container confirm-dialog'>
        <Modal className={className} autoFocus keyboard={false} backdrop={'static'} open={open} onClose={close} size={size ? size : 'md'}>
          <Modal.Header>
            	<Modal.Title>{title}</Modal.Title>
              <Divider />
          </Modal.Header>
          <Modal.Body style={{overflow: 'hidden'}}>
            {body}
          </Modal.Body>
          <Modal.Footer>
            <Divider />
              <Button onClick={close}>{closeBtnName ? closeBtnName: 'Renunță'}</Button>
              {submit && <Button color={color ? color : 'green'} onClick={() => submit({...this.props})}>{confirmBtnName ? confirmBtnName: 'Salvează'}</Button>}
          </Modal.Footer>
        </Modal>
      </div>
    )
  };
};

export default ConfirmDialog;
