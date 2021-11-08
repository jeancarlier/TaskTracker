import React, { useContext } from 'react'
import TaskContext from '../../context/task/taskContext';

const AddTaskForm = () => {
  const taskContext = useContext(TaskContext);

  const {newTask, checkFormValidity, estimateHours} = taskContext;
  
  const hours = estimateHours;

  const onChange = (e) => {   
    switch (e.target.name){
      case 'taskName':        
        newTask.name = e.target.value;  
        break;      
      case 'taskDescription':
        newTask.description = e.target.value;
        break;
      case 'taskEstimate':        
        newTask.estimate = e.target.value;  
        break;  
      default:
        return null;        
    }
    if (document.getElementById(e.target.name).classList.contains('is-invalid')){
      checkFormValidity();
    }
  }

  return (    
    <>
      <div className='form-group row'>
        <label htmlFor='taskName' className='col-sm-3 col-form-label'>Task Name: </label>
        <div className='col-sm-9'>
          <input 
            type='text' 
            id='taskName'
            name='taskName' 
            className='form-control'                         
            onChange={(e) => onChange(e) }
            required></input>
        </div>
      </div>
      <div className='form-group row'>
        <label htmlFor='taskDescription' className='col-sm-3 col-form-label'>Description: </label>
        <div className='col-sm-9'>
          <textarea 
            id='taskDescription' 
            name='taskDescription'
            rows='3' 
            className='form-control'   
            onChange={(e) => onChange(e) }                           
            required></textarea>
        </div>
      </div>     
      <div className='form-group row'>
        <label htmlFor='taskEstimate' className='col-sm-3 col-form-label'>Estimate: </label>
        <div className='col-sm-9'>
          <select required
            className="form-control" 
            id="taskEstimate"
            name="taskEstimate"                   
            onChange={(e) => onChange(e) }            
            >            
            {hours.map(hour => (
              <option key={hour} value={hour}>{hour}</option>  
            ))}            
          </select>
        </div>
      </div>
    </>
  );
}

export default AddTaskForm;
