import React from "react";
import { useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import apiUrl from "../apiconfig";

const LoginContainer = () => {
    // const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const registerUser = async (e) => {
        e.preventDefault()
        const response = await fetch(`${apiUrl}/user/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                email, 
                password
        })
        }) 
        const data = await response.json()
        console.log(data)

        if(data.user) {
            localStorage.setItem('token', data.user )
            alert("login succesful")
            if(data.status === 'ok'){
                navigate('/');
            }
        }else{
            alert("please check your username and password")
        }
        
    }

    return (
        <div className="App" >
            <header className='App-header'>
                    <h1>Log in Page</h1>
            </header>
            <h4>Need to creat an account? Sign up here.</h4>
            <Link to="/users"><button>Sign Up</button></Link>


            <div>
            <h1>Enter email and password</h1>
            <form onSubmit={registerUser}>
                {/* <input type="text" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value) }/> */}
                <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <input type="submit" value="Log In" />
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

export default LoginContainer