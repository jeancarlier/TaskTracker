import React, {useContext} from "react";
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';
import DialogContext from "../../context/dialog/dialogContext";
import AddTaskModal from "./AddTaskModal";

const AddButton = ({title}) => {  
  const dialogContext = useContext(DialogContext);
  const {openModal} = dialogContext;
  return (    
    <>
      <Button onClick={openModal} className='btn btn-primary taskAddButton'>{title}</Button>
      <AddTaskModal/>
    </>
  );
};

AddButton.defaultProps = {
  title: "Add Task"
};

AddButton.propTypes = {
  title: PropTypes.string.isRequired
}

export default AddButton;