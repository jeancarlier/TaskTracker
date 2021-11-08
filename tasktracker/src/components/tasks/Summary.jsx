import React, {useContext, useEffect} from "react";
import PropTypes from 'prop-types';
import TaskContext from '../../context/task/taskContext';

const Summary = ({valueMax}) => {
  const taskContext = useContext(TaskContext);
  const { loadProjectSummary, percentageConcluded, totalHours, totalCompletedHours, totalInProcessHours, totalPlannedHours } = taskContext;
 
  useEffect(() => {        
    loadProjectSummary();
    // eslint-disable-next-line 
  },[taskContext.tasks]);

  return (
    <div className='projectSummary'>
      <div className="card">
        <div className="card-header">
          Project summary
        </div>
        <div className="card-body">
          <div className='summaryContent'>
            <span>Project completed percentage: </span>
            <div className='progress'>
              <div className='progress-bar progress-bar-striped' style={{width: percentageConcluded+'%'}} role='progressbar' aria-valuemin='0' aria-valuemax={valueMax} aria-valuenow={percentageConcluded}>{percentageConcluded+'%'}</div>
            </div>
          </div>
          <div className='summaryContent'>
            <span>Total hours: <span className='summaryTotalValue'>{totalHours} hrs</span> </span>                        
          </div>
          <div className='summaryContent'>
            <span>Total completed hours: <span className='summaryTotalValue'>{totalCompletedHours} hrs</span> </span>                        
          </div>
          <div className='summaryContent'>
            <span>Total in process hours: <span className='summaryTotalValue'>{totalInProcessHours} hrs</span> </span>                        
          </div>
          <div className='summaryContent'>
            <span>Total planned hours: <span className='summaryTotalValue'>{totalPlannedHours} hrs</span> </span>                        
          </div>
        </div>
      </div>      
    </div>
  );
};

Summary.defaultProps = {
  valueMax: 100,
  currentValue: 35,
};

Summary.propTypes = {
  valueMax: PropTypes.number.isRequired,
  currentValue: PropTypes.number.isRequired
};

export default Summary;