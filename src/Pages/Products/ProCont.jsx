import React from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ThreeCircles } from 'react-loader-spinner';

import localCSS from '../../Style/Local-style.module.css';
import proCSS from '../../Style/cards.module.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function ProCont() {

    const getProducts = async() => {

        return await axios.get('https://lilac-backend.vercel.app/product');

    }

    const {data , isLoading , refetch} = useQuery('getAllProducts' , getProducts);

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

            </div> : data.data.result.map((pro , idx) => <ProductCard key={idx} refetch={refetch} data={pro} />)}

        </div>

    </React.Fragment>

}