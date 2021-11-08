import {
  SHOW_MODAL
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch(action.type){   
    case SHOW_MODAL:       
      return {
        ...state,
        showModal: !state.showModal       
      };    
    default:       
      return state;
  }
}