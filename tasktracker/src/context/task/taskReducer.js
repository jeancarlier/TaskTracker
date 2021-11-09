import {
  GET_TASKS,
  SET_LOADING,
  ADD_TASK,
  DELETE_TASK,
  COMPLETE_TASK,
  LOAD_SUMMARY,
  GET_ESTIMATE,
  SET_ERROR
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
    case DELETE_TASK: case COMPLETE_TASK:       
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
        percentageCompleted: action.payload.percentageCompleted,        
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
    case SET_ERROR:
      return{
        ...state,
        loading: false
      }
    default:       
      return state;
  }
}