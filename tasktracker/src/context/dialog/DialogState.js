import React, {useReducer} from 'react';
import DialogContext from './dialogContext';
import DialogReducer from './dialogReducer';

import {
  SHOW_MODAL  
} from '../types';

const DialogState = props => {
  const initialState = {
    showModal: false
  };

  const [state, dispatch] = useReducer(DialogReducer, initialState);

  //Open Dialog
  const openModal = () => {    
    dispatch({type: SHOW_MODAL});
  }

  return <DialogContext.Provider
    value={{
      showModal: state.showModal,
      openModal
    }}
  >
    {props.children}
  </DialogContext.Provider>

};

export default DialogState;

