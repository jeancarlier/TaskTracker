import {
  SHOW_ALERT,
  CLOSE_ALERT
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch(action.type){   
    case SHOW_ALERT:       
      return {
        ...state,
        showAlert: true,  
        message: action.payload.message,
        title: action.payload.title,
        variant: action.payload.variant
      };    
    case CLOSE_ALERT:    
      return {
        ...state,
        showAlert: false        
      };    
    default:       
      return state;
  }
}