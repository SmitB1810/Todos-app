import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function Login() {

    const navigate = useNavigate();
    const [credential, setCredential] = useState({ email: "", password: "" });

    const onCHangeHandle = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const resp = await fetch('http://localhost:5000/api/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });

        const json = await resp.json();
        if (json) {
            localStorage.setItem('token', json.authtoken);
            navigate('/');
        } else {
            navigate('/login');
        }
    }

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" onChange={onCHangeHandle}></input>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" onChange={onCHangeHandle}></input>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Submit</button>
            </form>
        </div>
    );
}

export default Login;