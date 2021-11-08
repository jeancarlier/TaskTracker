import React from 'react'
import {Button, Modal} from 'react-bootstrap';

const ConfirmationDialog = ({title,message,positiveBtn, negativeBtn, positiveResponse, negativeResponse, showMessage}) => {
  return (
    <Modal show={showMessage}>
        <Modal.Header>
          {title}
        </Modal.Header>
        <Modal.Body>
           {message}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={positiveResponse}>
            {positiveBtn}
          </Button>
          <Button variant='secondary' onClick={negativeResponse}>
            {negativeBtn}
          </Button>
        </Modal.Footer>
      </Modal>      
  );
}

export default ConfirmationDialog;