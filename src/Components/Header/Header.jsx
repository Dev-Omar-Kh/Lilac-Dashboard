import React, { useEffect } from 'react';
import {motion} from 'framer-motion'
import { useDispatch } from 'react-redux';

import hCSS from './header.module.css';
import { filterProduct } from '../../Redux/Products';

export default function Header({clickNav}) {

    // ====== search-product ====== //

    const dispatch = useDispatch();

    const stopSend = (e) => {
        e.preventDefault();
    };

    useEffect(() => {

        const search = document.getElementById('search');

        search.addEventListener('input' , () => {

            dispatch(filterProduct({name : search.value}));

        });

    } , [dispatch]);

    return <React.Fragment>

        <div className={hCSS.container}>

            <div className={hCSS.header}>

                <motion.div whileTap={{scale : 0.9}} onClick={() => clickNav(prevValue => !prevValue)} className={hCSS.nav_ph}>
                    <i className="fa-solid fa-bars-staggered"></i>
                </motion.div>

                <form onSubmit={stopSend} className={hCSS.form}>

                    <input id='search' type="text" placeholder='Search for a product...'/>
                    <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>

                </form>

                <div className={hCSS.more}>

                    <a href="https://lilac-mu.vercel.app" target='_blank' rel="noreferrer">Go to website</a>

                </div>

            </div>

        </div>

    </React.Fragment>

}
