import React from 'react';
import { Outlet } from 'react-router-dom';

import localCSS from '../../Style/Local-style.module.css';

export default function Services() {

    return <React.Fragment>

        <div className={localCSS.container}>

            <div className={localCSS.title}>
                <i className="fa-solid fa-cubes"></i>
                Services 
            </div>

            <Outlet />

        </div>

    </React.Fragment>

}
