import { useState } from "react"


const SingleWorkoutComponent = (props) => {
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [updateWorkout, setUpdatedWorkout] = useState({
        date: props.workout.date,
        exercises: props.workout.exercises,
        notes: props.workout.notes,
        _id: props.workout._id
    })
    const handleInputChange = (e) => {
        setUpdatedWorkout({
            ...updateWorkout,
            [e.target.name]: e.target.value
        })

    }
    const submitUpdatedWorkout = (e) =>{
        e.preventDefault();
        props.updateWorkout(props.workout._id, updateWorkout)
        setShowing(false)
    }

    
    return(
        <>
        
        <div className="index-single-workout">
            <p>Date: {props.workout.date} </p>
            <p>exercises: {props.workout.exercises}</p>
            <p>notes: {props.workout.notes}</p>
            <button onClick={()=>{
                props.deleteWorkout(props.workout._id)
                }}>Delete Workout
            </button>
            {
            showing ?
            <div id="modal-background">
                <div id="modal-container">
                    <button onClick={toggleShowing}>Close</button>
                    <form onSubmit={submitUpdatedWorkout}>
                        Date: <input onChange={handleInputChange} type="date" name="date" value={updateWorkout.date}/>
                        Exercises: <input onChange={handleInputChange} type="text" name="exercises" value={updateWorkout.exercises}/>
                        Notes: <input onChange={handleInputChange} type="text" name="notes" value={updateWorkout.notes}/>
                    <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            :
            <button onClick={toggleShowing}>Edit Workout</button>
            }
        </div>

        </>
        
    )
}
export default SingleWorkoutComponent