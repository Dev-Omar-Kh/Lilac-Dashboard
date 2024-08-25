import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Status from './../../Components/Status/Status';
import WarnMsg from './../../Components/Warning-Msg/WarnMsg';

import cServicesCSS from '../../Style/cards.module.css';

export default function ServicesCard({data , refetch}) {

    const navigate = useNavigate();

    const goToUpdate = () => {

        navigate(`update/${data._id}`);

    }

    // ====== handle-delete-product ====== //

    const [banMsg, setBanMsg] = useState(false);
    const [userData, setUserData] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const [visible, setVisible] = useState(true);
    const [control, setControl] = useState(false);
    const [endPoint, setEndPoint] = useState(null);

    const handelBan = (data) => {

        setSuccessMsg(null);
        setErrMsg(null);
        setBanMsg(true);
        setUserData(data);
        setEndPoint('services/delete')

    }

    useEffect(() => {

        const startVideo = document.getElementById(`startVideo-${data._id}`);
        const video = document.getElementById(`video-${data._id}`);

        const handleActionsVideo = () => {

            if(!control){
                video.play();
            }
            else{
                video.pause();
            }

            setControl(prev => !prev);

        }

        const handleVideoEnded = () => {

            setControl(false);

        }

        if(startVideo){

            startVideo.addEventListener('click' , handleActionsVideo);

        }

        if (video) {

            video.addEventListener('ended', handleVideoEnded);

        }

        return () => {

            if (startVideo) {

                startVideo.removeEventListener('click', handleActionsVideo);

            }

            if (video) {

                video.removeEventListener('ended', handleVideoEnded);

            }

        }


    } , [control , data._id]);

    return <React.Fragment>

        {successMsg ? <Status icon='success' isVisible={visible} visibility={setVisible} data={successMsg} /> : ''}
        {errMsg ? <Status icon='error' isVisible={visible} visibility={setVisible} data={errMsg} /> : ''}
        <WarnMsg
            setErrMsg={setErrMsg} setSuccessMsg={setSuccessMsg} 
            rerender={refetch} userData={userData} ban={banMsg} 
            setBan={setBanMsg} endPoint={endPoint}
        />

        <div className={cServicesCSS.card}>

            <div className={cServicesCSS.actions}>

                <button onClick={() => handelBan(data)}><i className="fa-solid fa-trash-can"></i></button>
                <button onClick={goToUpdate}><i className="fa-regular fa-pen-to-square"></i></button>

            </div>

            <div className={cServicesCSS.images}>

                <div className={cServicesCSS.sub_images}>

                    {data.img && <img className={cServicesCSS.ser_media} src={data.img.url} alt={data.name} />}

                    {data.video && <div className={cServicesCSS.video_cont}>

                        <video id={`video-${data._id}`} className={cServicesCSS.ser_media} src={data.video.url} />
                        <span id={`startVideo-${data._id}`}>
                            {control ? <i className="fa-regular fa-circle-pause"></i> : <i className="fa-regular fa-circle-play"></i>}
                        </span>

                    </div>}

                </div>

            </div>

            <div className={cServicesCSS.details}>

                <div className={cServicesCSS.det_box}>
                    <p className={cServicesCSS.pro_title}>Name :</p> 
                    {data.name}
                </div>

                <div className={cServicesCSS.det_box}>
                    <p className={cServicesCSS.pro_title}>Description :</p>
                    {data.description}
                </div>

            </div>

        </div>

    </React.Fragment>

}
