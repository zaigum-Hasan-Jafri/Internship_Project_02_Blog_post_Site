import axios from 'axios';
import { useContext, useState } from 'react'
import { Context } from '../../Context/Context';
import './NewPost.css'

export default function NewPost() {
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState("");

    const handleSubmit = async (e) => {
        const newPost = {
            title,
            desc,
            username: user.username,
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("http://localhost:8000/file/upload", data)
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const res = await axios.post("http://localhost:8000/post/create", newPost);
            window.location.replace('/post/'+res.data._id);
            // console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='NewPost'>
            {file && (<img src={URL.createObjectURL(file)} alt="" className="NewPost-img" />)}

            <form className="newPost-form" onSubmit={handleSubmit}>
                <div className="newPost-form-group center">
                    <label htmlFor="fileInput"><i className="newPost-form-icon fa-solid fa-circle-plus cur"></i></label>
                    <input type="file" id='fileInput' style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
                    <input type="text" name="" id="textInput" placeholder='Title' className='newPost-form-title' autoFocus={true} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="newPost-form-group center">
                    <textarea name="" id="textareaInput" placeholder='Write Something... & Tell your Story' className='newPost-form-textarea' onChange={e => setDesc(e.target.value)}></textarea>
                </div>
                <div className="center">
                    <button type="submit" className='newPost-form-button'>Publish Post</button>
                </div>
            </form>
        </div>
    )
}
