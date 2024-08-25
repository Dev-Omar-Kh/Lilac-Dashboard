import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import sbCSS from './sidebar.module.css';
import './active.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';

export default function SideBar({show , setShow}) {

    // ====== get-logo ====== //

    const getLogo = async() => {

        return await axios.get("https://lilac-backend.vercel.app/content/logo");

    }

    const {data , isLoading} = useQuery('getLogo' , getLogo);

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

                        {isLoading? <ThreeCircles
                            visible={true} height="20" width="20" color="var(--dark-color-1)"
                            ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                        /> : <img src={data.data.data.url} alt="" />}

                    </Link>

                </div>

                <nav className={sbCSS.nav}>

                    <ul>

                        <NavLink to={'/services'}>
                            <li>
                                <i id={sbCSS.i} className="icons_active fa-solid fa-cubes"></i>
                                <span>Services</span>
                            </li>
                        </NavLink>

                        <NavLink to={'/products'}>
                            <li>
                                <i id={sbCSS.i} className="icons_active fa-solid fa-basket-shopping"></i>
                                <span>Products</span>
                            </li>
                        </NavLink>

                        <NavLink to={'/content'}>
                            <li>
                                <i id={sbCSS.i} className="icons_active fa-solid fa-align-left"></i>
                                <span>Content</span>
                            </li>
                        </NavLink>

                        <NavLink to={'/who'}>
                            <li>
                                <i id={sbCSS.i} className="icons_active fa-solid fa-square-poll-horizontal"></i>
                                <span>About Us</span>
                            </li>
                        </NavLink>

                        <NavLink to={'/msgs'}>
                            <li>
                                <i id={sbCSS.i} className="icons_active fa-regular fa-comments"></i>
                                <span>Contact us</span>
                            </li>
                        </NavLink>

                    </ul>

                </nav>

            </div>

        </div>

    </React.Fragment>

}
