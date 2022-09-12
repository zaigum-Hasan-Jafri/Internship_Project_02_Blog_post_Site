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
  // console.log(userpath)
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:8000/post/all'+search);
      setposts(res.data);
      // console.log(res.data);
    }
    fetchData();
  }, [search,user])
  return (
    <div>
      <Header />
      <div className="home">
        <Posts posts={posts}/>
        <SideBar />
      </div>
    </div>
  )
}

export default Home