import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header/Header'
import SideBar from '../Components/Sidebar/SideBar'

export default function Layout() {

    return <React.Fragment>

        <Header />

        <div className='sidebar_outlet'>

            <SideBar />

            <div className='outlet'>

                <Outlet />

            </div>

        </div>

    </React.Fragment>

}
