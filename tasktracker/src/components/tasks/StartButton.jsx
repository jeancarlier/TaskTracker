import React, {useState, useContext} from "react";
import PropTypes from 'prop-types';
import img from '../../images/icons8-play-64.png';
import ConfirmationDialog from "../modals/ConfirmationDialog";
import TaskContext from "../../context/task/taskContext";

const StartButton = ({index, status}) => {
  const taskContext = useContext(TaskContext);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  
  const showDialog = () => {
    setShowConfirmationDialog(show => !show);
  }

  const {startTask} = taskContext;

  const start = () => {
    startTask(index);
    showDialog();
  }

  return (
    <>
      { status.value === 'Planned' && 
        <img className='taskGridCommands' src={img} value={index} alt='' 
          data-toggle="tooltip" data-placement="top" title="Start task by clicking here" onClick={showDialog}></img>    
      }
      
      <ConfirmationDialog showMessage={showConfirmationDialog} title="Warning" message="Do you really want to start this task?" positiveBtn='Yes' negativeBtn='No' positiveResponse={start} negativeResponse={showDialog} />     
    </>
  );
};

StartButton.defaultProps = {  
  index: -1
};

StartButton.propTypes = {  
  index: PropTypes.number.isRequired
}

export default StartButton;