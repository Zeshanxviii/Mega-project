// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// export default function ProtectedRoute({ children, authentication = true }) {
//     const navigate = useNavigate()
//     const authStatus = useSelector((state) => state.auth.status)
//     console.log(authStatus)
//     const [Loading, setLoading] = useState(true)

//     useEffect(() => {
//         if(!authentication && authStatus == authentication)
//         {
//             console.log("Not authenticated")            
//             navigate('/login')
//         }
//         else if(authentication && authStatus == authentication)
//         {
//             console.log("Authenticated")            
//             navigate('/')
//         }
//         setLoading(false)
//     },[authStatus, navigate, Loading])
//     return Loading ? <h1>Loading</h1> :<>{children}</>
// }
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function ProtectedRoute({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            console.log("Not authenticated")   
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            console.log("Authenticated")
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
