import { useState } from "react"


const SinglePostComponent = (props) => {
    const [showing, setShowing] = useState(false)
    const [isValidState, setIsValidState] = useState({valid: true, message: ""})
    const [updatePost, setUpdatePost] = useState({
        gymName: props.gymPicture.gymName,
        gymEquipment: props.gymPicture.gymEquipment,
        _id: props.gymPicture._id
    })
    const toggleShowing = () =>{
        setShowing(!showing)
    }
    const handleInputChange = (e) => {
        setUpdatePost({
            ...updatePost,
            [e.target.name]: e.target.value
        })

    }
    const submitUpdatePost = (e) => {
        e.preventDefault()
        props.updatePost(props.gymPicture._id, updatePost)
        setShowing(false)

    }
    return(
        <div className="index-single-post">
            <h3>Gym Name: {props.gymPicture.gymName}</h3>
            <div id="image-div">
                <img className="images" src={props.gymPicture.gymImage}></img>
            </div>
            <p>Gym Equipment: {props.gymPicture.gymEquipment}</p>
            <button onClick={()=>{
                props.deletePosts(props.gymPicture._id)
            }}>Delete this post</button>
            {
                showing ?
                <div>
                <button onClick={toggleShowing}>X</button>
                    <form onSubmit={submitUpdatePost}>
                        {isValidState.valid ? null : <p className="form-error">{isValidState.message}</p>}
                        Gym Name: <input onChange={handleInputChange} type="text" name="gymName" value={updatePost.gymName}/>
                        Equipment: <input onChange={handleInputChange} type="text" name="gymEquipment" value={updatePost.gymEquipment}/>
                        Image URL: <input onChange={handleInputChange} type="text" name="gymPicture" value={updatePost.gymImage}/>
                        <button type="submit">Reupload Post!</button>
                    </form>
                </div>
                :
                <button onClick={toggleShowing}>Edit This Post</button>

            }
           
        </div>
    )
}

export default SinglePostComponent