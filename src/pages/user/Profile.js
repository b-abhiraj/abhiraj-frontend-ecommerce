import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {

    const [auth, setAuth] = useAuth()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        const { email, name, phone, address } = auth?.user
        setName(name)
        setEmail(email)
        setPhone(phone)
        setAddress(address)
    }, [auth?.user])

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const { data } = await axios.put(`http://localhost:4000/api/v1/auth/profile`, {
                name,
                email,
                phone,
                address,
                password,
                answer
            })
            if (data?.error) {
                toast.error(data?.error)
            }
            else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data?.updatedUser
                localStorage.setItem("auth", JSON.stringify(ls))
                toast.success('Profile updated successfully')
            }
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
        }
    }

    return (
        <Layout title={'Your Profile'}>
            <div className='container-fluid p-3 m-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
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
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(ev) => setEmail(ev.target.value)}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder='Email'

                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(ev) => setPassword(ev.target.value)}
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder='Password'
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(ev) => setPhone(ev.target.value)}
                                        className="form-control"
                                        id="exampleInputPhone"
                                        placeholder='Phone'
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(ev) => setAddress(ev.target.value)}
                                        className="form-control"
                                        id="exampleInputAddress"
                                        placeholder='Address'
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile