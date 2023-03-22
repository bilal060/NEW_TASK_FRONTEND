import React from 'react'
import AppHeader from '../AppHeader';

const AppLayout = (props) => {
    const { children } = props;
    return (
        <div className=''>
            <AppHeader />
            {children}
        </div>
    )
}

export default AppLayout