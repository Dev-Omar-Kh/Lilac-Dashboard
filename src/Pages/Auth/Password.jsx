import React, { useEffect, useState } from 'react';
import { AnimatePresence , motion } from 'framer-motion';

import passCSS from './auth.module.css';
import formCSS from '../../Style/form.module.css';

import eye from '../../Images/SVG/eye-icon-svg.svg';
import eyeSlash from '../../Images/SVG/eye-slash-icon-svg.svg';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Status from '../../Components/Status/Status';
import { ThreeCircles } from 'react-loader-spinner';

export default function Password() {

    // ====== post-password ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [addLoading, setAddLoading] = useState(false);
    const [visible, setVisible] = useState(true);

    const color = 'var(--dark-color-1)'

    const navigate = useNavigate();


    const values = {

        password : '',

    }

    const sendPassword = async(values) => {

        setAddLoading(true);
        setSuccessMsg(null);
        setErrMsg(null);

        try {

            const {data} = await axios.post('https://lilac-backend.vercel.app/auth/checkPass' , values);

            if(data.success){

                sessionStorage.setItem('passTkn', data.token);
                setSuccessMsg('Welcome to dashboard');

                setTimeout(() => {

                    navigate('/dashboard/services');

                } , 3500)

            }
            else{
                setErrMsg('Wrong password, Try again');
            }

        } catch (error) {
            setErrMsg('Wrong password, Try again');
        }

        setAddLoading(false);

    };

    const formikObj = useFormik({

        initialValues : values,

        onSubmit : sendPassword,

        validate : (values) => {

            const error = {}

            if(values.password.length < 8){
                error.password = 'The password must be more than 8 characters'
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

        <div className={passCSS.container}>

            <div className={passCSS.title}>
                <img src={require('../../Images/logo.png')} alt="" />
            </div>

            <form 
                onSubmit={formikObj.handleSubmit}
                className={formCSS.form} style={addLoading ? {opacity : '0.6'} : {}}
            >

                <div className={formCSS.input_cont}>

                    <label htmlFor="password">
                        <span> Password : </span>
                        {formikObj.errors.password && formikObj.touched.password && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.password}</span>
                        }
                    </label>

                    <input
                        id='password'
                        type={passwordShowRegister1 ? "text" : "password"} placeholder="Enter dashboard's password"
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
                        {addLoading ? <ThreeCircles
                            visible={true} height="20" width="20" color="var(--white-color)"
                            ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                        /> :'Confirm'}
                    </motion.button>

                </div>

            </form>

        </div>

    </React.Fragment>

}
