import { React, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import TaskContext from "../context/TaskContext";
import TaskItem from "./TaskItem";

const Header = () => {

    const [task, setTask] = useState([]);
    const { tasks, getTasks } = useContext(TaskContext);

    const nevigate = useNavigate();

    const searchHandle = async (e) => {
        let key = e.target.value;
        if (key) {
            let resp = await fetch(`http://localhost:5000/api/tasks/search/${key}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            resp = await resp.json();
            JSON.stringify(resp)
            if (resp) {
                setTask(resp);
            }
        } else {
            getTasks();
        }
    }

    const logoutHandle = () => {
        localStorage.removeItem('token');
        nevigate('/login');
    }

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Todo</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">About</a>
                                </li>
                            </ul>

                            {localStorage.getItem('token') ? (<>
                                <form className="d-flex" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={searchHandle}></input>
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                                </form>
                                <Link className="link btn btn-primary ms-4" role="button" onClick={logoutHandle} >logout</Link>
                            </>) : (<>
                                <Link className="link btn btn-primary ms-2" to="/Login" role="button" >Login</Link>
                                <Link className="link btn btn-primary ms-2" to="/Signup" role="button" >Signup</Link>
                            </>)
                            }
                        </div>
                    </div>
                </nav >
            </div >
            {task.map((task) => {
                return <TaskItem key={task._id} task={task} />
            })}
        </>
    )
}

export default Header;