import axios from 'axios'
import { useState } from 'react'
import './Register.css'

export default function Register() {
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [err, seterror] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        seterror(null)
        try {
            const res = await axios.post('/auth/register', {
                username, email, password
            });
            res.data && window.location.replace('/login')
        } catch (error) {
            seterror(error.response.data.message)
        }
    }


    return (
        <div className='Login'>
            <span className="login-title f-josefin">Register</span>
            <form action="" className="login-form f-lora" onSubmit={handleSubmit}>
                {username && email && password !== '' ? "" : <span style={{ color: "Red", fontSize: '14px' }}> Fill All The Field...</span>}
                <label className="login-form-profile">username <span className="required">*</span></label>
                <input type="text" placeholder='Rahil' className="login-form-input" required onChange={e => setusername(e.target.value)} />
                <label className="login-form-profile">Email <span className="required">*</span></label>
                <input type="email" placeholder='Rahil@telegmail.com' className="login-form-input" required onChange={e => setemail(e.target.value)} />
                <label className="login-form-profile">Password <span className="required">*</span></label>
                <input type="password" placeholder='Rahil' className="login-form-input" required onChange={e => setpassword(e.target.value)} />
                <button type="submit" className='login-form-button cur f-lora'> Register </button>
                <span className="register-text">Already have an account? <a href='/login' className='link'>Login</a></span>
            </form>
            {err && <span className="f-lora" style={{ color: "Red", fontSize: '22px' }}>{err}</span>}
        </div>
    )
}
