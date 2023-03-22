import axios from 'axios';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';



const LoginPage = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isloggedin, setisloggedin] = useState(false);
    const [loginDetails, setloginDetails] = useState({
        email: '',
        password: ''
    });

    const [modalText, setmodalText] = useState("");

    const API_URI = 'http://127.0.0.1:8000/api/login';
    const postLoginData = async () => {
        try {
            const fetchData = await axios.post(API_URI, loginDetails)
            localStorage.setItem("token", fetchData.data.token?.id);
            localStorage.setItem("userdata", JSON.stringify(fetchData.data.user));
            setisloggedin(true);

        } catch (error) {
            console.log(error)
            handleShow();
            setmodalText("Login failed!! Please check your credentials.");
        }
    }


    const submitHandler = async e => {
        e.preventDefault();
        postLoginData();
    }

    const formHandler = (e) => {
        const { name, value } = e.target;
        setloginDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <>
            <div className='login-page container'>
                {isloggedin &&
                    <Navigate to="/newsfeed" replace={true} />
                }
                <div className='register-sub'>
                    <h1 className='font-40 font-weight-800 text-blue mb-3 letter-spacing'>Welcome Back!</h1>
                    <p className='font-18 font-weight-400 mb-5 letter-spacing'>Login to your account</p>

                    <form onSubmit={(e) => { submitHandler(e) }}>
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
                        <div className='form-control mb-32px'>
                            <label>Password</label>
                            <input
                                name='password'
                                required
                                type={"password"}
                                placeholder='Enter your password'
                                className='form-input font-weight-800'
                                onChange={e => formHandler(e)}
                            />
                        </div>
                        <div>
                            <button type='submit' className='register-btn w-100'>Login</button>
                        </div>
                    </form>
                    <p className='font-18 font-weight-400 mt-2'>Don't have an account <Link to={'/signup'} className='text-blue font-weight-500'> <u>Signup</u>.</Link></p>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <p className='text-center'>{modalText}</p>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default LoginPage