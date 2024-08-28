import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { ThreeCircles } from 'react-loader-spinner';
import axios from 'axios';
import { useQuery } from 'react-query';

import localCSS from '../../Style/Local-style.module.css';
import serCSS from '../../Style/cards.module.css';
import ServicesCard from './ServicesCard';
import { filterServices, searchBarServices } from '../../Redux/Search';
import { useDispatch, useSelector } from 'react-redux';

export default function ServicesCont() {

    const {searchWordServices} = useSelector(store => store.products);
    const dispatch = useDispatch();

    const getServices = async() => {

        return await axios.get('https://lilac-backend.vercel.app/services/getAll');

    }

    const {data , isLoading , refetch} = useQuery('getAllServices' , getServices);

    // ====== search ====== //

    let filteredServices = data?.data?.results || [];

    if(searchWordServices && !isLoading){

        console.log(searchWordServices);

        filteredServices = filteredServices.filter(pro => pro.name.toLowerCase().includes(searchWordServices.toLowerCase()));

    }

    useEffect(() => {

        dispatch(searchBarServices({display : true}));

        return () => {

            dispatch(searchBarServices({display : null}));
            dispatch(filterServices({nameS : null}));

        }

    } , [dispatch]);

    return <React.Fragment>

        <div className={serCSS.add_pro}>
            <Link to={'add'}>
                <motion.button whileTap={{scale : 0.95}}><i className="fa-solid fa-plus"></i> Add Service</motion.button>
            </Link>
        </div>

        <div className={serCSS.pro_cont}>

            {isLoading ? <div className={localCSS.loading}>

                <ThreeCircles
                    visible={true} height="50" width="50" color="var(--dark-color-1)"
                    ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                />

            </div> : (filteredServices.length > 0 ? 
                filteredServices.map((pro , idx) => <ServicesCard key={idx} refetch={refetch} data={pro} />)
                : <div
                    style={{
                        width : '100%' , height : '400px' , display : 'flex' ,
                        flexDirection : 'column' , alignItems : 'center' , justifyContent : 'center', gap : '10px' ,
                        fontSize : '18px', fontWeight : '500' , color : 'var(--dark-color-1)'
                    }}
                >

                    <i style={{fontSize : '60px'}} className="fa-solid fa-triangle-exclamation"></i>
                    <p>Product not found.</p>

                </div>
            )}

        </div>

    </React.Fragment>

}
