import React from "react";
import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";

const UserContainer = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const registerUser = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:3001/user/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name, 
                email, 
                password
        })
        }) 
        const data = await response.json()
        console.log(data)
        if(data.success === true){
            navigate('/login');
        }
        
    }

    return (
        <div className="App" >
            <header className='App-header'>
                    <h1>Sign Up page</h1>
            </header>
            <h4>Already have an account? Log in here.</h4>
            <Link to="/login"><button>Login</button></Link>


            <div>
            <h1>Register New User</h1>
            <form onSubmit={registerUser}>
                <input type="text" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value) }/>
                <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <input type="submit" value="Register" />
            </form>
            </div>


            <footer className='footer'>
                <div id="wishlist-button-footer">
                    <Link to="/users"><button>Explore</button></Link>
                </div>
                <div id="wishlist-button-footer">
                    <Link to="/"><button>Home Page</button></Link>
                </div>
                <div id="wishlist-button-footer">
                    <Link to="/workout-log"><button>Workout Log</button></Link>
                </div>
            </footer>
        </div>
        
    )
}

export default UserContainer