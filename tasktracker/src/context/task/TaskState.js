import React, {useReducer, useContext} from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import AlertContext from '../alert/alertContext';

import axios from 'axios';

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

const TaskState = props => {
  const initialState = {
    loading: false,
    tasks: [],
    newTask: {
      id: null,
      name: '',
      description: '',
      startDate: null,
      estimate: 0,
      endDate: null
    },
    percentageCompleted: 0,
    totalHours: 0,
    totalCompletedHours: 0,
    totalInProcessHours: 0,
    totalPlannedHours: 0,
    lastIndex: 0,
    estimateHours: [],
  };

  const alertContext = useContext(AlertContext);
  const {openAlert} = alertContext;

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const setAlert = (msg, title, variant) => {    
    console.log(msg);      
    openAlert(msg, title, variant);   
    dispatch({type: SET_ERROR});   
  }
 
  //Get tasks
  const getTasks = async () => {
    setLoading();
        
    axios.get('http://localhost:3000/tasks')
    .then(res => {
      dispatch({
        type: GET_TASKS,
        payload: res.data   
      });        
    }).catch((error) => {               
      setAlert('Fail to load tasks' + error, 'System error!', 'danger');         
      return [];
    });    
  }

    //Get estimate hours
    const getEstimateHours = async () => {
                      
      axios.get('http://localhost:3000/hours')      
      .then((res) => {
        dispatch({
          type: GET_ESTIMATE,
          payload: res.data   
        });        
      })
      .catch((error) => {                
        setAlert('Fail to load estimate hours: '+ error, 'System error!', 'danger');         
        return [];
      });      
    }
  

  //Get Task status
  const getStatus = function(record){

    if (record.endDate !== null){
      return {value: 'Completed', colorClass: 'bg-green'};
    }
  
    if (record.startDate === null){
      return {value: 'Planned', colorClass: 'bg-red'};
    }
  
    return {value: 'In Process', colorClass: 'bg-yellow'};  
  };

  //Add task
  const addTask = async () => {
    setLoading();        
    
    if (state.tasks && state.newTask !== {}) {
      const newArr = [...state.tasks];
      state.lastIndex += 1;      
      state.newTask.id = state.lastIndex;

      axios.post('http://localhost:3000/tasks', state.newTask)
      .then((res) => {
        state.tasks = newArr.concat(state.newTask);
  
        dispatch({
          type: ADD_TASK,
          payload: state.tasks
        });
      })
      .catch((error) => {                  
        setAlert('Fail to add task: ' + error, 'System error!', 'danger');                 
      });
    }
  }

  //Check form validity
  const checkFormValidity = () => {    
    if (state.newTask.name === '' || state.newTask.description === '' || state.newTask.estimate === 0){      

      var myform = document.getElementById("addTaskForm")[0];
      if (!myform.checkValidity()) {
        if (myform.reportValidity) {
            myform.reportValidity();
        }
      }

      let inputComponent = document.getElementById('taskName');
      if(state.newTask.name === ''){               
        inputComponent.classList.add('is-invalid');
      }else{        
        inputComponent.classList.remove('is-invalid');
      }

      inputComponent = document.getElementById('taskDescription');
      if(state.newTask.description === ''){      
        inputComponent.classList.add('is-invalid');
      }else{
        inputComponent.classList.remove('is-invalid');
      }

      inputComponent = document.getElementById('taskEstimate');
      if(state.newTask.estimate === 0 ){        
        inputComponent.classList.add('is-invalid');
      }else{
        inputComponent.classList.remove('is-invalid');
      }

      return false;
    }

    let inputComponent = document.getElementById('taskName');
    inputComponent.classList.remove('is-invalid');
    
    inputComponent = document.getElementById('taskDescription');
    inputComponent.classList.remove('is-invalid');
    
    inputComponent = document.getElementById('taskEstimate');
    inputComponent.classList.remove('is-invalid');
    
    return true;
  }

  //Delete task
  const deleteTask = async (index) => {
    setLoading();
    
    if (state.tasks) {

      axios.delete('http://localhost:3000/tasks/'+index)
      .then((res) => {
        let newArr = [...state.tasks];
        newArr = state.tasks.filter(t => t.id !== index );
        state.tasks = newArr;

        dispatch({
          type: DELETE_TASK,
          payload: state.tasks
        });    
      })
      .catch((error) => {        
        setAlert('Fail to delete task: ' + error, 'System error!', 'danger');         
      });
    }
  }

  //Complete task
  const completeTask = (index) => {
    setLoading();
    
    if (state.tasks) {
      let newArr = [...state.tasks];
      const ind = state.tasks.findIndex(t => t.id === index );
      newArr[ind].endDate = new Date();
      
      axios.put('http://localhost:3000/tasks/'+index, newArr[ind])
      .then((res) => {
        state.tasks = newArr;      
        dispatch({
          type: COMPLETE_TASK,
          payload: state.tasks
        });    
      })
      .catch((error) => {        
        setAlert('Fail to complete task: '+ error, 'System error!', 'danger');         
      });
    }    
  }

  //Start task
  const startTask = (index) => {
    setLoading();

    if (state.tasks) {
      let newArr = [...state.tasks];
      const ind = state.tasks.findIndex(t => t.id === index );
      newArr[ind].startDate = new Date();

      axios.put('http://localhost:3000/tasks/'+index, newArr[ind])
      .then((res) => {
        state.tasks = newArr;

        dispatch({
          type: COMPLETE_TASK,
          payload: state.tasks
        });
      })
      .catch((error) => {
        setAlert('Fail to start task: ' + error, 'System error!', 'danger');         
      })
    }    
  }

  //Load tasks Summary
  const loadProjectSummary = () => {
    let summary = {
      percentageCompleted: 0,
      totalHours: 0,
      totalCompletedHours: 0,
      totalInProcessHours: 0,
      totalPlannedHours: 0
    };    

    const sumHours = (tasks) => {
      return tasks.reduce((n, {estimate}) => n + parseInt(estimate), 0)
    };

    if (state.tasks && state.tasks.length > 0){         
      summary.percentageCompleted = Math.round((state.tasks.filter(task => task.endDate !== null).length / state.tasks.length) * 100,2); 
      summary.totalHours = sumHours(state.tasks);      
      summary.totalCompletedHours = sumHours(state.tasks.filter(task => task.endDate !== null));
      summary.totalInProcessHours = sumHours(state.tasks.filter(task => task.endDate === null && task.startDate !== null));
      summary.totalPlannedHours = sumHours(state.tasks.filter(task => task.endDate === null && task.startDate === null));
    }
      
    dispatch({
      type: LOAD_SUMMARY,
      payload: summary
    });    
  }

  //Set loading
  const setLoading = () => dispatch({type: SET_LOADING});

  return <TaskContext.Provider
    value={{
      tasks: state.tasks,
      newTask: state.newTask,
      loading: state.loading,
      percentageCompleted: state.percentageCompleted,
      totalHours: state.totalHours,
      totalCompletedHours: state.totalCompletedHours,
      totalInProcessHours: state.totalInProcessHours,
      totalPlannedHours: state.totalPlannedHours,
      estimateHours: state.estimateHours,
      getTasks,
      getStatus,
      deleteTask,
      completeTask,
      addTask,
      startTask,
      checkFormValidity,
      loadProjectSummary,
      getEstimateHours
    }}
  >
    {props.children}
  </TaskContext.Provider>

};

export default TaskState;

