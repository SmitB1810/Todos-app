import React, { useContext, useState } from 'react';
import taskContext from '../context/TaskContext';
import './css/TaskItem.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassStart, faHourglassEnd, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function time() {
    // const date = new Date().getDate() //current date
    // const month = new Date().getMonth() + 1 //current month
    // const year = new Date().getFullYear() //current year
    const hours = new Date().getHours() //current hours
    const min = new Date().getMinutes() //current minutes
    const sec = new Date().getSeconds() //current seconds

    return hours + ':' + min + ':' + sec
}


function TaskItem(props) {
    const { deleteTask } = useContext(taskContext);
    const { task, modalOpen } = props;

    let [startTime, setstartTime] = useState("00:00:00", time());
    let [endTime, setendTime] = useState("00:00:00", time());

    const d = new Date(task.date);

    const startTimeHandler = (e) => {
        e.preventDefault();
        setstartTime(time());
    }

    const endTimeHandler = (e) => {
        e.preventDefault();
        setendTime(time());
    }
    return (
        <div className="col-md-3 my-3">
            <div className="card h-100">
                <div className="card-header text-left d-flex">
                    {task.tag}      <div className="ms-auto"> {d.toLocaleDateString()} | {d.toLocaleTimeString()}</div>       
                </div>
                <div className="card-body">
                    <h5 className="card-title">{task.taskTitle}</h5>
                    <p className="card-text">{task.description}</p>
                    <div className="card-footer text-left bg-white" style={{ display: "flex" }}>

                        {/* <button type="button" id='datebtn' className="d-inline btn btn-primary mx-1" onClick={startTimeHandler}>S</button> */}
                        <FontAwesomeIcon icon={faHourglassStart} className="d-inline btn btn-primary mx-1" onClick={startTimeHandler}/>

                        {/* <button type="button" id='datebtn' className="d-inline btn btn-info" onClick={endTimeHandler}>E</button> */}
                        <FontAwesomeIcon icon={faHourglassEnd} className="d-inline btn btn-info" onClick={endTimeHandler}/>

                        {/* <button type="button" className="d-inline btn btn-success mx-1" onClick={() => modalOpen(task)}>E</button> */}
                        <FontAwesomeIcon icon={faPenToSquare} className="d-inline btn btn-success mx-1" onClick={() => modalOpen(task)}/>
                        
                        {/* <button type="button" className="d-inline btn btn-danger" onClick={() => { deleteTask(task._id) }}>D</button> */}
                        <FontAwesomeIcon icon={faTrash} className="d-inline btn btn-danger" onClick={() => { deleteTask(task._id) }}/>

                    </div>
                </div>
                <div className="card-footer date text-muted justify-content-center d-flex">
                    {startTime} | {endTime}
                </div>
            </div>
        </div>
    )
}

export default TaskItem
