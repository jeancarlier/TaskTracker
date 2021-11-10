import './App.css';
import Navbar from './components/layout/Navbar';
import TaskList from './components/layout/TaskList';
import './libs/bootstrap/css/bootstrap.min.css';
import TaskState from './context/task/TaskState';
import DialogState from './context/dialog/DialogState';
import AlertState from './context/alert/AlertState';
import Alert from './components/alert/Alert'

function App() {
  return (
    <AlertState>
      <TaskState>      
          <DialogState>
            <div className="App">
              <header className="App-header">            
                <Navbar/>
                <Alert/>
                <TaskList/>
              </header>
            </div>       
          </DialogState>   
      </TaskState>
    </AlertState>
  );
}

export default App;
