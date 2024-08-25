import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';
import { ThreeCircles } from 'react-loader-spinner';
import axios from 'axios';
import { useQuery } from 'react-query';

import localCSS from '../../Style/Local-style.module.css';
import serCSS from '../../Style/cards.module.css';
import ServicesCard from './ServicesCard';

export default function ServicesCont() {

    const getServices = async() => {

        return await axios.get('https://lilac-backend.vercel.app/services/getAll');

    }

    const {data , isLoading , refetch} = useQuery('getAllServices' , getServices);

    return <React.Fragment>

        <div className={serCSS.add_pro}>
            <Link to={'add'}>
                <motion.button whileTap={{scale : 0.95}}><i className="fa-solid fa-plus"></i> Add product</motion.button>
            </Link>
        </div>

        <div className={serCSS.pro_cont}>

            {isLoading ? <div className={localCSS.loading}>

                <ThreeCircles
                    visible={true} height="50" width="50" color="var(--dark-color-1)"
                    ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                />

            </div> : data.data.results.map((pro , idx) => <ServicesCard key={idx} refetch={refetch} data={pro} />)}

        </div>

    </React.Fragment>

}
