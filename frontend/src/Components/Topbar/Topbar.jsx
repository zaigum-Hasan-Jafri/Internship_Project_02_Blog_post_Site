import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/Context'
import './Topbar.css'
const Topbar = () => {
    const { user, dispatch } = useContext(Context);
    const Profile = "/images/"
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }
    return (
        <>
            <div className='topbar'>
                <div className="topbar-left">
                    <i className="fa-brands fa-square-facebook cur"></i>
                    <i className="fa-brands fa-square-instagram cur"></i>
                    <i className="fa-brands fa-square-pinterest cur"></i>
                    <i className="fa-brands fa-square-twitter cur"></i>
                </div>
                <div className="topbar-center">
                    <ul className="topbar-center-list cur">
                        <Link to="/home" className='link'><li>Home</li></Link>
                        <Link to="/about" className='link'><li>About</li></Link>
                        <Link to="/newpost" className='link'><li>New-Post</li></Link>
                        {user ? (<li onClick={handleLogout}>Logout</li>) : (<>
                            <li>
                                <Link to='/login' className='link'>Log In
                                </Link></li>
                            <Link to='/register' className='link'><li>SignUp</li></Link>
                        </>)}                        
                    </ul>
                </div>
                <div className="topbar-right">
                    <ul className="topbar-right-list">
                        {user && <Link to={`/user-settings`}><li><img src={Profile + user.profile} alt={`${user.username}`} className="right-list-image" title={`${user.username}-setting`} /></li></Link>}
                        <i className="fa-solid fa-magnifying-glass right-list-search cur center"></i>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Topbar