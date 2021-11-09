import React, {useContext} from 'react'
import {Alert} from 'react-bootstrap';
import AlertContext from '../../context/alert/alertContext'

const AlertDialog = () => {
  const alertContext = useContext(AlertContext);
  const {index, variant, message, title, showAlert, closeAlert} = alertContext;
  
  if (showAlert){
    return <Alert className='alert' onClose={closeAlert} key={index} variant={variant} dismissible>
        <Alert.Heading>{title}</Alert.Heading>
        <p>{message}</p>
      </Alert>
  }else{
    return <>{showAlert}</>
  }  
};

export default AlertDialog;