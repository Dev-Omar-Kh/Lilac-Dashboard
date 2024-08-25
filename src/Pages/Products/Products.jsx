import React from 'react';

import localCSS from '../../Style/Local-style.module.css';
import { Outlet } from 'react-router-dom';


export default function Products() {

    return <React.Fragment>

        <div className={localCSS.container}>

            <div className={localCSS.title}>
                <i className="fa-solid fa-basket-shopping"></i>
                Products 
            </div>

            <Outlet />

        </div>

    </React.Fragment>

}
