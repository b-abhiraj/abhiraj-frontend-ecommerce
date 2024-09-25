import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout.js'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/authStyles.css'
import { useAuth } from '../../context/auth.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth()

    const location = useLocation();
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/login`, {
                email,
                password
            })
            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state || '/')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
        }
    }

    return (
        <Layout title={'Register Ecommerce-App'}>
            <div className='register-bg'>
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <h1>Login Page</h1>

                        <div className="mb-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(ev) => setEmail(ev.target.value)}
                                className="form-control"
                                id="exampleInputEmail1"
                                placeholder='Email'
                                required />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder='Password'
                                required />
                        </div>
                        <div className='mb-3 align-items-center '>
                            <button type="submit" className="align-center " onClick={() => navigate('/forgot-password')}>Forgot Password</button>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>

            </div>
        </Layout>
    )
}

export default Login