import Post from './Post/Post'
import './Posts.css'

const Posts = ({ posts }) => {
  return (
    <div className='Posts'>
      {posts && posts.map((p,index) => {
        return <Post key={index} post={p}/>
      })}
    </div>
  )
}

export default Posts