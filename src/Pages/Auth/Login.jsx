import React, { useEffect, useState } from 'react';
import { AnimatePresence , motion } from 'framer-motion';

import loginCSS from './auth.module.css';
import formCSS from '../../Style/form.module.css';

import eye from '../../Images/SVG/eye-icon-svg.svg';
import eyeSlash from '../../Images/SVG/eye-slash-icon-svg.svg';

export default function Login() {

    // ====== view-password ====== //

    const [passwordShowRegister1, setPasswordShowRegister1] = useState(false);

    useEffect(() => {

        const passwordShowRegister1 = document.getElementById('showPasswordRegister1');

        passwordShowRegister1.onclick = () => {

            setPasswordShowRegister1(prevState => !prevState);

        }

    } , [passwordShowRegister1]);

    const viewEye = {

        hidden : {opacity : 0 , transition : {duration : 0.5}},
        visible : {opacity : 1 , transition : {duration : 0.5}},

    }

    return <React.Fragment>

        <div className={loginCSS.container}>

            <div className={loginCSS.title}>
                <img src={require('../../Images/logo.png')} alt="" />
            </div>

            <form className={formCSS.form}>

                <div className={formCSS.input_cont}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="password">
                        <span> Email : </span>
                    </label>

                    <input
                        id='text'
                        type="text" placeholder="Enter your email"
                    />

                </div>

                <div className={formCSS.input_cont}>

                    <label htmlFor="password">
                        <span> Password : </span>
                    </label>

                    <input
                        id='password'
                        type={passwordShowRegister1 ? "text" : "password"} placeholder="Enter your password"
                    />

                    <div id='showPasswordRegister1' className={formCSS.eye_cont}>

                        <div className={formCSS.eyes}>

                            {passwordShowRegister1 && 
                                <AnimatePresence>
                                    <motion.img 
                                        variants={viewEye} initial='hidden' animate='visible' 
                                        exit='hidden' className={formCSS.icon_cont} 
                                        src={eyeSlash} alt="eyeSlash" 
                                    />
                                </AnimatePresence>
                            }

                            {!passwordShowRegister1 &&
                                <AnimatePresence>
                                    <motion.img 
                                        variants={viewEye} initial='hidden' animate='visible' 
                                        exit='hidden' className={formCSS.icon_cont} 
                                        src={eye} alt="eye" 
                                    />
                                </AnimatePresence>
                            }

                        </div>

                    </div>

                </div>

                <div className={formCSS.btn_cont}>

                    <motion.button whileTap={{scale : 0.95}} className={formCSS.submit} type='submit'>
                        Log In
                    </motion.button>

                </div>

            </form>

        </div>

    </React.Fragment>

}
