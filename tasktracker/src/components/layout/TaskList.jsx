import React, {Fragment, useContext, useEffect} from "react";
import TaskGrid from "../tasks/TaskGrid";
import TaskAddButton from "../tasks/AddButton";
import Summary from "../tasks/Summary";
import Spinner from '../layout/Spinner';
import TaskContext from '../../context/task/taskContext';

const TaskList = () => {
    const taskContext = useContext(TaskContext);
    const {loading} = taskContext;

    useEffect(() => {     
      taskContext.getTasks();  
      taskContext.getEstimateHours();  
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    if (loading){
      return <Spinner/>
    }else{  
      return (
        <Fragment>
          <div>
            <div className="taskOperations col-md-12">
              <TaskAddButton />
            </div>
            <div className="tasklist">
              <TaskGrid />
            </div>
            <div className="taskSummary col-md-6">
              <Summary />
            </div>
          </div>
        </Fragment>
      );  
    }  
    
};

export default TaskList;