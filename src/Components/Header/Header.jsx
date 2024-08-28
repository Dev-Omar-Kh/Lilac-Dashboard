import React, { useEffect } from 'react';
import {motion} from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';

import hCSS from './header.module.css';
import { filterProduct, filterServices } from '../../Redux/Search';

export default function Header({clickNav}) {

    // ====== search-product ====== //

    const {displaySearchBar , displaySearchBarServices} = useSelector(store => store.products);
    const dispatch = useDispatch();

    const stopSend = (e) => {
        e.preventDefault();
    };

    useEffect(() => {

        if(displaySearchBar || displaySearchBarServices){

            const search = document.getElementById('search');
            search.value = ''

            const handleInput = () => {

                if (displaySearchBar) {

                    dispatch(filterProduct({ name: search.value }));

                } 
                else if (displaySearchBarServices) {

                    dispatch(filterServices({ nameS: search.value }));

                }

            };

            search.addEventListener('input' , handleInput);

            return () => {

                search.removeEventListener('input', handleInput);

            }

        }

    } , [dispatch , displaySearchBar , displaySearchBarServices]);

    return <React.Fragment>

        <div className={hCSS.container}>

            <div className={hCSS.header}>

                <motion.div whileTap={{scale : 0.9}} onClick={() => clickNav(prevValue => !prevValue)} className={hCSS.nav_ph}>
                    <i className="fa-solid fa-bars-staggered"></i>
                </motion.div>

                {displaySearchBar || displaySearchBarServices ? <form onSubmit={stopSend} className={hCSS.form}>

                    <input id='search' type="text" placeholder='Search for a product...'/>
                    <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>

                </form> : <span></span>}

                <div className={hCSS.more}>

                    <a href="https://lilac-pied.vercel.app/" target='_blank' rel="noreferrer">Go to website</a>

                </div>

            </div>

        </div>

    </React.Fragment>

}
