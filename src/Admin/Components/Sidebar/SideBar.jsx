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

                        <img src={require('../../Images/logo.png')} alt="" />

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
