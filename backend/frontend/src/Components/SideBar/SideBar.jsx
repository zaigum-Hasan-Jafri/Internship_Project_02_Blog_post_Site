import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css'

const SideBar = () => {
    const [category, setcategory] = useState([])
    useEffect(() => {
        const catData = async () => {
            const res = await axios.get(`/category/all`);
            setcategory(res.data);
        };
        catData();
    }, [])
    return (
        <div className='SideBar'>
            <div className="sidebar-items t-center">
                <span className=" sidebar-title">About Me</span>
                <img src="http://source.unsplash.com/300x200/?books" alt="books" className='sidebar-img' />
                <p >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, quisquam.</p>
            </div>
            <div className="sidebar-items t-center">
                <span className=" sidebar-title">Categories</span>
                <ul className="sidebar-list list-none">
                    {category.map((c,index)=>(
                        <Link to={`/?category=${c.name}`} className='link' key={index}>
                        <li key={index} className="sidebar-listItem">{c.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebar-items">
                <span className="t-center sidebar-title">
                    Follow Us !
                </span>
                <div className="sidebar-social center">
                    <i className="fa-brands fa-square-twitter cur sidebar-icon"></i>
                    <i className="fa-brands fa-square-instagram cur sidebar-icon"></i>
                    <i className="fa-brands fa-square-facebook cur sidebar-icon"></i>
                </div>
            </div>
        </div>
    )
}

export default SideBar