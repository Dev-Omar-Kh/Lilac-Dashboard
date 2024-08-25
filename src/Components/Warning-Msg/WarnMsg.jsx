import React, { useState } from 'react';

import wCSS from './Warning.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { ThreeCircles } from 'react-loader-spinner';

export default function DelMsg({userData , ban , setBan , rerender , setSuccessMsg , setErrMsg}) {

    // ====== handel-delete-user ====== //

    const [isLoading, setIsLoading] = useState(false);

    const deleteUser = async() => {

        setIsLoading(true);

        const {data} = await axios.delete(`https://lilac-backend.vercel.app/product/deleteProduct/${userData._id}`);

        if(data.success){

            rerender();
            setBan(false);
            setTimeout(() => {
                setSuccessMsg('The user has been successfully banned !');
            }, 200);

        }else{

            setBan(false);
            setTimeout(() => {
                setErrMsg('Something error !');
            }, 200);

        }

        setIsLoading(false);

    }

    const handelDeleteUser = () => {

        deleteUser();

    }

    // ====== component-animation ====== //

    const parentVariant = {

        hidden : {opacity : 0},
        visible : {opacity : 1},
        transition : {duration : 0.2}

    }

    const childVariant = {

        hidden : {y : 50 , opacity : 0},
        visible : {y : 0 ,opacity : 1},
        transition : {duration : 0.2}

    }

    if(userData){
        console.log(userData);
    }

    return <React.Fragment>

        <AnimatePresence>

            {ban && 
                <motion.div 
                    variants={parentVariant} initial='hidden' animate='visible' exit='hidden'  transition='transition'
                    className={wCSS.container}
                >

                    <motion.div variants={childVariant} className={wCSS.msg_box}>

                        <h3>Warning !</h3>

                        <p>Are you sure you want to delete the <span>{userData.name}</span> ?</p>

                        <div className={wCSS.action}>

                            <motion.button onClick={()=>setBan(false)} whileTap={{scale : 0.9}} className={wCSS.cancel}>
                                Cancel
                            </motion.button>
                            <motion.button onClick={handelDeleteUser} whileTap={{scale : 0.9}} className={wCSS.ban}>
                                {isLoading ?
                                    <ThreeCircles
                                        visible={true} height="20" width="20" color="#E63946"
                                        ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
                                    />
                                    :
                                    <><i className="fa-solid fa-ban"></i>Ban</>
                                }
                            </motion.button>

                        </div>

                    </motion.div>

                </motion.div>
            }

        </AnimatePresence>

    </React.Fragment>

}
