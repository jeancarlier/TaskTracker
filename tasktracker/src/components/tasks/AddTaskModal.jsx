import React, {useContext} from 'react';
import TaskContext from '../../context/task/taskContext';
import AddTaskForm from './AddTaskForm';
import {Button, Modal} from 'react-bootstrap';
import DialogContext from '../../context/dialog/dialogContext';

const AddTaskModal = () => {
  const taskContext = useContext(TaskContext);
  const dialogContext = useContext(DialogContext);

  const {showModal, openModal} = dialogContext;
  const {addTask, checkFormValidity} = taskContext;

  const addNewTask = () => {
    /* Check form validity before saving */
    if (checkFormValidity()){
      addTask();
      openModal();
    }
  };

  const closeModal = () => {
    openModal();
  };

  return (        
    <Modal show={showModal}>
      <Modal.Header>
        Add a new task
      </Modal.Header>
      <Modal.Body>
        <form id='addTaskForm' className='needs-validation' >
          <AddTaskForm></AddTaskForm>                    
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='primary' onClick={addNewTask}>
          Save
        </Button>
        <Button variant='secondary' onClick={(closeModal)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>          
  );
};

export default AddTaskModal;