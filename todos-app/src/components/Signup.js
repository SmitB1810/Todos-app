import React from 'react';

function Login() {

    const handleSignup = async () =>{
        const resp = await fetch('http://localhost:5000/api/users/signup',{
            methis:"POST",
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
                    <label htmlFor="name" className="form-label">Enter Username</label>
                    <input type="text" className="form-control" name='name' id="name" aria-describedby="emailHelp"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp"></input>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlhtmlFor="phone" className="form-label">Enter Phone Number</label>
                    <input type="number" className="form-control" name='phone' id="phone" aria-describedby="emailHelp"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password"></input>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSignup}>Submit</button>
            </form>
        </div>
    );
}

export default Login;