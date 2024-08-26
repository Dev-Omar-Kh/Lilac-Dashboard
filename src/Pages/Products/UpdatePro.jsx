import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import axios from 'axios';
import Status from '../../Components/Status/Status';
import { ThreeCircles } from 'react-loader-spinner';

import formCSS from '../../Style/form.module.css';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdatePro() {

    // ====== get-product-by-id ====== //

    const {id} = useParams();

    const getSingleProduct = async() => {

        return await axios.get(`https://lilac-backend.vercel.app/product?_id=${id}`)

    }

    const {data , isLoading} = useQuery('getProductById' , getSingleProduct);

    // ====== update-product ====== //

    const [imgError, setImgError] = useState(null)
    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [successMsg, setSuccessMsg] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);

    const navigate = useNavigate();

    const values = {

        name : data?.data.result[0].name,
        description : data?.data.result[0].description,
        price : data?.data.result[0].price,
        discount : data?.data.result[0].discount,
        subImages : data?.data.result[0].image,

    };

    const addProduct = async(values) => {

        setUpdateLoading(true);
        setSuccessMsg(null);
        setErrMsg(null);

        const formData = new FormData();
        
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('discount', values.discount);
        
        Array.from(values.subImages).forEach((file) => {
            formData.append('subImages', file);
        });

        try {

            const {data} = await axios.put(`https://lilac-backend.vercel.app/product/update/${id}` , formData  , {
                headers: {'Content-Type': 'multipart/form-data'}
            });

            if(data.success){
                setSuccessMsg('Product added successfully');

                setTimeout(() => {

                    navigate('/dashboard/products');

                } , 3500);
            }
            else{
                setErrMsg('Added failed, Please try again');
            }

        } catch (error) {
            setErrMsg('Added error, Please try again');
        }

        setUpdateLoading(false);

    }

    const formikObj = useFormik({

        initialValues : values,

        onSubmit : addProduct,

        enableReinitialize: true,

        validate : (values) => {

            const error = {};

            setErrMsg(null);

            if(values.subImages.length === 0){
                setImgError('Product images is empty !')
            }

            if(values.name.length < 3){
                error.name = 'Product name is too short';
            }
            if(!values.name){
                error.name = 'Product name is required';
            }
            if(values.name.length > 50){
                error.name = 'Product name is too long';
            }

            if(values.description.length < 10){
                error.description = 'Product description is too short';
            }
            if(!values.description){
                error.description = 'Product description is required';
            }
            if(values.description.length > 1000){
                error.description = 'Product description is too long';
            }

            if (!values.price) {
                error.price = 'Product price required';
            } 
            else if (!/^\d+(\.\d{1,2})?$/.test(values.price)) {
                error.price = 'Price must be a number';
            }

            if (!values.discount) {
                error.discount = 'Product discount required';
            } 
            else if (!/^\d+(\.\d{1,2})?$/.test(values.discount)) {
                error.discount = 'Discount must be a number';
            }

            return error;

        }

    });

    const handleFileChange = (e) => {
        const files = Array.from(e.currentTarget.files);
        setErrMsg(null);

        if (files.length > 4) {
            setImgError('You can only upload a maximum of 4 images');
            return;
        }

        setImgError(null);
        formikObj.setFieldValue('subImages', files);

        const imagePreviews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages(imagePreviews);
    };

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <form
            onSubmit={formikObj.handleSubmit}
            style={updateLoading ? {opacity : '0.6'} : {}} className={formCSS.form}
        >

            {previewImages.length > 0 ? <div className={formCSS.display_images}>

                {previewImages.map((src, index) => <img 
                    key={index} src={src} alt={`Preview ${index}`} 
                    className={formCSS.preview_image} 
                />)}

            </div> : <div className={formCSS.display_images}>

                {data?.data.result[0].image.map((src, index) => <img 
                    key={index} src={src.url} alt={`Preview ${index}`} 
                    className={formCSS.preview_image} 
                />)}

            </div>}

            <label htmlFor="subImages" className={formCSS.input_images}>

                {imgError ? <span className={formCSS.err_msg_label}>* {imgError} </span> : ''}

                <input 
                    id='subImages' type="file" multiple
                    onChange={handleFileChange}
                />

                <div className={formCSS.fake_input}>
                    <i className="fa-regular fa-images"></i>
                    <p>Change images</p>
                </div>

            </label>

            <div className={formCSS.input_cont}>

                <div className={formCSS.loader}></div>

                <label htmlFor="name">
                    <span>Product name : </span>
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
                    <span>Product description : </span>
                    {formikObj.errors.description && formikObj.touched.description && 
                        <span className={formCSS.err_msg_label}>* {formikObj.errors.description}</span>
                    }
                </label>

                <input
                    id='description'
                    type="text" placeholder={isLoading ? "Loading..." : "Enter product description"}
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.description || ''}
                />

            </div>

            <div className={formCSS.input_cont + ' ' + formCSS.half_input_cont}>

                <div className={formCSS.loader}></div>

                <label htmlFor="price">
                    <span>Product price : </span>
                    {formikObj.errors.price && formikObj.touched.price && 
                        <span className={formCSS.err_msg_label}>* {formikObj.errors.price}</span>
                    }
                </label>

                <input
                    id='price'
                    type="text" placeholder={isLoading ? "Loading..." : "Enter product price"}
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.price || ''}
                />

            </div>

            <div className={formCSS.input_cont + ' ' + formCSS.half_input_cont}>

                <div className={formCSS.loader}></div>

                <label htmlFor="discount">
                    <span>Product discount : </span>
                    {formikObj.errors.discount && formikObj.touched.price && 
                        <span className={formCSS.err_msg_label}>* {formikObj.errors.price}</span>
                    }
                </label>

                <input
                    id='discount'
                    type="text" placeholder={isLoading ? "Loading..." : "Enter product discount"}
                    onChange={formikObj.handleChange}
                    onBlur={formikObj.handleBlur}
                    value={formikObj.values.discount || ''}
                />

            </div>

            <div className={formCSS.btn_cont}>

                <motion.button whileTap={{scale : 0.95}} className={formCSS.submit} type='submit'>
                    {updateLoading ? <ThreeCircles
                        visible={true} height="20" width="20" color="var(--white-color)"
                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                    /> :'Update product'}
                </motion.button>

            </div>

        </form>

    </React.Fragment>

}