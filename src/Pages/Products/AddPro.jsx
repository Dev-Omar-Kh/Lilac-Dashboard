import React, { useState } from 'react'
import { motion } from 'framer-motion';

import formCSS from '../../Style/form.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import Status from '../../Components/Status/Status';
import { ThreeCircles } from 'react-loader-spinner';

export default function AddPro() {

    // ====== add-product ====== //

    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [successMsg, setSuccessMsg] = useState(null);
    const [addLoading, setAddLoading] = useState(false);

    const values = {

        name : '',
        description : '',
        price : '',
        discount : '',
        subImages : [],

    };

    const addProduct = async(values) => {

        setAddLoading(true);
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

            const {data} = await axios.post('https://lilac-backend.vercel.app/product/createProduct' , formData  , {
                headers: {'Content-Type': 'multipart/form-data'}
            });

            if(data.success){
                setSuccessMsg('Product added successfully');
            }
            else{
                setErrMsg('Added failed, Please try again');
            }

        } catch (error) {
            setErrMsg('Added error, Please try again');
        }

        setAddLoading(false);

    }

    const formikObj = useFormik({

        initialValues : values,

        onSubmit : addProduct,

    });

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}

        <form
            onSubmit={formikObj.handleSubmit}
            style={addLoading ? {opacity : '0.6'} : {}} className={formCSS.form}
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
                    type="text" placeholder="Enter product name"
                    onChange={formikObj.handleChange}
                    value={formikObj.values.name}
                />

            </div>

            <div className={formCSS.input_cont}>

                <div className={formCSS.loader}></div>

                <label htmlFor="description">
                    <span>Product description : </span>
                </label>

                <input
                    id='description'
                    type="text" placeholder="Enter product description"
                    onChange={formikObj.handleChange}
                    value={formikObj.values.description}
                />

            </div>

            <div className={formCSS.input_cont + ' ' + formCSS.half_input_cont}>

                <div className={formCSS.loader}></div>

                <label htmlFor="price">
                    <span>Product price : </span>
                </label>

                <input
                    id='price'
                    type="text" placeholder="Enter product price"
                    onChange={formikObj.handleChange}
                    value={formikObj.values.price}
                />

            </div>

            <div className={formCSS.input_cont + ' ' + formCSS.half_input_cont}>

                <div className={formCSS.loader}></div>

                <label htmlFor="discount">
                    <span>Product discount : </span>
                </label>

                <input
                    id='discount'
                    type="text" placeholder="Enter product discount"
                    onChange={formikObj.handleChange}
                    value={formikObj.values.discount}
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
