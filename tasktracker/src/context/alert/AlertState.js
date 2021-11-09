import React, {useReducer} from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

import {
  SHOW_ALERT,
  CLOSE_ALERT  
} from '../types';

const AlertState = props => {
  const initialState = {
    showAlert: false,
    variant: '',
    message: '',
    title: '',
    index: 0
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //Open Alert
  const openAlert = (msg, title, variant) => {    
    dispatch({
      type: SHOW_ALERT,
      payload: {message: msg, title: title, variant: variant}
    });

    if (variant !== 'danger'){
      setTimeout(() => {
        dispatch({
          type: CLOSE_ALERT        
        });
      }, 5000);
    }
  };

  //Close Alert
  const closeAlert = () => {
    dispatch({
      type: CLOSE_ALERT        
    });
  };

  return <AlertContext.Provider
    value={{
      showAlert: state.showAlert,      
      variant: state.variant,
      message: state.message,
      title: state.title,
      index: state.index,
      openAlert,
      closeAlert
    }}
  >
    {props.children}
  </AlertContext.Provider>

};

export default AlertState;

