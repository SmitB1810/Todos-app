import React, { useContext, useState } from 'react';
import { TaskContext } from "./TaskContext";

function TaskState(props) {
    const taskInitial = [];
    const [tasks, setTasks] = useState(taskInitial);
    const [user, setUserState] = useState(taskInitial);

    const getTasks = async () => {
        const resp = await fetch('http://localhost:5000/api/tasks/fetchalltasks', {
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
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
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
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
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          },
          body: JSON.stringify(task)
        });
        getTasks();
      }
    
      const deleteTask = async (id) => {
        const resp = await fetch(`http://localhost:5000/api/tasks/deletetask/${id}`, {
          method: 'DELETE',
          headers:{
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          }
        });
        getTasks();
      }

      const setUser = async (id) => {
        const resp = await fetch("http://localhost:5000/api/users/getuser", {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
          }
        });
        const json = await resp.json();
        let user = {name: json.name, email:json.email};
        setUserState(user);
      }
    return (
        <div>
            <TaskContext.Provider value={{ tasks, getTasks, addTask, editTask, deleteTask, setUser}}>
                {props.children}      
            </TaskContext.Provider>
        </div>
    )
}

export default TaskState;