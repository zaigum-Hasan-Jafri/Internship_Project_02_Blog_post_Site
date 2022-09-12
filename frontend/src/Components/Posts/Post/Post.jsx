import { Link } from 'react-router-dom'
import './Post.css'

const Post = ({ post }) => {
    const Profile = "http://localhost:8000/images/"
    return (
        <div className='Post'>
            {post.photo ? (<img src={Profile + post.photo} alt="Movie-img" className="post-img" />):(<img src='http://source.unsplash.com/1600x800/?Cinema' alt="Movie-img" className="post-img" />)}
            <div className="post-body">
                <div className="post-body-cats t-center">
                    {post.categories.map((c, index) => {
                        return <span className="post-body-cat">{c}</span>
                    })}
                    {/* <span className="post-body-cat">Cinema</span> */}
                </div>
                <span className="post-title cur"><Link to={`/post/${post._id}`} className='link'>Related {post.title}</Link></span> <hr className='post-break' />
                <span className="post-date">{new Date(post.createdAt).toDateString()} | {"1 hour ago"}</span> <hr className="post-break" />
                <p className="post-description">{post.desc} Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, vel esse odio fugiat, alias optio modi dolores quidem ab expedita odit reiciendis!.</p>
            </div>
        </div>
    )
}

export default Post