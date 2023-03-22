import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Articles from '../../Pages/Articles'
import NewsFeed from '../../Pages/NewsFeed'

const ContentRoutes = () => {
    return (
        <div className='content'>
            <div className='container'>
                <Routes>
                    <Route path="/newsfeed" element={<NewsFeed />} />
                    <Route path="/articles" element={<Articles />} />
                </Routes>
            </div>
        </div>
    )
}

export default ContentRoutes