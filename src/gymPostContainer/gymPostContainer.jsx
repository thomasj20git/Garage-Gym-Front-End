import { useState, useEffect } from "react";
import SinglePostComponent from "./singlePostComponent/singlePostComponent";
import NewPostComponent from "./newPostComponent/newPostComponent";
import apiUrl from "../apiconfig";
import {Link, useNavigate} from "react-router-dom";
import jwt_decode from 'jwt-decode'

const GymPostContainer = () => {
    const [gymPictures, setGymPictures] = useState([])
    const [newItemServiceError, setNewItemServiceError] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const createNewPost= async (newPost) => {
        const apiResponse = await fetch(`${apiUrl}/gym`, {
            method: "POST",
            body: JSON.stringify(newPost),
            headers: {
                "Content-type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json()
        console.log(parsedResponse)
        if(parsedResponse.success){
            setGymPictures([parsedResponse.data, ...gymPictures])
        }else{
            setNewItemServiceError(parsedResponse.data)
        }
    } 
    const deletePosts = async (idToDelete) => {
        try{
            const apiResponse = await fetch(`${apiUrl}/gym/${idToDelete}`, {
            method: "DELETE"
        })
        const parsedResponse = await apiResponse.json()
        if(parsedResponse.success === true){
            const newGymPictures = gymPictures.filter((gymPicture)=>{
                return gymPicture._id !== idToDelete
            })
            setGymPictures(newGymPictures)
        }else{
        }
        }catch(err){
            console.log(err)
        }
    }
    const getPosts = async () => {
        try{
            const gymPictures = await fetch(`${apiUrl}/gym`, {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            })
            const parsedGymPictures = await gymPictures.json();
            console.log(parsedGymPictures)
            setGymPictures(parsedGymPictures.data)
        }catch(err){
            console.log(err)

        }
    }
    const updatePost = async (idToUpdate, gymPostToUpdate) => {
        const apiResponse = await fetch(`${apiUrl}/gym/${idToUpdate}`, {
            method: "PUT",
            body: JSON.stringify(gymPostToUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json()
        if(parsedResponse.success){
            const newGymPictures = gymPictures.map(gymPicture => gymPicture._id === idToUpdate ? gymPostToUpdate : gymPicture)
            setGymPictures(newGymPictures)
        }else{
            //setrequesterror
        }
  
    }
    // const getUser = async () => {

    // }
    
    // useEffect(()=>{getPosts()}, [])
    // useEffect(getPosts, [])
    // const listItems = gymPictures.gymEquipment
    // console.log(listItems)

    const history = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            console.log("token found")
            const user = jwt_decode(token)
            if(!user){
                localStorage.removeItem('token')
                history.replace('/login')
            }else{
                setIsLoggedIn(true)
                getPosts()}
            }
        }
        ,[])
    
    const logOut = async (e) =>{
        e.preventDefault()
        setIsLoggedIn(true)
        localStorage.clear()
        history('/login')
    }

    return (
        <div className="App">
           {
            isLoggedIn ?
            <>
            <header className='App-header'>
                <h1>Share Pictures Here!</h1>
            </header>
            <div>
                <button onClick={logOut}>log out</button>
            </div>
            <div id="posts-flex-container"> 
                    {gymPictures.map((gymPicture)=>{
                        return <SinglePostComponent key={gymPicture._id} gymPicture={gymPicture} deletePosts={deletePosts} updatePost={updatePost}></SinglePostComponent>
                    })}    
            </div> 
            </>
            :
            <div>you need to log in</div>
            

           }
            <footer className='footer'>
                <div id="wishlist-button-footer">
                    <Link to="/users"><button>Create Account/Log In</button></Link>
                </div>
                <div id="create-new-post-footer">
                    <NewPostComponent newItemServiceError={newItemServiceError} createNewPost={createNewPost}></NewPostComponent>
                </div>
                <div id="wishlist-button-footer">
                    <Link to="/workout-log"><button>Workout Log</button></Link>
                </div>
            </footer>
        </div>
    )
}

export default GymPostContainer;