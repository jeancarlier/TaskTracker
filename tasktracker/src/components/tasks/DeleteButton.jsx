import React, {useState, useContext} from "react";
import PropTypes from 'prop-types';
import img from '../../images/icons8-delete-64.png';
import ConfirmationDialog from "../modals/ConfirmationDialog";
import TaskContext from "../../context/task/taskContext";

const DeleteButton = ({index}) => {
  const taskContext = useContext(TaskContext);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const showDialog = () => {
    setShowConfirmationDialog(show => !show);
  }

  const {deleteTask} = taskContext;

  const delTask = () => {
    deleteTask(index);
    showDialog();
  }

  return (
    <>
      <img className='taskGridCommands' src={img} value={index} alt='' data-toggle="tooltip" data-placement="top" title="Delete task" onClick={showDialog}></img>    
      <ConfirmationDialog showMessage={showConfirmationDialog} title="Warning" message="Do you really want to delete this task?" positiveBtn='Yes' negativeBtn='No' positiveResponse={delTask} negativeResponse={showDialog} />     
    </>
  );
};

DeleteButton.defaultProps = {  
  index: -1
};

DeleteButton.propTypes = {  
  index: PropTypes.number.isRequired
}

export default DeleteButton;