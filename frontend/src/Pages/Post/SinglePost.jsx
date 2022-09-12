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
            console.log(res.data);
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
                    {post.photo ? (<img src={Profile + post.photo} alt="Blog-img" className="singlePost-img" />) : (<img src={`http://source.unsplash.com/1400x800/?${post.title}`} alt="Blog-img" className="singlePost-img" />)}
                    {update ? (<input type="text" name="" id="textInput" value={title} className='newPost-form-title' autoFocus={true} onChange={e => setTitle(e.target.value)} />) : (
                        <h3 className="singlePost-title">{post.title}
                            <div className="singlePost-edit">
                                {post.username === user.username &&
                                    (<><i className="singlePost-icon fa-solid fa-pen-to-square" onClick={() => setUpdate(true)}></i>
                                        <i className="singlePost-icon fa-solid fa-trash" onClick={handleDelete}></i></>)
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
                        <p className="singlePost-description">
                            Lorem {post.desc} ipsum dolor sit amet consectetur adipisicing elit. Nihil quisquam illum commodi dolore, et in sint impedit ipsam odio temporibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia nisi reprehenderit optio provident quis laudantium et quidem? Illo, facilis? Iusto facilis delectus, dolor harum corrupti numquam quas dolore unde laboriosam voluptatem beatae dignissimos. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti et natus tempora est quibusdam cupiditate aut, libero repudiandae, fugiat delectus saepe, vel aliquid quis impedit in quas. Voluptate placeat, modi mollitia nesciunt debitis cumque minima non laboriosam vero aliquid. Facere, iusto. Obcaecati laborum, cumque ipsa ut nostrum, aliquam minima eius distinctio consequuntur doloribus perferendis dolorum excepturi deserunt ab, corrupti praesentium consequatur magnam qui iste libero! Eveniet, et. Quisquam voluptatem non nemo, eveniet veritatis omnis necessitatibus mollitia modi placeat illo. Voluptate, et illum ipsam nesciunt perferendis aliquam ea aspernatur voluptatum cumque impedit. Excepturi iusto molestias perferendis architecto quis voluptatibus tempore eos autem soluta in dicta ex harum, labore quia nisi totam quisquam tempora distinctio pariatur enim illum deserunt eius? Dolores quis quas voluptates suscipit qui maiores dolor praesentium ipsam, repellat aut quam voluptatibus nisi possimus rem esse ducimus ipsum sed fugiat id aliquam aliquid libero ut! Sed, doloremque. Eum voluptatem deserunt repudiandae tenetur earum est officiis, aliquid praesentium inventore vel blanditiis? Adipisci ad ullam amet earum quod sint at architecto asperiores, impedit voluptate perspiciatis! Voluptatem facere aperiam molestiae quaerat iste, dolores, repudiandae tenetur sit voluptates itaque omnis voluptas, veritatis libero ipsa beatae laborum eius neque dolore voluptatum fugit possimus esse! Temporibus accusantium quasi reprehenderit natus animi, aspernatur cupiditate. Veritatis ratione id ad fugit possimus sed, et ipsa optio dolores esse fugiat molestiae eveniet! Nobis suscipit, ullam earum accusamus dolores, sed, atque eum assumenda nisi magni obcaecati perferendis omnis! Quidem, minima a. Itaque at reiciendis, deleniti deserunt, molestias voluptatum quisquam repellendus error cumque consequatur omnis quas. Rem non ratione provident asperiores? Dolor pariatur incidunt, libero magni quia nam in corrupti ex beatae quibusdam repellat nulla minus quo deserunt, ratione consequatur explicabo non perspiciatis vel sed temporibus voluptas sequi quam consequuntur. Quas soluta quidem corrupti aut quo esse quis totam ipsa asperiores incidunt molestias quos illum rem temporibus officiis mollitia aliquam laborum nemo fugit nam, sed id molestiae suscipit repudiandae. Quo deleniti ad aperiam, odio iste quasi cumque, veritatis laboriosam perferendis qui quidem possimus error enim expedita provident quisquam laudantium ratione nihil ipsam earum repellendus corporis vero.
                        </p>
                    )}
                    {update && <button type="button" className='newPost-form-button' onClick={handleUpdate}>Update Post</button>}

                </div>

            </div>
            <SideBar />

        </div>
    )
}

export default SinglePost