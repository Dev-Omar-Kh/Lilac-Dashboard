import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { ThreeCircles } from 'react-loader-spinner';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({children}) {

    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const storedToken = sessionStorage.getItem('adminTkn');

        if (storedToken) {

            const { role } = jwtDecode(storedToken);
            setToken(role);

        }

        setLoading(false);

    }, []);

    if (loading) {
        return <div style={{
            width : '100%' , height : '100svh',
            display : 'flex' , alignItems : 'center' , justifyContent : 'center',
            backgroundColor : 'var(--dark-color-1)'
        }}>

            <ThreeCircles
                visible={true} height="100" width="100" color="var(--white-color)"
                ariaLabel="three-circles-loading" wrapperStyle={{}} wrapperClass=""
            />

        </div>;
    }

    if(token !== 'admin' || !sessionStorage.getItem('adminTkn')){

        return <Navigate to='/login' />

    }

    return <React.Fragment>

        {children}

    </React.Fragment>

}
