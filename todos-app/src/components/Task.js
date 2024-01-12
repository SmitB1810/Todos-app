import React, { useContext, useRef, useState, useEffect } from 'react';
import AddTask from './AddTask';
import TaskItem from './TaskItem';
import TaskContext from '../context/TaskContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorClosed, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function Task() {
    const context = useContext(TaskContext);
    const { tasks, getTasks, editTask } = context;

    const ref = useRef(null);
    const refClose = useRef(null);

    const [task, setTask] = useState({ id: "", etaskTitle: "", edescription: "", etag: "" });

    useEffect(() => {
        getTasks();
    }, []);

    const onChangeHandler = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    }
    const onClickHandler = (e) => {
        editTask(task.id, task.etaskTitle, task.edescription, task.etag);
        refClose.current.click();
    }
    const modalOpen = (currentTask) => {
        ref.current.click();
        setTask({ id: currentTask._id, etaskTitle: currentTask.taskTitle, edescription: currentTask.description, etag: currentTask.tag })
    }


    return (
        <>
            <AddTask />
            <div className='row row-equal-height'>
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Open modal for @mdo
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
                                <button type="button" className="btn" data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faDoorClosed} /></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="etaskTitle" className="col-form-label">Task Title</label>
                                        <input type="text" className="form-control" name='etaskTitle' id="etaskTitle" value={task.etaskTitle} onChange={onChangeHandler}></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="edescription" className="col-form-label">Description</label>
                                        <input className="form-control" name='edescription' id="edescription" value={task.edescription} onChange={onChangeHandler}></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="etag" className="col-form-label">Tag</label>
                                        <input className="form-control" name='etag' id="etag" value={task.etag} onChange={onChangeHandler}></input>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">
                                    <FontAwesomeIcon icon={faDoorClosed} /> Close
                                </button>
                                <button disabled={(task.etaskTitle.length <= 2 || task.edescription.length <= 3 || (task.etag.length <= 1 || task.etag.length >= 4))} type="button" className="btn btn-primary" onClick={onClickHandler}>
                                <FontAwesomeIcon icon={faFloppyDisk} /> Save Change
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <hr />
                    <h3>Your Tasks</h3>
                    <hr />
                </div>
                {tasks.map((task) => {
                    return <TaskItem key={task._id} task={task} modalOpen={modalOpen} />
                })}
            </div>
        </>
    );
}

export default Task;