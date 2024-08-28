import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThreeCircles } from 'react-loader-spinner';
import { useFormik } from 'formik';
import axios from 'axios';
import Status from '../../Components/Status/Status';

import formCSS from '../../Style/form.module.css';
import localCSS from '../../Style/Local-style.module.css';

import eye from '../../Images/SVG/eye-icon-svg.svg';
import eyeSlash from '../../Images/SVG/eye-slash-icon-svg.svg';
import { useNavigate } from 'react-router-dom';

export default function ResetPass() {

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [successMsg, setSuccessMsg] = useState(null);
    const [addLoading, setAddLoading] = useState(false);

    const navigate = useNavigate();

    const values = {

        oldPass : '',
        password : '',
        confirmPassword : '',

    };

    const updateContact = async(values) => {

        setAddLoading(true);
        setSuccessMsg(null);
        setErrMsg(null);

        try {

            const {data} = await axios.patch(`https://lilac-backend.vercel.app/auth/resetPassword` ,  values , {
                headers : {token : sessionStorage.getItem('adminTkn')}
            });

            if(data.success){
                setSuccessMsg('Password reseted successfully');

                setTimeout(() => {
                    navigate('/');
                }, 3500);
            }

        } catch (error) {
            setErrMsg(`reseted error, ${error.response.data.msgError}`);
        }

        setAddLoading(false);

    }

    const formikObj = useFormik({

        initialValues : values,

        onSubmit : updateContact,

        enableReinitialize: true,

        validate : (values) => {

            const error = {};

            setErrMsg(null);

            if(values.oldPass.length < 8){
                error.oldPass = 'The old password must be more than 8 characters'
            }

            if(!values.oldPass.length){
                error.oldPass = 'The old password is required'
            }

            if(values.password.length < 8){
                error.password = 'The new password must be more than 8 characters'
            }

            if(!values.password.length){
                error.password = 'The new password is required'
            }

            if(values.password === values.oldPass){
                error.password = 'This password is already used'
            }

            if(values.password !== values.confirmPassword){
                error.confirmPassword = 'The new password must been matched'
            }

            return error;

        }

    });

    // ====== display-password ====== //

    const [passwordShowRegister1, setPasswordShowRegister1] = useState(false);
    const [passwordShowRegister2, setPasswordShowRegister2] = useState(false);
    const [passwordShowRegister3, setPasswordShowRegister3] = useState(false);

    useEffect(() => {

        const passwordShowRegister1 = document.getElementById('showPasswordRegister1');
        const passwordShowRegister2 = document.getElementById('showPasswordRegister2');
        const passwordShowRegister3 = document.getElementById('showPasswordRegister3');

        passwordShowRegister1.onclick = () => {

            setPasswordShowRegister1(prevState => !prevState);

        }

        passwordShowRegister2.onclick = () => {

            setPasswordShowRegister2(prevState => !prevState);

        }

        passwordShowRegister3.onclick = () => {

            setPasswordShowRegister3(prevState => !prevState);

        }

    } , [passwordShowRegister1 , passwordShowRegister2 , passwordShowRegister3]);

    const viewEye = {

        hidden : {opacity : 0 , transition : {duration : 0.5}},
        visible : {opacity : 1 , transition : {duration : 0.5}},

    }

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <div className={localCSS.container}>

            <div className={localCSS.title}>
                <i className="fa-solid fa-key"></i>
                Reset password 
            </div>

            <form 
                onSubmit={formikObj.handleSubmit}
                className={formCSS.form} style={addLoading ? {opacity : '0.6'} : {}}
            >

                <div className={formCSS.input_cont}>

                    <label htmlFor="oldPass">
                        <span>Current Password : </span>
                        {formikObj.errors.oldPass && formikObj.touched.oldPass && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.oldPass}</span>
                        }
                    </label>

                    <input
                        id='oldPass'
                        type={passwordShowRegister3 ? "text" : "password"} placeholder="Enter current password"
                        onChange={formikObj.handleChange}
                        onBlur={formikObj.handleBlur}
                        value={formikObj.values.oldPass}
                    />

                    <div id='showPasswordRegister3' className={formCSS.eye_cont}>

                        <div className={formCSS.eyes}>

                            {passwordShowRegister3 && 
                                <AnimatePresence>
                                    <motion.img 
                                        variants={viewEye} initial='hidden' animate='visible' 
                                        exit='hidden' className={formCSS.icon_cont} 
                                        src={eye} alt="eyeSlash" 
                                    />
                                </AnimatePresence>
                            }

                            {!passwordShowRegister3 &&
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

                <div className={formCSS.input_cont}>

                    <label htmlFor="password">
                        <span>Password : </span>
                        {formikObj.errors.password && formikObj.touched.password && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.password}</span>
                        }
                    </label>

                    <input
                        id='password'
                        type={passwordShowRegister1 ? "text" : "password"} placeholder="Enter new password"
                        onChange={formikObj.handleChange}
                        onBlur={formikObj.handleBlur}
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

                <div className={formCSS.input_cont}>

                    <label htmlFor="confirmPassword">
                        <span>Confirm password : </span>
                        {formikObj.errors.confirmPassword && formikObj.touched.confirmPassword && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.confirmPassword}</span>
                        }
                    </label>

                    <input
                        id='confirmPassword'
                        type={passwordShowRegister2 ? "text" : "password"} placeholder="Confirm new Password"
                        onChange={formikObj.handleChange}
                        onBlur={formikObj.handleBlur}
                        value={formikObj.values.confirmPassword}
                    />

                    <div id='showPasswordRegister2' className={formCSS.eye_cont}>

                        <div className={formCSS.eyes}>

                            {passwordShowRegister2 && 
                                <AnimatePresence>
                                    <motion.img 
                                        variants={viewEye} initial='hidden' animate='visible' 
                                        exit='hidden' className={formCSS.icon_cont} 
                                        src={eye} alt="eyeSlash" 
                                    />
                                </AnimatePresence>
                            }

                            {!passwordShowRegister2 &&
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
                        /> :'Update content'}
                    </motion.button>

                </div>

            </form>

        </div>

    </React.Fragment>

}
