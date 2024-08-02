import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import sbCSS from './sidebar.module.css';
import './active.css'

export default function SideBar({show , setShow}) {

    // console.log(show);

    useEffect(() => {

        const sideBar = document.getElementById('sideBar');
        const container = document.getElementById('container');

        container.onclick = () => {setShow(false)};

        if(show){

            container.classList.add(sbCSS.container_display)
            sideBar.classList.add(sbCSS.side_bar_display);

        }
        else{

            container.classList.remove(sbCSS.container_display)
            sideBar.classList.remove(sbCSS.side_bar_display);

        }

    } , [show , setShow])

    return <React.Fragment>

        <div id='container' className={sbCSS.container}>

            <div id='sideBar' className={sbCSS.side_bar}>

                <div className={sbCSS.logo}>

                    <Link to={'/'}>

                        <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7929 4.5957V4.59675C15.776 4.62583 12.2955 10.6297 7.95067 17.96C3.59532 25.3081 0 31.1911 0 31.1911L12.3315 31.137L12.3323 31.1369L12.3297 31.1464C18.3172 31.0304 23.7182 27.0939 25.3119 21.1458C25.8102 19.2864 25.8853 17.4147 25.5964 15.626C24.8043 10.3587 20.9149 6.07496 15.7929 4.5957Z" fill="#E63946"/>
                            <path d="M22.6074 0.80957V0.810614C22.5905 0.839693 19.1099 6.84355 14.7651 14.1739C10.4098 21.522 6.81445 27.4049 6.81445 27.4049L19.1459 27.3509L19.1467 27.3507L19.1442 27.3603C25.1317 27.2443 30.5326 23.3078 32.1264 17.3597C32.6246 15.5003 32.6998 13.6286 32.4108 11.8398C31.6187 6.5726 27.7294 2.28883 22.6074 0.80957Z" fill="#1D3557"/>
                        </svg>

                        <p>Dashboard</p>

                    </Link>

                </div>

                <nav className={sbCSS.nav}>

                    <ul>

                        <NavLink to={'/'}><li><i id={sbCSS.i} className="icons_active fa-solid fa-users-viewfinder"></i><span>Users</span></li></NavLink>
                        <NavLink to={'/info'}><li><i id={sbCSS.i} className="icons_active fa-solid fa-hashtag"></i><span>Information</span></li></NavLink>
                        <NavLink to={'/main'}><li><i id={sbCSS.i} className="icons_active fa-regular fa-images"></i><span>Main</span></li></NavLink>
                        <NavLink to={'/offers'}><li><i id={sbCSS.i} className="icons_active fa-solid fa-gifts"></i><span>Offers</span></li></NavLink>
                        <NavLink to={'/products'}><li><i id={sbCSS.i} className="icons_active fa-solid fa-basket-shopping"></i><span>Products</span></li></NavLink>
                        <NavLink to={'/msgs'}><li><i id={sbCSS.i} className="icons_active fa-regular fa-comments"></i><span>Message</span></li></NavLink>
                        <NavLink to={'/who'}><li><i id={sbCSS.i} className="icons_active fa-solid fa-square-poll-horizontal"></i><span>Who we are</span></li></NavLink>

                    </ul>

                </nav>

            </div>

        </div>

    </React.Fragment>

}
