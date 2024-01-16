import React, { useState } from 'react';
import { useNavigate } from "react-router";

function Login() {

    const [credential, setCredential] = useState({ name: "", email: "", phone: "", password: "", cpassword: "" });
    const navigate = useNavigate();

    const onCHangeHandle = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    }

    const { name, email, phone, password } = credential;

    const handleSignup = async (e) => {
        e.preventDefault();
        if (credential.password !== credential.cpassword) {
            alert("Both password should be same");
        }

        const resp = await fetch('http://localhost:5000/api/users/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone, password })
        })
        const json = await resp.json();
        if (json) {
            localStorage.setItem('token', json.authtoken);
            navigate('/');
        } else {
            navigate('/signup');
        }
    }

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Enter Username</label>
                    <input type="text" className="form-control" name='name' id="name" aria-describedby="emailHelp" onChange={onCHangeHandle}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" onChange={onCHangeHandle}></input>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Enter Phone Number</label>
                    <input type="number" className="form-control" name='phone' id="phone" aria-describedby="emailHelp" onChange={onCHangeHandle}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" onChange={onCHangeHandle}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onCHangeHandle}></input>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSignup}>Submit</button>
            </form>
        </div>
    );
}

export default Login;