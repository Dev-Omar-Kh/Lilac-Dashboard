import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Auth() {

    return <React.Fragment>

        <div style={{
            width : '100%' , height : '100svh',
            display : 'flex' , alignItems : 'center', justifyContent : 'center'
        }}>

            <Outlet />

        </div>

    </React.Fragment>

}
