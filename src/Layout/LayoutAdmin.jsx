import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/Sidebar/SideBar'
import Header from '../Components/Header/Header'

import lCSS from './layout.module.css';

export default function Layout() {

    // ====== remove-token ====== //

    useEffect(() => {

        const handleUnload = (event) => {
            if (!event.persisted) {
                localStorage.removeItem('passTkn');
            }
        };

        window.addEventListener('unload' , handleUnload);

        return () => {
            window.removeEventListener('unload', handleUnload);
        };

    } , [])

    const [showNav, setShowNav] = useState(false);

    return <React.Fragment>

        <div className={lCSS.container}>

            <SideBar show={showNav} setShow={setShowNav} />

            <div className={lCSS.page_content}>

                <Header clickNav={setShowNav} />

                <div className={lCSS.outlet}>

                    <div className={lCSS.outlet_cont}>

                        <div className={lCSS.outlet_cont_scroll}>

                            <Outlet />

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </React.Fragment>

}
