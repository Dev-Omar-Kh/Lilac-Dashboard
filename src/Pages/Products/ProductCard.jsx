import React, { useState } from 'react';
import WarnMsg from '../../Components/Warning-Msg/WarnMsg'

import cProCSS from './products.module.css';
import { useNavigate } from 'react-router-dom';
import Status from './../../Components/Status/Status';

export default function ProductCard({data , refetch}) {

    const navigate = useNavigate();

    const goToUpdate = () => {

        navigate(`/products/update/${data.id}`);

    }

    // ====== handle-delete-product ====== //

    const [banMsg, setBanMsg] = useState(false);
    const [userData, setUserData] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);

    const handelBan = (data) => {

        setSuccessMsg(null);
        setErrMsg(null);
        setBanMsg(true);
        setUserData(data);

    }

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}
        <WarnMsg
            setErrMsg={setErrMsg} setSuccessMsg={setSuccessMsg} 
            rerender={refetch} userData={userData} ban={banMsg} 
            setBan={setBanMsg} 
        />

        <div className={cProCSS.card}>

            <div className={cProCSS.actions}>

                <button onClick={() => handelBan(data)}><i className="fa-solid fa-trash-can"></i></button>
                <button onClick={goToUpdate}><i className="fa-regular fa-pen-to-square"></i></button>

            </div>

            <div className={cProCSS.images}>

                <div className={cProCSS.sub_images}>

                    {data.image.map((img , idx) => <img key={idx} src={img.url} alt={data.name} />)}

                </div>

            </div>

            <div className={cProCSS.details}>

                <div className={cProCSS.det_box}>
                    <p className={cProCSS.pro_title}>Lorem :</p> 
                    {data.name}
                </div>

                <div className={cProCSS.det_box}>
                    <p className={cProCSS.pro_title}>Description :</p>
                    {data.description}
                </div>

                <div className={cProCSS.det_box}>
                    <p className={cProCSS.pro_title}>Price :</p>
                    {data.price} EGP
                </div>

                <div className={cProCSS.det_box}>
                    <p className={cProCSS.pro_title}>Discount :</p>
                    {data.discount}%
                </div>

                <div className={cProCSS.det_box}>
                    <p className={cProCSS.pro_title}>Final price :</p>
                    {data.finalPrice} EGP
                </div>

            </div>

        </div>

    </React.Fragment>

}
