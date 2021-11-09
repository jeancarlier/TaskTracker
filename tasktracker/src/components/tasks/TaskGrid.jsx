import React, {useContext} from "react";
import TaskContext from '../../context/task/taskContext';
import Status from "./Status"
import DeleteButton from "./DeleteButton";
import CompleteButton from "./CompleteButton";
import StartButton from './StartButton'
import { Row, Col } from "react-bootstrap";

const TaskGrid = () => {
  const taskContext = useContext(TaskContext);

  return (
    <>
      <table key='taskTable'  className='taskGrid table table-striped table-bordered' >
        <thead>
          <tr>
            <th className='twenty'>Name</th>
            <th className='fourty'>Description</th>
            <th className='ten'>Estimate</th>
            <th className='ten'>State</th>
            <th className='fifteen'></th>
          </tr>
        </thead>     
        <tbody>          
            {taskContext.tasks.map(data => (            
              <tr key={data.id}>                
                <td className='twenty' key={'Name' + data.name + data.id}>{data.name}</td>
                <td className='fourty' key={'Desc' + data.description+ data.id}>{data.description}</td>
                <td className='ten' key={'Est'+data.estimate+ data.id}>{data.estimate + ' hrs'}</td>
                <td className='ten' key={'State'+data.state+ data.id} ><Status state={taskContext.getStatus(data)}/></td> 
                <td className='ten gridActionColumn' key ='action'>                  
                  <Row>                      
                    <Col>
                      { 
                      taskContext.getStatus(data).value === 'Planned' ? 
                        <StartButton index={data.id} status={taskContext.getStatus(data)} /> :
                        <CompleteButton index={data.id} status={taskContext.getStatus(data)} />                    
                      }
                      
                    </Col>
                    <Col>
                      <DeleteButton index={data.id}  />                  
                    </Col>
                  </Row>                  
                </td> 
              </tr>            
            ))}                    
        </tbody> 
      </table>
    </>
  );
  
};

export default TaskGrid;