import React from 'react';

import hCSS from './header.module.css';
import { Link } from 'react-router-dom';

export default function Header() {

    return <React.Fragment>

        <div className={hCSS.header}>

            <div className={hCSS.logo}>

                <Link to={'/'}>

                    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.7929 4.5957V4.59675C15.776 4.62583 12.2955 10.6297 7.95067 17.96C3.59532 25.3081 0 31.1911 0 31.1911L12.3315 31.137L12.3323 31.1369L12.3297 31.1464C18.3172 31.0304 23.7182 27.0939 25.3119 21.1458C25.8102 19.2864 25.8853 17.4147 25.5964 15.626C24.8043 10.3587 20.9149 6.07496 15.7929 4.5957Z" fill="#E63946"/>
                        <path d="M22.6074 0.80957V0.810614C22.5905 0.839693 19.1099 6.84355 14.7651 14.1739C10.4098 21.522 6.81445 27.4049 6.81445 27.4049L19.1459 27.3509L19.1467 27.3507L19.1442 27.3603C25.1317 27.2443 30.5326 23.3078 32.1264 17.3597C32.6246 15.5003 32.6998 13.6286 32.4108 11.8398C31.6187 6.5726 27.7294 2.28883 22.6074 0.80957Z" fill="#F1FAEE"/>
                    </svg>

                    <p>Dashboard</p>

                </Link>

            </div>

            <a href='http://localhost:3000/' rel="noreferrer" target='_blank' className={hCSS.back_web}>Got to website</a>

        </div>

    </React.Fragment>

}
