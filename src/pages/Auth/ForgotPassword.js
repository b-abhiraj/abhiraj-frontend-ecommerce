import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout.js'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../../styles/authStyles.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/forgot-password`, {
                email,
                newPassword,
                answer
            })
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
        }
    }

    return (
        <Layout title={'Forgot Password'}>
            <div className='register-bg'>
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <h1>Reset Password</h1>

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
                                type="text"
                                value={answer}
                                onChange={(ev) => setAnswer(ev.target.value)}
                                className="form-control"
                                id="Answer"
                                placeholder='Enter your Favourite Dish ?'
                                required />
                        </div>
                        <div className="mb-3">
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(ev) => setNewPassword(ev.target.value)}
                                className="form-control"
                                id="exampleInputPassword1"
                                placeholder='New Password'
                                required />
                        </div>
                        <button type="submit" className="btn btn-primary">Reset</button>
                    </form>
                </div>

            </div>
        </Layout>
    )
}

export default ForgotPassword