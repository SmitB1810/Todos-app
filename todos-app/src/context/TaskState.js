import React, { useContext, useState } from 'react';
import { TaskContext } from "./TaskContext";

function TaskState(props) {
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
        <div>
            <TaskContext.Provider value={{ tasks, getTasks, addTask, editTask, deleteTask, setTasks}}>
                {props.children}      
            </TaskContext.Provider>
        </div>
    )
}

export default TaskState;