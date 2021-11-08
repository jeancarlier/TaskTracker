import React, {useState, useContext} from "react";
import PropTypes from 'prop-types';
import img from '../../images/icons8-checked-64.png';
import ConfirmationDialog from "../modals/ConfirmationDialog";
import TaskContext from "../../context/task/taskContext";

const CompleteButton = ({index, status}) => {
  const taskContext = useContext(TaskContext);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  
  const showDialog = () => {
    setShowConfirmationDialog(show => !show);
  }

  const {concludeTask} = taskContext;

  const completeTask = () => {
    concludeTask(index);
    showDialog();
  }

  return (
    <>
      { status.value !== 'Completed' && 
        <img className='taskGridCommands' src={img} value={index} alt='' 
          data-toggle="tooltip" data-placement="top" title="Complete task" onClick={showDialog}></img>    
      }
      
      <ConfirmationDialog showMessage={showConfirmationDialog} title="Warning" message="Do you really want to set this task as completed?" positiveBtn='Yes' negativeBtn='No' positiveResponse={completeTask} negativeResponse={showDialog} />     
    </>
  );
};

CompleteButton.defaultProps = {  
  index: -1
};

CompleteButton.propTypes = {  
  index: PropTypes.number.isRequired
}

export default CompleteButton;