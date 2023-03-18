import axios from 'axios';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../Context/Context';
import './Login.css'

export default function Login() {
    const { user, dispatch, loading, error } = useContext(Context)
    const navigate = useNavigate();
    const userRef = useRef();
    const passRef = useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: "LOGIN_START" });
            const res = await axios.post('http://localhost:8000/auth/login', {
                username: userRef.current.value,
                password: passRef.current.value,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
        } catch (err) {
            dispatch({ type: "LOGIN_FAIL", payload: err.response.data.message });
            err && console.error(error)
        }
        user && console.log(user) && navigate('/home')
    }
    return (
        <div className='Login '>
            <span className="login-title f-josefin">Login</span>
            <form action="" className="login-form f-lora" onSubmit={handleSubmit}>
                <label className="login-form-profile">Username</label>
                <input type="text" placeholder='Rahil' className="login-form-input" ref={userRef} />
                <label className="login-form-profile">Password</label>
                <input type="password" placeholder='Rahil' className="login-form-input" ref={passRef} />
                <button type="submit" className='login-form-button cur f-lora' disabled={loading}> Login </button>
                <span className="register-text">Don't have an account? <a href='/register' className='link'>Register</a></span>
                <hr/>
                {error && <span className='f-lora center'>****{error}****</span>}
            </form>
        </div>
    )
}
