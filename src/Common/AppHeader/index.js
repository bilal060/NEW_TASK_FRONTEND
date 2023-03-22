import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import userImage from '../../Assets/Images/user.png'

const AppHeader = () => {
    const Location = useLocation();
    const [userData, setuserData] = useState()

    useEffect(() => {
        const currentUser = localStorage.getItem("userdata");
        setuserData(JSON.parse(currentUser));

    }, [])

    return (
        <div className='app-header'>
            <div className='container gap-16px'>
                <p className='font-24 font-weight-700'>Logo</p>
                <div className='d-flex align-items-center gap-16px'>
                    <Link to={`/newsfeed`} className={`w-100 ${'/newsfeed' === Location.pathname ? 'header-item-active' : ''} header-item`}>News Feed</Link>
                    <Link to={`/articles`} className={`w-100 ${'/articles' === Location.pathname ? 'header-item-active' : ''} header-item`}>Articles</Link>
                </div>
                <div className='d-md-flex d-none align-items-sm-center gap-16px h-100'>
                    <div className=''>
                        <p className='font-18-100 font-weight-600 mb-1 text-capitalize'>{userData?.name}</p>
                        <p className='font-14-100 font-weight-500 text-grey'>{userData?.email}</p>
                    </div>
                    <img src={userImage} alt='user-icon' className='user-icon' />
                    <Link to={"/login"} className='logout'>Logout</Link>
                </div>
                <div className="dropdown d-md-none d-block h-100">
                    <button className="p-0 bg-transparent logout h-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img src={userImage} alt='user-icon' className='h-100 user-icon' />
                    </button>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <div className='dropdown-item'>
                            <p className='font-18-100 font-weight-600 mb-2 text-capitalize'>{userData?.name}</p>
                            <p className='font-14-100 font-weight-500 text-grey'>{userData?.email}</p>
                        </div>
                        <Link to={"/login"} className='dropdown-item px-4 mt-2 bg-transparent text-blue border-top '>Logout</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppHeader