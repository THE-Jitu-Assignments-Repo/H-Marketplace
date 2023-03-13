import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../Navbar'


function Index() {
    return (
        <div>
            <Outlet />
            <Navbar />            
        </div>
    )
}

export default Index
