import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import axios from 'axios';
import Status from '../../Components/Status/Status';
import { ThreeCircles } from 'react-loader-spinner';

import formCSS from '../../Style/form.module.css';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function UpdatePro() {

    // ====== get-product-by-id ====== //

    const {id} = useParams();

    const getSingleProduct = async() => {

        return await axios.get(`https://lilac-backend.vercel.app/product?_id=${id}`)

    }

    const {data , isLoading} = useQuery('getProductById' , getSingleProduct);

    // ====== update-product ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [successMsg, setSuccessMsg] = useState(null);
    const [updateLoading, setUpdateLoading] = useState(false);

    const values = {

        name : data?.data.result[0].name,
        description : data?.data.result[0].description,
        price : data?.data.result[0].price,
        discount : data?.data.result[0].discount,
        subImages : data?.data.result[0].image,

    };

    console.log(data?.data.result[0].image);
    

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
                console.log(...formData);
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

    });

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <form
            onSubmit={formikObj.handleSubmit}
            style={updateLoading ? {opacity : '0.6'} : {}} className={formCSS.form}
        >

            <label htmlFor="subImages" className={formCSS.input_images}>

                <input 
                    id='subImages' type="file" multiple
                    onChange={(e) => {
                        formikObj.setFieldValue('subImages', e.currentTarget.files);
                    }}
                />

                <div className={formCSS.fake_input}>
                    <i className="fa-regular fa-images"></i>
                    <p>Add images</p>
                </div>

            </label>

            <div className={formCSS.input_cont}>

                <div className={formCSS.loader}></div>

                <label htmlFor="name">
                    <span>Product name : </span>
                </label>

                <input
                    id='name'
                    type="text" placeholder={isLoading ? "Loading..." : "Enter product name"}
                    onChange={formikObj.handleChange}
                    value={formikObj.values.name || ''}
                />

            </div>

            <div className={formCSS.input_cont}>

                <div className={formCSS.loader}></div>

                <label htmlFor="description">
                    <span>Product description : </span>
                </label>

                <input
                    id='description'
                    type="text" placeholder={isLoading ? "Loading..." : "Enter product description"}
                    onChange={formikObj.handleChange}
                    value={formikObj.values.description || ''}
                />

            </div>

            <div className={formCSS.input_cont + ' ' + formCSS.half_input_cont}>

                <div className={formCSS.loader}></div>

                <label htmlFor="price">
                    <span>Product price : </span>
                </label>

                <input
                    id='price'
                    type="text" placeholder={isLoading ? "Loading..." : "Enter product price"}
                    onChange={formikObj.handleChange}
                    value={formikObj.values.price || ''}
                />

            </div>

            <div className={formCSS.input_cont + ' ' + formCSS.half_input_cont}>

                <div className={formCSS.loader}></div>

                <label htmlFor="discount">
                    <span>Product discount : </span>
                </label>

                <input
                    id='discount'
                    type="text" placeholder={isLoading ? "Loading..." : "Enter product discount"}
                    onChange={formikObj.handleChange}
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