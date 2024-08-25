import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThreeCircles } from 'react-loader-spinner';
import { useFormik } from 'formik';
import axios from 'axios';
import Status from '../../Components/Status/Status';

import formCSS from '../../Style/form.module.css';
import localCSS from '../../Style/Local-style.module.css';
import { useQuery } from 'react-query';

export default function Content() {

    // ====== get-content-data ====== //

    const getContent = async() => {

        return await axios.get('https://lilac-backend.vercel.app/content');

    };

    const {data , isLoading} = useQuery('getContent' , getContent);

    const cID = data?.data.data._id

    // ====== add-services ====== //

    const [imgError, setImgError] = useState(null);
    const [imgError2, setImgError2] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [successMsg, setSuccessMsg] = useState(null);
    const [addLoading, setAddLoading] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);
    const [previewImages2, setPreviewImages2] = useState([]);

    const values = {

        title : data?.data.data.title,
        landingPageText : data?.data.data.landingPageText,
        logo : data?.data.data.logo.url || [],
        landingPageImage : data?.data.data.landingPageImage.url || [],

    };

    const addProduct = async(values) => {

        setAddLoading(true);
        setSuccessMsg(null);
        setErrMsg(null);

        const formData = new FormData();
        
        formData.append('title', values.title);
        formData.append('landingPageText', values.landingPageText);
        formData.append('landingPageImage', values.landingPageImage);
        formData.append('logo', values.logo);

        try {

            const {data} = await axios.put(`https://lilac-backend.vercel.app/content/${cID}` , formData  , {
                headers: {'Content-Type': 'multipart/form-data'}
            });

            if(data.success){
                setSuccessMsg('Service added successfully');
            }
            else{
                setErrMsg('Added failed, Please try again');
            }

        } catch (error) {
            setErrMsg(`Added error, ${error.response.data.msgError}`);
            console.log(...formData);
        }

        setAddLoading(false);

    }

    const formikObj = useFormik({

        initialValues : values,

        onSubmit : addProduct,

        enableReinitialize: true,

        validate : (values) => {

            const error = {};

            setErrMsg(null);

            if(!values.landingPageImage){
                setImgError('Main image is empty !')
            }

            if(!values.logo){
                setImgError2('Logo image is empty !')
            }

            if(values.title.length < 3){
                error.title = 'Title is too short';
            }
            if(!values.title){
                error.title = 'Title is required';
            }
            if(values.title.length > 50){
                error.title = 'Title is too long';
            }

            if(values.landingPageText.length < 10){
                error.landingPageText = 'Main is too short';
            }
            if(!values.landingPageText){
                error.landingPageText = 'Main is required';
            }
            if(values.landingPageText.length > 1000){
                error.landingPageText = 'Main is too long';
            }

            return error;

        }

    });

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if(file){

            formikObj.setFieldValue('landingPageImage', file);
            setImgError(null);
            const media = URL.createObjectURL(file);
            setPreviewImages(media);
        }

    };

    const handleLogoChange = (e) => {

        const file = e.target.files[0];

        if(file){

            formikObj.setFieldValue('logo', file);
            setImgError2(null);
            const media = URL.createObjectURL(file);
            setPreviewImages2(media);
        }

    };

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

                {previewImages.length === 0 && <div className={formCSS.display_images}>

                    <img 
                        src={data?.data.data.landingPageImage.url} alt={data?.data.data.landingPageImage.url} 
                        className={formCSS.preview_image} 
                    />

                </div>}

                {previewImages.length > 0 && <div className={formCSS.display_images}>

                    <img 
                        src={previewImages} alt={previewImages} 
                        className={formCSS.preview_image} 
                    />

                </div>}

                <label htmlFor="landingPageImage" className={formCSS.input_images}>

                    {imgError ? <span className={formCSS.err_msg_label}>* {imgError} </span> : ''}

                    <input 
                        id='landingPageImage' type="file"
                        onChange={handleFileChange}
                    />

                    <div className={formCSS.fake_input}>
                        <i className="fa-regular fa-images"></i>
                        <p>Add new main</p>
                    </div>

                </label>

                {previewImages2.length === 0 && <div className={formCSS.display_images}>

                    <img 
                        src={data?.data.data.logo.url} alt={data?.data.data.logo.url} 
                        className={formCSS.preview_image} 
                    />

                </div>}

                {previewImages2.length > 0 && <div className={formCSS.display_images}>

                    <img 
                        src={previewImages2} alt={previewImages2} 
                        className={formCSS.preview_image} 
                    />

                </div>}

                <label htmlFor="logo" className={formCSS.input_images}>

                    {imgError2 ? <span className={formCSS.err_msg_label}>* {imgError2} </span> : ''}

                    <input 
                        id='logo' type="file"
                        onChange={handleLogoChange}
                    />

                    <div className={formCSS.fake_input}>
                        <i className="fa-regular fa-images"></i>
                        <p>Add new logo</p>
                    </div>

                </label>

                <div className={formCSS.input_cont}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="title">
                        <span>Content title : </span>
                        {formikObj.errors.title && formikObj.touched.title && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.title}</span>
                        }
                    </label>

                    <input
                        id='title'
                        type="text" placeholder={isLoading ? "Loading..." : "Enter content title"}
                        onChange={formikObj.handleChange}
                        onBlur={formikObj.handleBlur}
                        value={formikObj.values.title || ''}
                    />

                </div>

                <div className={formCSS.input_cont}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="landingPageText">
                        <span>Content Description : </span>
                        {formikObj.errors.landingPageText && formikObj.touched.landingPageText && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.landingPageText}</span>
                        }
                    </label>

                    <input
                        id='landingPageText'
                        type="text" placeholder={isLoading ? "Loading..." : "Enter content description"}
                        onChange={formikObj.handleChange}
                        onBlur={formikObj.handleBlur}
                        value={formikObj.values.landingPageText || ''}
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
