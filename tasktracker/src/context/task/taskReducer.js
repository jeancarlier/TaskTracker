import {
  GET_TASKS,
  SET_LOADING,
  ADD_TASK,
  DELETE_TASK,
  CONCLUDE_TASK,
  LOAD_SUMMARY,
  GET_ESTIMATE
} from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch(action.type){
    case GET_TASKS:            
      return {
        ...state,
        tasks: action.payload,
        lastIndex: action.payload.reduce(function(prev, current) {
          return (prev.id > current.id) ? prev : current
        }).id, 
        loading: false        
      };            
    case DELETE_TASK: case CONCLUDE_TASK:       
      return {
        ...state,
        tasks: action.payload,
        loading: false        
      }; 
    case GET_ESTIMATE:
      return{
        ...state,
        estimateHours: action.payload
      }       
    case ADD_TASK:
      return {
        ...state,
        tasks: action.payload,
        newTask: {
          id: null,
          name: '',
          description: '',
          startDate: null,
          estimate: 0,
          endDate: null
        },
        lastIndex: action.payload.reduce(function(prev, current) {
          return (prev.id > current.id) ? prev : current
        }).id, 
        loading: false
      };      
    case LOAD_SUMMARY:        
      return {
        ...state,
        percentageConcluded: action.payload.percentageConcluded,        
        totalHours: action.payload.totalHours,
        totalCompletedHours: action.payload.totalCompletedHours,
        totalInProcessHours: action.payload.totalInProcessHours,
        totalPlannedHours: action.payload.totalPlannedHours
      };   
    case SET_LOADING:        
      return{
        ...state,
        loading: true
      };
    default:       
      return state;
  }
}