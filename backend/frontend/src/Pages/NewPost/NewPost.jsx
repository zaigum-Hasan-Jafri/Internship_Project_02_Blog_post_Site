import axios from 'axios';
import { useContext, useState } from 'react'
import { Context } from '../../Context/Context';
import './NewPost.css'

export default function NewPost() {
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState("");
    const [categories, setCategories] = useState('');

    const handleInput = (event) => {
        const input = event.target.value;
        const words = input.split(' ');
        const linkedWords = words.map((word) => {
            return (word.startsWith('http://') || word.startsWith('https://')) ? (`<a href="${word}" target="_blank">${word}</a>`) : (word)
        });
        const linkedInput = linkedWords.join(' ');
        setDesc(linkedInput);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title,
            desc,
            username: user.username,
            photo: file,
            categories: categories.split(',').map((category) => category.toLowerCase().trim())
        }
        if (file) {
            const data = new FormData();
            const filename = file.size + file.name;
            data.append("name", filename)
            data.append("file", file);
            newPost.photo = filename;
            try {
                axios.post("/file/upload", data);
            } catch (error) {
                console.error(error);
            }
        }
        try {
            await axios.post("/post/create", newPost);
            window.location.replace('/home');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='NewPost'>
            {file && (<img src={URL.createObjectURL(file)} alt="your_post_image" className="NewPost-img" />)}

            <form className="newPost-form" onSubmit={handleSubmit}>
                <div className="newPost-form-group center">
                    <label htmlFor="fileInput" className="newPost-form-icon"><i className="fa-solid fa-circle-plus cur"></i></label>
                    <input type="file" id='fileInput' style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
                    <input type="text" name="" id="textInput" placeholder='Title' className='newPost-form-title' autoFocus={true} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="newPost-form-group center">
                    <input type="text" value={categories} placeholder='Categories' onChange={e => setCategories(e.target.value)} className='newPost-form-title' />
                </div>
                <div className="newPost-form-group center">
                    <textarea
                        name=""
                        id="textareaInput"
                        placeholder='Write Something... & Tell your Story'
                        className='newPost-form-textarea'
                        onChange={handleInput}
                    />
                </div>
                <div className="center">
                    <button type="submit" className='newPost-form-button'>Publish Post</button>
                </div>
            </form >
        </div >
    )
}
