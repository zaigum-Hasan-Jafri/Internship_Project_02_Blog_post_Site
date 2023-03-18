import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SideBar from '../../Components/SideBar/SideBar'
import { Context } from '../../Context/Context'
import './SinglePost.css'

const SinglePost = () => {
    const { user } = useContext(Context)
    const [post, setpost] = useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [update, setUpdate] = useState(false)
    const location = useLocation()
    const path = (location.pathname.split('/')[2])
    const Profile = "http://localhost:8000/images/"
    useEffect(() => {
        const postData = async () => {
            const res = await axios.get(`http://localhost:8000/post/post/${path}`);
            setpost(res.data);
            setTitle(res.data.title)
            setDesc(res.data.desc)
        };
        postData();
    }, [path,user])

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/post/delete/${post._id}`, {
                data: { username: user.username }
            });
            window.location.replace("/home");
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdate = async () => {

        try {
            await axios.put(`http://localhost:8000/post/update/${post._id}`, {
                username: user.username, title, desc
            });
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='SinglePost'>
            <div className="singlePost-body">
                <div className="singlePost-Wrapper">
                    {post.photo ? (<img src={Profile + post.photo} alt={post.title} className="singlePost-img" />) : (<img src={`http://source.unsplash.com/1400x800/?${post.title}`} alt={post.title} className="singlePost-img" />)}
                    {update ? (<input type="text" name="" id="textInput" value={title} className='newPost-form-title' autoFocus={true} onChange={e => setTitle(e.target.value)} />) : (
                        <h3 className="singlePost-title">{post.title}
                            <div className="singlePost-edit">
                                {user?(post.username === user.username &&
                                    (<><i className="singlePost-icon fa-solid fa-pen-to-square" onClick={() => setUpdate(true)}></i>
                                        <i className="singlePost-icon fa-solid fa-trash" onClick={handleDelete}></i></>)):(<></>)
                                }
                            </div>
                        </h3>
                    )}
                    <div className="singlePost-info">
                        <span className="info-author">Author:
                            <Link to={`/?user=${post.username}`} className='link'>
                                <strong>{post.username} </strong>
                            </Link>
                        </span>
                        <span className="info-data">{new Date(post.createdAt).toDateString()}</span>
                    </div>
                    {update ? (<textarea name="" id="textareaInput" value={desc} className='newPost-form-textarea' onChange={e => setDesc(e.target.value)}></textarea>) : (
                        <div className="singlePost-description">
                            <div dangerouslySetInnerHTML={{ __html: post.desc }} /> 
                        </div>
                    )}
                    {update && <button type="button" className='newPost-form-button' onClick={handleUpdate}>Update Post</button>}

                </div> 

            </div>
            <SideBar />
        </div>
    )
}

export default SinglePost