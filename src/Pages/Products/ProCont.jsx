import React from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';

import localCSS from '../../Style/Local-style.module.css';
import proCSS from '../../Style/cards.module.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProCont() {

    const {searchWord} = useSelector(store => store.products);

    const getProducts = async() => {

        return await axios.get('https://lilac-backend.vercel.app/product');

    }

    const {data , isLoading , refetch} = useQuery('getAllProducts' , getProducts);

    let filteredProducts = data?.data?.result || [];

    if(searchWord && !isLoading){

        filteredProducts = filteredProducts.filter(pro => pro.name.toLowerCase().includes(searchWord.toLowerCase()));

    }

    return <React.Fragment>

        <div className={proCSS.add_pro}>
            <Link to={'add'}>
                <motion.button whileTap={{scale : 0.95}}><i className="fa-solid fa-plus"></i> Add product</motion.button>
            </Link>
        </div>

        <div className={proCSS.pro_cont}>

            {isLoading ? <div className={localCSS.loading}>

                <ThreeCircles
                    visible={true} height="50" width="50" color="var(--dark-color-1)"
                    ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                />

            </div> : (filteredProducts.length > 0 ? 
                filteredProducts.map((pro , idx) => <ProductCard key={idx} refetch={refetch} data={pro} />)
                : <div
                    style={{
                        width : '100%' , height : '400px' , display : 'flex' ,
                        flexDirection : 'column' , alignItems : 'center' , justifyContent : 'center', gap : '10px' ,
                        fontSize : '20px', fontWeight : '500' , color : 'var(--dark-color-1)'
                    }}
                >

                    <i style={{fontSize : '80px'}} className="fa-solid fa-triangle-exclamation"></i>
                    <p>There is no product with this name.</p>

                </div>
            )}

        </div>

    </React.Fragment>

}