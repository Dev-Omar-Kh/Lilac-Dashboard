import React, { useState } from 'react';

import formCSS from '../../Style/form.module.css';
import { motion } from 'framer-motion';
import { ThreeCircles } from 'react-loader-spinner';
import { useFormik } from 'formik';
import axios from 'axios';
import Status from '../../Components/Status/Status';
import { useNavigate } from 'react-router-dom';

export default function AddService() {

    // ====== add-services ====== //

    const [imgError, setImgError] = useState(null)
    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [successMsg, setSuccessMsg] = useState(null);
    const [addLoading, setAddLoading] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);
    const [mediaType, setMediaType] = useState(null);

    const navigate = useNavigate();

    const values = {

        name : '',
        description : '',
        media : '',

    };

    const addService = async(values) => {

        setAddLoading(true);
        setSuccessMsg(null);
        setErrMsg(null);

        const formData = new FormData();
        
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('media', values.media);

        try {

            const {data} = await axios.post('https://lilac-backend.vercel.app/services/add' , formData  , {
                headers: {'Content-Type': 'multipart/form-data'}
            });

            if(data.success){
                setSuccessMsg('Service added successfully');

                setTimeout(() => {

                    navigate('/dashboard/services');

                } , 3500);
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

        onSubmit : addService,

        validate : (values) => {

            setErrMsg(null);
            setImgError(null);

            const error = {};

            if(!values.media){
                setImgError('Service images is empty !')
            }

            if(values.name.length < 3){
                error.name = 'Service name is too short';
            }
            if(!values.name){
                error.name = 'Service name is required';
            }
            if(values.name.length > 50){
                error.name = 'Service name is too long';
            }

            if(values.description.length < 10){
                error.description = 'Service description is too short';
            }
            if(!values.description){
                error.description = 'Service description is required';
            }
            if(values.description.length > 1000){
                error.description = 'Service description is too long';
            }

            return error;

        }

    });

    const handleFileChange = (e) => {

        const file = e.target.files[0];
        setErrMsg(null);

        if(file){

            formikObj.setFieldValue('media', file);

            const fileType = file.type.split('/')[0];
            setMediaType(fileType);

            const media = URL.createObjectURL(file);
            setPreviewImages(media);
        }

    };

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <form 
            style={addLoading ? {opacity : '0.6'} : {}}
            onSubmit={formikObj.handleSubmit}
            className={formCSS.form}
        >

            {previewImages.length > 0 && <div className={formCSS.display_images}>

                {mediaType === 'image' ?<img 
                    src={previewImages} alt={previewImages} 
                    className={formCSS.preview_image} 
                /> : <div className={formCSS.preview_image}>

                    <video src={previewImages}/>
                    <span id='startVideo'>
                        <i className="fa-regular fa-circle-play"></i>
                    </span>

                </div>}

            </div>}

            <label htmlFor="media" className={formCSS.input_images}>

                {imgError ? <span className={formCSS.err_msg_label}>* {imgError} </span> : ''}

                <input 
                    id='media' type="file"
                    onChange={handleFileChange}
                />

                <div className={formCSS.fake_input}>
                    <i className="fa-regular fa-images"></i>
                    <p>Add media</p>
                </div>

            </label>

            <div className={formCSS.input_cont}>

                <div className={formCSS.loader}></div>

                <label htmlFor="name">
                    <span>Service name : </span>
                    {formikObj.errors.name && formikObj.touched.name && 
                        <span className={formCSS.err_msg_label}>* {formikObj.errors.name}</span>
                    }
                </label>

                <input
                    id='name'
                    type="text" placeholder="Enter service name"
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.name}
                />

            </div>

            <div className={formCSS.input_cont}>

                <div className={formCSS.loader}></div>

                <label htmlFor="description">
                    <span>Service description : </span>
                    {formikObj.errors.description && formikObj.touched.description && 
                        <span className={formCSS.err_msg_label}>* {formikObj.errors.description}</span>
                    }
                </label>

                <input
                    id='description'
                    type="text" placeholder="Enter service description"
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.description}
                />

            </div>

            <div className={formCSS.btn_cont}>

                <motion.button whileTap={{scale : 0.95}} className={formCSS.submit} type='submit'>
                    {addLoading ? <ThreeCircles
                        visible={true} height="20" width="20" color="var(--white-color)"
                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                    /> :'Add service'}
                </motion.button>

            </div>

        </form>

    </React.Fragment>

}
