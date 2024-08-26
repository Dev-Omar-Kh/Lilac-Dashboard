import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThreeCircles } from 'react-loader-spinner';
import { useFormik } from 'formik';
import axios from 'axios';
import Status from '../../Components/Status/Status';

import formCSS from '../../Style/form.module.css';
import localCSS from '../../Style/Local-style.module.css';
import { useQuery } from 'react-query';

export default function About() {

    // ====== get-about-data ====== //

    const getAbout = async() => {

        return await axios.get('https://lilac-backend.vercel.app/aboutUs');

    };

    const {data , isLoading} = useQuery('getAbout' , getAbout);

    const cID = data?.data.data[0]._id

    // ====== add-services ====== //

    const [imgError, setImgError] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [successMsg, setSuccessMsg] = useState(null);
    const [addLoading, setAddLoading] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);

    const values = {

        description : data?.data.data[0].description,
        aboutUsImage : data?.data.data[0].image.url || [],

    };

    const updateAbout = async(values) => {

        setAddLoading(true);
        setSuccessMsg(null);
        setErrMsg(null);

        const formData = new FormData();
        
        formData.append('description', values.description);
        formData.append('aboutUsImage', values.aboutUsImage);

        try {

            const {data} = await axios.put(`https://lilac-backend.vercel.app/aboutUs/${cID}` , formData  , {
                headers: {'Content-Type': 'multipart/form-data'}
            });

            if(data.success){
                setSuccessMsg('About added successfully');
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

        onSubmit : updateAbout,

        enableReinitialize: true,

        validate : (values) => {

            const error = {};

            setErrMsg(null);

            if(!values.aboutUsImage){
                setImgError('About image is empty !');
            }

            if(values.description.length < 3){
                error.description = 'Description is too short';
            }
            if(!values.description){
                error.description = 'Description is required';
            }
            if(values.description.length > 1000){
                error.description = 'Description is too long';
            }

            return error;

        }

    });

    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if(file){

            formikObj.setFieldValue('aboutUsImage', file);
            setImgError(null);
            const media = URL.createObjectURL(file);
            setPreviewImages(media);
        }

    };

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <div className={localCSS.container}>

            <div className={localCSS.title}>
                <i className="fa-solid fa-align-left"></i>
                About Us 
            </div>

            <form 
                onSubmit={formikObj.handleSubmit}
                className={formCSS.form} style={addLoading ? {opacity : '0.6'} : {}}
            >

                {previewImages.length === 0 && <div className={formCSS.display_images}>

                    <img 
                        src={data?.data.data[0].image.url} alt={data?.data.data[0].image.url} 
                        className={formCSS.preview_image} 
                    />

                </div>}

                {previewImages.length > 0 && <div className={formCSS.display_images}>

                    <img 
                        src={previewImages} alt={previewImages} 
                        className={formCSS.preview_image} 
                    />

                </div>}

                <label htmlFor="aboutUsImage" className={formCSS.input_images}>

                    {imgError ? <span className={formCSS.err_msg_label}>* {imgError} </span> : ''}

                    <input 
                        id='aboutUsImage' type="file"
                        onChange={handleFileChange}
                    />

                    <div className={formCSS.fake_input}>
                        <i className="fa-regular fa-images"></i>
                        <p>Add new main</p>
                    </div>

                </label>

                <div className={formCSS.input_cont}>

                    <div className={formCSS.loader}></div>

                    <label htmlFor="description">
                        <span>About description : </span>
                        {formikObj.errors.description && formikObj.touched.description && 
                            <span className={formCSS.err_msg_label}>* {formikObj.errors.description}</span>
                        }
                    </label>

                    <input
                        id='description'
                        type="text" placeholder={isLoading ? "Loading..." : "Enter about description"}
                        onChange={formikObj.handleChange}
                        onBlur={formikObj.handleBlur}
                        value={formikObj.values.description || ''}
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
