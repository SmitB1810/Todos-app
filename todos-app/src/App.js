import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from "react-router";
// @ts-ignore
import Header from './components/Header';
import Home from './components/Home';
// @ts-ignore
import Footer from './components/Footer';
// import TaskState from './context/TaskState';
import TaskContext from './context/TaskContext';
import { useState } from 'react';

function App() {
  const taskInitial = [];
  const [tasks, setTasks] = useState(taskInitial);

  const getTasks = async () => {
    const resp = await fetch('http://localhost:5000/api/tasks/fetchalltasks', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    });
    const data = await resp.json();
    setTasks(data);
  }

  const addTask = async (taskTitle, description, tag) => {
    const task = {
      taskTitle: taskTitle,
      description: description,
      tag: tag

    };
    const resp = await fetch('http://localhost:5000/api/tasks/addtask', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    getTasks();
  }

  const editTask = async (id, taskTitle, description, tag) => {
    const task = {
      taskTitle: taskTitle,
      description: description,
      tag: tag

    };
    const resp = await fetch(`http://localhost:5000/api/tasks/updatetask/${id}`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    getTasks();
  }

  const deleteTask = async (id) => {
    const resp = await fetch(`http://localhost:5000/api/tasks/deletetask/${id}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      }
    });
    getTasks();
  }

  return (
    <>
      {/* <TaskState> */}
      <TaskContext.Provider value={{ tasks, getTasks, addTask, editTask, deleteTask }}  >
        <Router>
          <Header />
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </Router>
        <Footer />
      </TaskContext.Provider>
      {/* </TaskState> */}
    </>
  );
}

export default App;
