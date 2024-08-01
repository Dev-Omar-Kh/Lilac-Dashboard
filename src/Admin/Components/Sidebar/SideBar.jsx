import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import sbCSS from './side_bar.module.css';
import './active.css';

export default function SideBar() {


    useEffect(() => {

        const navPh = document.getElementById('nav_ph');
        const container = document.getElementById('container');
        const closeNav = document.getElementById('closeNav');

        navPh.onclick = () => {

            container.classList.add(sbCSS.show_nav);

        }

        closeNav.onclick = () => {

            container.classList.remove(sbCSS.show_nav);

        }

    })

    return <React.Fragment>

        <div id='nav_ph' className={sbCSS.nav_ph}>

            <i className="fa-solid fa-bars-staggered"></i>

        </div>

        <div id='container' className={sbCSS.container}>

            <div className={sbCSS.close_mark}>

                <div id='closeNav' className={sbCSS.x_mark}>

                    <span></span>
                    <span></span>

                </div>

            </div>

            <NavLink to={'/'} className={sbCSS.li_links}>

                <i className="fa-solid fa-users"></i>
                <p>Users</p>

            </NavLink>

            <NavLink to={'/info'} className={sbCSS.li_links}>

                <i className="fa-solid fa-circle-info"></i>
                <p>Information</p>

            </NavLink>

            <NavLink to={'/who'} className={sbCSS.li_links}>

                <i className="fa-solid fa-circle-question"></i>
                <p>who are we</p>

            </NavLink>

            <NavLink to={'/offers'} className={sbCSS.li_links}>

                <i className="fa-solid fa-gifts"></i>
                <p>Our Offers</p>

            </NavLink>

            <NavLink to={'/main'} className={sbCSS.li_links}>

                <i className="fa-solid fa-image"></i>
                <p>Main</p>

            </NavLink>

            <NavLink to={'/products'} className={sbCSS.li_links}>

                <i className="fa-solid fa-cart-shopping"></i>
                <p>Products</p>

            </NavLink>

            <NavLink to={'/messages'} className={sbCSS.li_links}>

                <i className="fa-solid fa-message"></i>
                <p>Messages</p>

            </NavLink>

        </div>

    </React.Fragment>

}
