import React from 'react';

function Login() {

    const handleLogin = async () => {
        const resp = await fetch('http://localhost:5000/api/users/login', {
            methis: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(resp)
        })
    }

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp"></input>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password"></input>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Submit</button>
            </form>
        </div>
    );
}

export default Login;