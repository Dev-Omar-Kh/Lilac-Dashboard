import React from 'react';
import {motion} from 'framer-motion'

import hCSS from './header.module.css';

export default function Header({clickNav}) {

    const stopSend = (e) => {
        e.preventDefault();
    }

    return <React.Fragment>

        <div className={hCSS.container}>

            <div className={hCSS.header}>

                <motion.div whileTap={{scale : 0.9}} onClick={() => clickNav(prevValue => !prevValue)} className={hCSS.nav_ph}>
                    <i className="fa-solid fa-bars-staggered"></i>
                </motion.div>

                <form onSubmit={stopSend} className={hCSS.form}>

                    <input type="text" placeholder='Search about something...'/>
                    <button type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>

                </form>

                <div className={hCSS.more}>

                    <a href="http://localhost:3000/">Go to website</a>

                </div>

            </div>

        </div>

    </React.Fragment>

}
