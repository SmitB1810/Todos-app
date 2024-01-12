import React, { useContext, useState } from 'react';
import taskContext from '../context/TaskContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

function AddTask() {

    const context = useContext(taskContext);
    const { tasks, addTask } = context;
    const [task, setTask] = useState({ taskTitle: "", description: "", tag: "" });

    const onChangeHandler = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    const onClickHandler = (e) => {
        e.preventDefault();
        addTask(task.taskTitle, task.description, task.tag);
        setTask({ taskTitle: "", description: "", tag: "" });
    }

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="taskTitle" className="form-label">Task Title</label>
                    <input type="text" className="form-control" name='taskTitle' id="taskTitle" value={task.taskTitle} onChange={onChangeHandler}></input>
                    <div id="emailHelp" className="form-text">Minimum 2 character required.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" name='description' id="description" value={task.description} onChange={onChangeHandler}></input>
                    <div id="emailHelp" className="form-text">Minimum 3 character required.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor='tag' className="form-label">Tag</label>
                    <input type="text" className="form-control" name='tag' id='tag' value={task.tag} onChange={onChangeHandler}></input>
                    <div id="emailHelp" className="form-text">Min 1 & Max 4 character required.</div>
                </div>

                <button disabled={(task.taskTitle.length <= 2 || task.description.length <= 3 || (task.tag.length <= 1 || task.tag.length >= 4))} type="submit" className="btn btn-primary" onClick={onClickHandler}>
                    <FontAwesomeIcon icon={faCartPlus} />  Add Task
                </button>

            </form>
        </div>
    );
}

export default AddTask;