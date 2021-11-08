import './App.css';
import Navbar from './components/layout/Navbar';
import TaskList from './components/layout/TaskList';
import './libs/bootstrap/css/bootstrap.min.css';
import TaskState from './context/task/TaskState';
import DialogState from './context/dialog/DialogState';

function App() {
  return (
    <TaskState>      
      <DialogState>
      <div className="App">
        <header className="App-header">
          <Navbar/>
          <TaskList/>
        </header>
      </div>       
      </DialogState>   
    </TaskState>
  );
}

export default App;
