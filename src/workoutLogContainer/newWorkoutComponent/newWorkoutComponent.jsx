import { useState } from "react"
const NewWorkoutComponent = (props) => {
    const [showing, setShowing] = useState(false)
    const toggleShowing = () => {
        setShowing(!showing)
    }
    const [newWorkout, setNewWorkout] = useState({
        date: "",
        exercises: "",
        notes: "",
    })
    const handleInputChange = (e) => {
        setNewWorkout({
            ...newWorkout,
            [e.target.name]: e.target.value
        })

    }
    const submitNewWorkout = (e)=>{
        e.preventDefault()
        props.createNewWorkout(newWorkout)
        setNewWorkout({
            date: "",
            exercises: "",
            notes: "",
        })
        toggleShowing()
    }

    return(
        <>
        {
        showing ?
        <div id="modal-background">
            <div id="modal-container">
                <button onClick={toggleShowing}>Close</button>
                <form onSubmit={submitNewWorkout}>
                    Date: <input onChange={handleInputChange} type="date" name="date" value={newWorkout.date}/>
                    Exercises: <input onChange={handleInputChange} type="text" name="exercises" value={newWorkout.exercises}/>
                    Notes: <input onChange={handleInputChange} type="text" name="notes" value={newWorkout.notes}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
       
        :
        <button onClick={toggleShowing}>Add Workout</button>
        }
        
        </>
    )
}
export default NewWorkoutComponent