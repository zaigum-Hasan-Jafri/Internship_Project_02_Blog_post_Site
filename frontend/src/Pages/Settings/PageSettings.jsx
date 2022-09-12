import './PageSettings.css'
import SideBar from "../../Components/SideBar/SideBar"
import { useContext, useState } from 'react'
import { Context } from '../../Context/Context'
import axios from 'axios';
const PageSettings = () => {
    const { user } = useContext(Context);
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [err, seterror] = useState(null)
    const [success, setsuccess] = useState(false)
    const [update, setUpdate] = useState(false)
    const [file, setFile] = useState("");
    const Profile = "http://localhost:8000/images/"

    const handleUpdate = async () => {
        const newUser = {
            name: user.username,
            username: username || user.username,
            email: email || user.email,
            password: password || user.password,
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file);
            newUser.profile = filename;
            try {
                await axios.post("http://localhost:8000/file/upload", data)
            } catch (error) {
                console.log(error);
            }
        }
        try {
            await axios.put(`http://localhost:8000/users/update/${user._id}`, newUser);
            // window.location.reload();
        } catch (error) {
            seterror(error.response.data.message);
            console.log(error.response.data.message);
        } setsuccess(true)
        setInterval(() => { setsuccess(false) }, 5000);
        setUpdate(false);
    }
    return (
        <div className='PageSettings'>
            <div className="setting-wrapper">
                <div className="setting-title">
                    <span className="setting-title-update ">Update Your Profile</span>
                    <span className="setting-title-delete"><i className="fa-solid fa-trash cur" title='delete account'></i></span>
                </div>
                <form className="setting-form" >
                    <label htmlFor="textInput" className="setting-form-profile">Profile</label>
                    <div className="setting-form-profile-img">
                        {file && !success ? (<img src={URL.createObjectURL(file)} alt={"user-profile"} className="setting-form-img" />) : (<img src={Profile + user.profile} alt={"user-profile"} className="setting-form-img" />)}
                        {/* {success && user.profile && <img src={Profile + user.profile} alt={"user-profile"} className="setting-form-img" />} */}
                        <label htmlFor="fileInput">
                            <i className="setting-form-icon fa-solid fa-circle-user cur" title='edit Profile photo'></i>
                        </label>
                        <i className="setting-form-icon fa-solid fa-pen-to-square cur" onClick={() => setUpdate(true)} title='edit profile'></i>
                        <input type="file" name="" id="fileInput" style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
                    </div>
                    <div className="setting-form-info">
                        <div className="setting-form-info-value">
                            <label className="setting-form-profile">username</label>
                            {update ? (<input type="text" name="" id="textInput" placeholder={user.username} value={username} className='setting-form-input' autoFocus={true} onChange={e => setusername(e.target.value)} />) : (<span className="setting-form-input">{user.username}</span>)}
                            {/* <input type="text" placeholder={user.username} className="setting-form-input" minLength={3} /> */}
                        </div>
                        <div className="setting-form-info-value">
                            <label className="setting-form-profile">Email</label>
                            {update ? (<input type="email" name="" id="emailInput" placeholder={user.email} value={email} className='setting-form-input' onChange={e => setemail(e.target.value)} />) : (!success && <span className="setting-form-input">{user.email}</span>)}
                            {/* <input type="email" placeholder={user.email} className="setting-form-input" minLength={3} /> */}
                        </div>
                        <div className="setting-form-info-value">

                            <label className="setting-form-profile">Password</label>
                            {update ? (<input type="text" name="" id="textInput" value={password} className='setting-form-input' onChange={e => setpassword(e.target.value)} />) : (<span className="setting-form-input"></span>)}
                            {/* <input type="password" placeholder='Rahil' className="setting-form-input" min={5} maxLength={20} /> */}
                        </div>
                    </div>
                    {update && <button type="button" className='setting-form-button cur' onClick={handleUpdate}>Submit & Update</button>}
                </form> <br />
                {err && <span>{err}</span>}
                {success && <span className='center f-lora' style={{ color: "green" }}>Successfully Updated</span>} <br />
                {success && <span className='center f-lora' style={{ color: "green" }}>Make sure to Login Again for better Experience</span>}
            </div>
            <SideBar />

        </div>
    )
}

export default (PageSettings)
