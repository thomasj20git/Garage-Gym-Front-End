import React from "react";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import SingleWorkoutComponent from "./singleWorkoutComponent/singleWorkoutComponent";
import NewWorkoutComponent from "./newWorkoutComponent/newWorkoutComponent";
import apiUrl from "../apiconfig";

const WorkoutPage = () => {
    const [workouts, setWorkouts] = useState([])
    const createNewWorkout = async (newWorkout) => {
        console.log(newWorkout)

        const apiResponse = await fetch(`${apiUrl}/workout`, {
            method: "POST",
            body: JSON.stringify(newWorkout),
            headers: {
                "Content-type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json()
        console.log(parsedResponse)
        if(parsedResponse.success){
            setWorkouts([parsedResponse.data, ...workouts])
        }else{
            console.log("error")
        }

    }
    const deleteWorkout = async (idToDelete) => {
        const apiResponse = await fetch(`${apiUrl}/workout/${idToDelete}`, {
            method: "DELETE"
        })
        const newWorkouts = workouts.filter((workout)=>{
            return workout._id !== idToDelete
        })
        setWorkouts(newWorkouts)
        
    }
    const getWorkouts = async () => {
        try{
            const workouts = await fetch(`${apiUrl}/workout`)
            const parsedWorkouts = await workouts.json();
            setWorkouts(parsedWorkouts.data)
        }catch(err){
            console.log(err)

        }
    }
    const updateWorkout = async (idToUpdate, workoutToUpdate) => {
        const apiResponse = await fetch(`${apiUrl}/workout/${idToUpdate}`, {
            method: "PUT",
            body: JSON.stringify(workoutToUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const parsedResponse = await apiResponse.json()
        if(parsedResponse.success){
            const newWorkouts = workouts.map(workout => workout._id === idToUpdate ? workoutToUpdate : workout)
            setWorkouts(newWorkouts)
        }else{
            console.log("error")
        }
    }
    useEffect(()=>{getWorkouts()}, [])


    return (
        <div className="App">
            <header className='App-header'>
                    <h1>Workout Tracker</h1>
            </header>
            <div id="posts-flex-container"> 
                {workouts.map((workout)=>{
                 return <SingleWorkoutComponent key={workout._id} workout={workout} deleteWorkout={deleteWorkout} updateWorkout={updateWorkout}></SingleWorkoutComponent>
            })}
            </div>
            <footer className='footer'>
                <div id="wishlist-button-footer">
                    <Link to="/users"><button>Explore</button></Link>
                </div>
                {/* <div id="create-new-post-footer">
                    <NewPostComponent newItemServiceError={newItemServiceError} createNewPost={createNewPost}></NewPostComponent>
                </div> */}
                <div id="wishlist-button-footer">
                    <Link to="/"><button>Home Page</button></Link>
                </div>

                <div id="wishlist-button-footer">
                <NewWorkoutComponent createNewWorkout={createNewWorkout}></NewWorkoutComponent>
                    
                </div>
            </footer>
        </div>
    )
}
export default WorkoutPage