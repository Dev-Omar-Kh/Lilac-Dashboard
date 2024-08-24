import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/Sidebar/SideBar'
import Header from '../Components/Header/Header'

import lCSS from './layout.module.css';

export default function Layout() {

    const [showNav, setShowNav] = useState(false);

    return <React.Fragment>

        <div className={lCSS.container}>

            <SideBar show={showNav} setShow={setShowNav} />

            <div className={lCSS.page_content}>

                <Header clickNav={setShowNav} />

                <div className={lCSS.outlet}>

                    <div className={lCSS.outlet_cont}>

                        <Outlet />

                    </div>

                </div>

            </div>

        </div>

    </React.Fragment>

}
