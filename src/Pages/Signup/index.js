import axios from 'axios';
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';



const SignupPage = () => {
    const [isSignedIn, setisSignedIn] = useState(false);
    const [loading, setloading] = useState(true);

    const [signinDetails, setSigninDetails] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });


    const API_URI = 'http://127.0.0.1:8000/api/register';
    const postSigninData = async () => {
        try {
            setloading(false)
            const fetchData = await axios.post(API_URI, signinDetails)
            localStorage.setItem("userdata", JSON.stringify(fetchData.data.user));
            setisSignedIn(true);
        }
        catch (error) {
            console.log(error)
            alert("Sign in failed please check your credentials!!")
        }
    }

    const submitHandler = async e => {
        e.preventDefault();
        postSigninData();
    }

    const formHandler = (e) => {
        const { name, value } = e.target;
        setSigninDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    return (
        <>
            {!loading &&
                <div className='loader'>
                </div>
            }
            <div className='signup-page container'>
                {isSignedIn &&
                    <Navigate to="/newsfeed" replace={true} />
                }
                <div className='register-sub'>
                    <h1 className='font-40 font-weight-800 text-blue mb-3 letter-spacing'>Register Yourself.</h1>
                    <p className='font-18 font-weight-400 mb-5 letter-spacing'>Create your new account</p>

                    <form onSubmit={(e) => { submitHandler(e) }}>
                        <div className='form-control mb-32px'>
                            <label>Full Name</label>
                            <input
                                type='name'
                                name='name'
                                required
                                placeholder='Enter your email'
                                className='form-input'
                                onChange={e => formHandler(e)}

                            />
                        </div>
                        <div className='form-control mb-32px'>
                            <label>Email</label>
                            <input
                                type='email'
                                name='email'
                                required
                                placeholder='Enter your email'
                                className='form-input'
                                onChange={e => formHandler(e)}

                            />
                        </div>
                        <div className='form-control mb-3'>
                            <label>Password</label>
                            <input
                                name='password'
                                required
                                type={"password"}
                                placeholder='Enter your password'
                                className='form-input font-weight-800'
                                onChange={e => formHandler(e)}
                                maxLength={16}
                                minLength={8}

                            />
                            {signinDetails.password?.length > 16 || signinDetails.password?.length < 8 ?
                                <div className='d-flex justify-content-start align-items-center'>
                                    <p className='text-danger'>Password must contain at least 8 to 16 characters. </p>
                                </div>
                                :
                                <div className='d-flex justify-content-end align-items-center'>
                                    <p className='text-green font-weight-600'>Good</p>
                                </div>
                            }
                        </div>
                        <div className='form-control mb-32px'>
                            <label>Confirm Password</label>
                            <input
                                name='password_confirmation'
                                required
                                type={"password"}
                                placeholder='Enter your password'
                                className='form-input font-weight-800'
                                onChange={e => formHandler(e)}
                                maxLength={16}
                                minLength={8}

                            />
                            {signinDetails.password_confirmation !== signinDetails.password ?
                                <p className='text-danger'>Passwords are not same. </p>
                                :
                                ''
                            }
                        </div>
                        <div>
                            <button type='submit' className='register-btn w-100'>Create Account</button>
                        </div>
                    </form>
                    <p className='font-18 font-weight-400 mt-2'>Already have an account <Link to={'/login'} className='text-blue font-weight-500'>
                        <u>Login</u>.
                    </Link>
                    </p>

                </div>
            </div>
        </>
    )
}

export default SignupPage