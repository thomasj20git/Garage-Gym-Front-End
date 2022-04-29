import { useState } from "react"

const NewPostComponent = (props) => {
    const [showing, setShowing] = useState(false)
    const [isValidState, setIsValidState] = useState({valid: true, message: ""})
    const [newPost, setNewPost] = useState({
        gymName: "",
        gymEquipment: "",
        gymImage: ""
    })
    const toggleShowing = () =>{
        setShowing(!showing)
    }
    const handleInputChange = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })

    }
    const submitNewPost = (e)=>{
        e.preventDefault()
            let validSubmission = true;
            if(newPost.gymName.length < 4){
            setIsValidState({
                valid: false,
                message: "Gym name need to be at least 4 characters"
            })
            validSubmission = false;
            }
            if(validSubmission){
                props.createNewPost(newPost)
                setNewPost({
                    gymName: "",
                    gymEquipment: "",
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
                            Picture Name: <input className="edit-input" onChange={handleInputChange} type="text" name="gymName" value={newPost.gymName}/>
                            Equipment Link: <input className="edit-input" onChange={handleInputChange} type="text" name="gymEquipment" value={newPost.gymEquipment}/>
                            Image URL: <input className="edit-input" onChange={handleInputChange} type="text" name="gymImage" value={newPost.gymImage}/>
                            <button type="submit">Upload Post!</button>
                        </form>
                    </div>
                </div>
           
        :
        <button onClick={toggleShowing}>Create New Post</button>
        }
        </>
    )
}
export default NewPostComponent