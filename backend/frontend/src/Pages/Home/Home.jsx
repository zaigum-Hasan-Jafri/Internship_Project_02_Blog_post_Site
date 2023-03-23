import './Home.css'
import Header from '../../Components/Header/Header'
import Posts from '../../Components/Posts/Posts'
import SideBar from '../../Components/SideBar/SideBar'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { Context } from '../../Context/Context'

const Home = () => {
  const { user} = useContext(Context)
  const [posts, setposts] = useState('')
  const {search} = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/post/all'+search);
      setposts(res.data);
    }
    fetchData();
  }, [search,user])
  return (
    <div className="home">
      <Header />
      <div className="home-container">
        <Posts posts={posts}/>
        <SideBar />
      </div>
    </div>
  )
}

export default Home