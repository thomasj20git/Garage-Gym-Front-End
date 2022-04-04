import { useState } from "react"

const ProfilePicComponent = (props) => {
    const [showing, setShowing] = useState(false)
    const [isValidState, setIsValidState] = useState({valid: true, message: ""})
    const [newProfilePic, setNewProfilePic] = useState({
        gymImage: ""
    })
    const toggleShowing = () =>{
        setShowing(!showing)
    }
    const handleInputChange = (e) => {
        setNewProfilePic({
            ...newProfilePic,
            [e.target.name]: e.target.value
        })

    }
    const submitNewPost = (e)=>{
        e.preventDefault()
            let validSubmission = true;
            // if(newPost.gymName.length < 4){
            // setIsValidState({
            //     valid: false,
            //     message: "Gym name need to be at least 4 characters"
            // })
            // validSubmission = false;
            // }
            if(validSubmission){
                props.createNewProfilePicture(newProfilePic)
                setNewProfilePic({
                    gymImage: ""
            })
            setIsValidState({
                 valid: true,
                 message: ""
            })
            setShowing(false)
        }

    }
    return (
        <>
        {
            showing ?
            <div id="modal-background">
                    <div id="modal-container">
                        <button onClick={toggleShowing}>X</button>
                        <form onSubmit={submitNewPost}>
                            {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>}
                            Image URL: <input className="edit-input" onChange={handleInputChange} type="text" name="gymImage" value={newProfilePic.gymImage}/>
                            <button type="submit">Set profile picture!</button>
                        </form>
                    </div>
                </div>
            
        :
        <button onClick={toggleShowing}>Set Profile Picture</button>
        }
        </>
    )
}
export default ProfilePicComponent