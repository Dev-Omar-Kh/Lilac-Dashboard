import React, { useState } from 'react';

import formCSS from '../../Style/form.module.css';
import { motion } from 'framer-motion';
import { ThreeCircles } from 'react-loader-spinner';
import { useFormik } from 'formik';
import axios from 'axios';
import Status from '../../Components/Status/Status';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

export default function UpdateService() {

    // ====== get-product-by-id ====== //

    const {id} = useParams();

    const getSingleService = async() => {

        return await axios.get(`https://lilac-backend.vercel.app/services/getAll?_id=${id}`);

    }

    const {data , isLoading} = useQuery('getServiceById' , getSingleService);

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

        name : data?.data.results[0]?.name,
        description : data?.data.results[0]?.description,
        media : data?.data.results[0]?.img || data?.data.results[0]?.video,

    };

    const addProduct = async(values) => {

        setAddLoading(true);
        setSuccessMsg(null);
        setErrMsg(null);

        const formData = new FormData();
        
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('media', values.media);

        try {

            const {data} = await axios.put(`https://lilac-backend.vercel.app/services/update/${id}` , formData  , {
                headers: {'Content-Type': 'multipart/form-data'}
            });

            if(data.success){
                setSuccessMsg('Service added successfully');

                setTimeout(() => {

                    navigate('/services');

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

        onSubmit : addProduct,

        enableReinitialize: true,

        validate : (values) => {

            const error = {};

            setErrMsg(null);

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
            onSubmit={formikObj.handleSubmit}
            className={formCSS.form} style={addLoading ? {opacity : '0.6'} : {}}
        >

            {previewImages.length === 0 && <div className={formCSS.display_images}>

                {data?.data.results[0]?.img ?<img 
                    src={data?.data.results[0]?.img.url} alt={data?.data.results[0]?.img.url} 
                    className={formCSS.preview_image} 
                /> : <div className={formCSS.preview_image}>

                    <video src={data?.data.results[0]?.video.url}/>
                    <span id='startVideo'>
                        <i className="fa-regular fa-circle-play"></i>
                    </span>

                </div>}

            </div>}

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

            <label htmlFor="subImages" className={formCSS.input_images}>

                {imgError ? <span className={formCSS.err_msg_label}>* {imgError} </span> : ''}

                <input 
                    id='subImages' type="file"
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
                    type="text" placeholder={isLoading ? "Loading..." : "Enter product name"}
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.name || ''}
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
                    type="text" placeholder={isLoading ? "Loading..." :"Enter product description"}
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
                    /> :'Add product'}
                </motion.button>

            </div>

        </form>

    </React.Fragment>

}
