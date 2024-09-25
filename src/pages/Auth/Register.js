import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout.js'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../../styles/authStyles.css'
const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const res = await axios.post(`http://localhost:4000/api/v1/auth/register`, {
                name,
                email,
                phone,
                address,
                password,
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
        <Layout title={'Register Ecommerce-App'}>
            <div className='register-bg'>
                <div className='form-container'>
                    <form onSubmit={handleSubmit}>
                        <h1>Register Page</h1>
                        <div className="mb-3">
                            <input
                                type="text"
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                                className="form-control"
                                id="exampleInputName"
                                placeholder='Name'
                                required />
                        </div>
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
                        <div className="mb-3">
                            <input
                                type="text"
                                value={phone}
                                onChange={(ev) => setPhone(ev.target.value)}
                                className="form-control"
                                id="exampleInputPhone"
                                placeholder='Phone'
                                required />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                value={address}
                                onChange={(ev) => setAddress(ev.target.value)}
                                className="form-control"
                                id="exampleInputAddress"
                                placeholder='Address'
                                required />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                value={answer}
                                onChange={(ev) => setAnswer(ev.target.value)}
                                className="form-control"
                                id="exampleInputAddress"
                                placeholder='What is your Favourite Dish? '
                                required />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>

            </div>
        </Layout>
    )
}

export default Register