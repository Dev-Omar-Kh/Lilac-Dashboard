import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ThreeCircles } from 'react-loader-spinner';
import { useFormik } from 'formik';
import axios from 'axios';
import Status from '../../Components/Status/Status';

import formCSS from '../../Style/form.module.css';
import localCSS from '../../Style/Local-style.module.css';
import { useQuery } from 'react-query';


export default function Contact() {

    // ====== get-content-data ====== //

    const [cID, setCID] = useState(null);

    const getContact = async() => {

        return await axios.get('https://lilac-backend.vercel.app/contactUs');

    };

    const {data , isLoading} = useQuery('getContact' , getContact);

    useEffect(() => {

        if(!isLoading){

            setCID(data?.data.data[0]._id);

        }

    } , [isLoading , data])

    // ====== add-services ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [successMsg, setSuccessMsg] = useState(null);
    const [addLoading, setAddLoading] = useState(false);

    const values = {

        email : !isLoading ? data?.data.data[0].email : '',
        address : !isLoading ? data?.data.data[0].address : '',
        phone : !isLoading ? data?.data.data[0].phone : '',

        facebook : !isLoading ? data?.data.data[0].socialLinks.facebook : '',
        instagram : !isLoading ? data?.data.data[0].socialLinks.instagram : '',
        twitter : !isLoading ? data?.data.data[0].socialLinks.twitter : '',
        linkedIn : !isLoading ? data?.data.data[0].socialLinks.linkedIn : '',
        youtube : !isLoading ? data?.data.data[0].socialLinks.youtube : '',

    };

    const updateContact = async(values) => {

        setAddLoading(true);
        setSuccessMsg(null);
        setErrMsg(null);

        const newValues = {

            email: values.email,
            phone: values.phone,
            address: values.address,
            socialLinks: {
                facebook: values.facebook,
                instagram: values.instagram,
                twitter: values.twitter,
                linkedIn: values.linkedIn,
                youtube: values.youtube
            }

        }

        try {

            const {data} = await axios.put(`https://lilac-backend.vercel.app/contactUs/${cID}` ,  newValues , {
            });

            if(data.success){
                setSuccessMsg('Service added successfully');
            }
            else{
                setErrMsg('Added failed, Please try again');
            }

        } catch (error) {
            setErrMsg(`Added error, ${error.response.data.msgError}`);
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

            if(!values.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
                error.email = 'Email is invalid';
            }

            if(!values.phone.match(/^\+?[0-9]{7,15}$/)){
                error.phone = 'Phone is invalid';
            }

            if(values.address.length < 5){
                error.address = 'Address is too short';
            }

            if(!values.facebook.match(/^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9._%-]+\/?$/)){
                error.facebook = 'Facebook link is invalid';
            }

            if(!values.instagram.match(/^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._%-]+\/?$/)){
                error.instagram = 'Instagram link is invalid';
            }

            if(!values.twitter.match(/^(https?:\/\/)?(www\.)?x\.com\/[A-Za-z0-9._%-]+\/?$/)){
                error.twitter = 'Twitter link is invalid';
            }

            if(!values.linkedIn.match(/^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9._%-]+\/?$/)){
                error.linkedIn = 'LinkedIn link is invalid';
            }

            if(!values.youtube.match(/^(https?:\/\/)?(www\.)?youtube\.com\/(c|channel|user|@)[A-Za-z0-9._%-]+\/?$/)){
                error.youtube = 'Youtube link is invalid';
            }

            return error;

        }

    });

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <div className={localCSS.container}>

            <div className={localCSS.title}>
                <i className="fa-solid fa-align-left"></i>
                Content 
            </div>

            <form 
                onSubmit={formikObj.handleSubmit}
                className={formCSS.form} style={addLoading ? {opacity : '0.6'} : {}}
            >

                <div className={formCSS.input_cont + ' ' + formCSS.half_input_cont}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="email">
                        <span>Email : </span>
                        {formikObj.errors.email && formikObj.touched.email && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.email}</span>
                        }
                    </label>

                    <input
                        id='email'
                        type="text" placeholder={isLoading ? "Loading..." : "Enter email"}
                        onChange={formikObj.handleChange}
                        onBlur={formikObj.handleBlur}
                        value={formikObj.values.email || ''}
                    />

                </div>

                <div className={formCSS.input_cont + ' ' + formCSS.half_input_cont}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="phone">
                        <span>Phone : </span>
                        {formikObj.errors.phone && formikObj.touched.phone && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.phone}</span>
                        }
                    </label>

                    <input
                        id='phone'
                        type="text" placeholder={isLoading ? "Loading..." : "Enter phone"}
                        onChange={formikObj.handleChange}
                        onBlur={formikObj.handleBlur}
                        value={formikObj.values.phone || ''}
                    />

                </div>

                <div className={formCSS.input_cont + ' ' + formCSS.half_input_cont}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="address">
                        <span>Address : </span>
                        {formikObj.errors.address && formikObj.touched.address && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.address}</span>
                        }
                    </label>

                    <input
                        id='address'
                        type="text" placeholder={isLoading ? "Loading..." : "Enter address"}
                        onChange={formikObj.handleChange}
                        onBlur={formikObj.handleBlur}
                        value={formikObj.values.address || ''}
                    />

                </div>

                <div className={formCSS.input_cont + ' ' + formCSS.half_input_cont}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="facebook">
                        <span>Facebook <i className="fa-solid fa-link"></i> </span>
                        {formikObj.errors.facebook && formikObj.touched.facebook && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.facebook}</span>
                        }
                    </label>

                    <input
                        id='facebook'
                        type="text" placeholder={isLoading ? "Loading..." : "Enter facebook link"}
                        onChange={formikObj.handleChange}
                        onBlur={formikObj.handleBlur}
                        value={formikObj.values.facebook || ''}
                    />

                </div>

                <div className={formCSS.input_cont + ' ' + formCSS.half_input_cont}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="instagram">
                        <span>Instagram <i className="fa-solid fa-link"></i> </span>
                        {formikObj.errors.instagram && formikObj.touched.instagram && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.instagram}</span>
                        }
                    </label>

                    <input
                        id='instagram'
                        type="text" placeholder={isLoading ? "Loading..." : "Enter instagram link"}
                        onChange={formikObj.handleChange}
                        onBlur={formikObj.handleBlur}
                        value={formikObj.values.instagram || ''}
                    />

                </div>

                <div className={formCSS.input_cont + ' ' + formCSS.half_input_cont}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="twitter">
                        <span>Twitter (X) <i className="fa-solid fa-link"></i> </span>
                        {formikObj.errors.twitter && formikObj.touched.twitter && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.twitter}</span>
                        }
                    </label>

                    <input
                        id='twitter'
                        type="text" placeholder={isLoading ? "Loading..." : "Enter twitter link"}
                        onChange={formikObj.handleChange}
                        onBlur={formikObj.handleBlur}
                        value={formikObj.values.twitter || ''}
                    />

                </div>

                <div className={formCSS.input_cont + ' ' + formCSS.half_input_cont}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="linkedIn">
                        <span>LinkedIn <i className="fa-solid fa-link"></i> </span>
                        {formikObj.errors.linkedIn && formikObj.touched.linkedIn && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.linkedIn}</span>
                        }
                    </label>

                    <input
                        id='linkedIn'
                        type="text" placeholder={isLoading ? "Loading..." : "Enter linkedIn link"}
                        onChange={formikObj.handleChange}
                        onBlur={formikObj.handleBlur}
                        value={formikObj.values.linkedIn || ''}
                    />

                </div>

                <div className={formCSS.input_cont + ' ' + formCSS.half_input_cont}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="youtube">
                        <span>Youtube <i className="fa-solid fa-link"></i> </span>
                        {formikObj.errors.youtube && formikObj.touched.youtube && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.youtube}</span>
                        }
                    </label>

                    <input
                        id='youtube'
                        type="text" placeholder={isLoading ? "Loading..." : "Enter youtube link"}
                        onChange={formikObj.handleChange}
                        onBlur={formikObj.handleBlur}
                        value={formikObj.values.youtube || ''}
                    />

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
