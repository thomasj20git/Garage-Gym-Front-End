import { useState, useEffect } from "react";
import SinglePostComponent from "./singlePostComponent/singlePostComponent";
import NewPostComponent from "./newPostComponent/newPostComponent";
import apiUrl from "../apiconfig";
import ProfilePicComponent from "./profilePicComponent/profilePicComponent";

const GymPostContainer = () => {
    const [gymPictures, setGymPictures] = useState([])
    const [profilePicture, setProfilePicture] = useState([])  
    const [newItemServiceError, setNewItemServiceError] = useState("")
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
    const createNewProfilePicture = async (newProfilePic) => {
        const apiResponse = await fetch(`${apiUrl}/gym`, {
            method: "POST",
            body: JSON.stringify(newProfilePic),
            headers: {
                "Content-type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json()
        console.log(parsedResponse)
        if(parsedResponse.success){
            setProfilePicture([parsedResponse.data, ...profilePicture])
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
            const gymPictures = await fetch(`${apiUrl}/gym`)
            const parsedGymPictures = await gymPictures.json();
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
    
    useEffect(()=>{getPosts()}, [])
    // useEffect(getPosts, [])
    // const listItems = gymPictures.gymEquipment
    // console.log(listItems)
    return (
        <div>
            <div id="profile-pic-div">
            <div id="create-profile-pic">
                <h2>Add profile picture here!</h2>
                    <ProfilePicComponent newItemServiceError={newItemServiceError} createNewProfilePicture={createNewProfilePicture}></ProfilePicComponent>
                </div>
            </div>
            
            <div id="posts-flex-container">
                <div id="all-the-pics">
                    <div>
                    {gymPictures.map((gymPicture)=>{
                        return <SinglePostComponent key={gymPicture._id} gymPicture={gymPicture} deletePosts={deletePosts} updatePost={updatePost}></SinglePostComponent>
                        })}
                    </div>
                </div>
                <footer className='footer'>
                <div>
                    <button>Explore</button>
                </div>
                <div id="create-new-post-footer">
                    <NewPostComponent newItemServiceError={newItemServiceError} createNewPost={createNewPost}></NewPostComponent>
                </div>
                <div id="wishlist-button-footer">
                    <button>Wishlist</button>
                </div>

                </footer>
            </div> 
        </div>
    )
}

export default GymPostContainer;