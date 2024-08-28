import React, { useEffect, useState } from 'react';
import { AnimatePresence , motion } from 'framer-motion';

import loginCSS from './auth.module.css';
import formCSS from '../../Style/form.module.css';

import eye from '../../Images/SVG/eye-icon-svg.svg';
import eyeSlash from '../../Images/SVG/eye-slash-icon-svg.svg';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';
import Status from '../../Components/Status/Status';

export default function Login() {

    // ====== sendData ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [addLoading, setAddLoading] = useState(false);
    const [visible, setVisible] = useState(true);

    const color = 'var(--dark-color-1)';

    const navigate = useNavigate();

    const values = {

        email : '',
        password : '',

    }

    const sendPassword = async(values) => {

        setAddLoading(true);
        setSuccessMsg(null);
        setErrMsg(null);

        try {

            const {data} = await axios.post('https://lilac-backend.vercel.app/auth/login' , values);

            if(data.success){

                sessionStorage.setItem('adminTkn', data.result);
                setSuccessMsg('Welcome to dashboard as admin');

                setTimeout(() => {

                    navigate('/dashboard/services');

                } , 3500)

            }
            else{
                setErrMsg('Wrong login, Try again');
            }

        } catch (error) {
            setErrMsg(`${error.response.data.msgError}, Try again`);
        }

        setAddLoading(false);

    };

    const formikObj = useFormik({

        initialValues : values,

        onSubmit : sendPassword,

        validate : (values) => {

            setErrMsg(null)

            const error = {}

            if(!values.email.includes('@') && !values.email.includes('.')){
                error.email = 'Email is invalid';
            }

            if(!values.email){
                error.email = 'Email is required';
            }

            if(values.password.length < 8){
                error.password = 'password must be more than 8 characters';
            }

            if(!values.password){
                error.password = 'password is required';
            }

            return error;

        }

    });

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

        {successMsg ? <Status color={color} icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status color={color} icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <div className={loginCSS.container}>

            <div className={loginCSS.title}>
                <img src={require('../../Images/logo.png')} alt="" />
            </div>

            <form 
                onSubmit={formikObj.handleSubmit}
                className={formCSS.form} style={addLoading ? {opacity : '0.6'} : {}}
            >

                <div className={formCSS.input_cont}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="email">
                        <span> Email : </span>
                        {formikObj.errors.email && formikObj.touched.email && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.email}</span>
                        }
                    </label>

                    <input
                        id='email'
                        type="text" placeholder="Enter your email"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.email}
                    />

                </div>

                <div className={formCSS.input_cont}>

                    <label htmlFor="password">
                        <span> Password : </span>
                        {formikObj.errors.password && formikObj.touched.password && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.password}</span>
                        }
                    </label>

                    <input
                        id='password'
                        type={passwordShowRegister1 ? "text" : "password"} placeholder="Enter your password"
                        onBlur={formikObj.handleBlur}
                        onChange={formikObj.handleChange}
                        value={formikObj.values.password}
                    />

                    <div id='showPasswordRegister1' className={formCSS.eye_cont}>

                        <div className={formCSS.eyes}>

                            {passwordShowRegister1 && 
                                <AnimatePresence>
                                    <motion.img 
                                        variants={viewEye} initial='hidden' animate='visible' 
                                        exit='hidden' className={formCSS.icon_cont} 
                                        src={eye} alt="eyeSlash" 
                                    />
                                </AnimatePresence>
                            }

                            {!passwordShowRegister1 &&
                                <AnimatePresence>
                                    <motion.img 
                                        variants={viewEye} initial='hidden' animate='visible' 
                                        exit='hidden' className={formCSS.icon_cont} 
                                        src={eyeSlash} alt="eye" 
                                    />
                                </AnimatePresence>
                            }

                        </div>

                    </div>

                </div>

                <div className={formCSS.btn_cont}>

                    <motion.button whileTap={{scale : 0.95}} className={formCSS.submit} type='submit'>
                        {addLoading ? <ThreeCircles
                            visible={true} height="20" width="20" color="var(--white-color)"
                            ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                        /> :'LogIn'}
                    </motion.button>

                </div>

            </form>

        </div>

    </React.Fragment>

}
