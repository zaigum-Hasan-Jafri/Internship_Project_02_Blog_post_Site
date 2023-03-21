import { Link } from 'react-router-dom'
import './Post.css'

const Post = ({ post }) => {
    const timestamp = (postTime) => {
        const createdAt = new Date(postTime);
        const difference = new Date().getTime() - createdAt.getTime();
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
        if (months > 0) {
            return `${months} month${months > 1 ? "s" : ""} ago`;
        } else if (days > 0) {
            return `${days} day${days > 1 ? "s" : ""} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        } else {
            return "just now";
        }
    }
    const Profile = "https://zaigum-mern-blog-api.onrender.com/images/"
    return (
        <div className='Post'>
            <div className="post-container-img">{post.photo ? (<img src={Profile + post.photo} alt={post.title} className="post-img" />) : (null)}</div>
            <div className="post-body">
                <div className="post-body-cats t-center">
                    {post.categories.map((c, index) => {
                        return <span key={index} className="post-body-cat">{c}</span>
                    })}
                </div>
                <span className="post-title cur"><Link to={`/post/${post._id}`} className='link'>Related to: {post.title}</Link></span> <hr className='post-break' />
                <span className="post-date">{new Date(post.createdAt).toDateString()} | {new Date(post.createdAt).toLocaleTimeString()} | {timestamp(post.createdAt)}</span> <hr className="post-break" />
                <p className="post-description">{ post.desc }</p>
            </div>
        </div>
    )
}

export default Post
