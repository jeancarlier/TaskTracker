import React from "react";
import TaskGrid from "../tasks/TaskGrid";
import TaskAddButton from "../tasks/AddButton";
import Summary from "../tasks/Summary";

const TaskList = () => {
    return (
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
    );    
};

export default TaskList;