import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/feature/authSlice'
import authService from '../../appwrite/auth.service'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const logouthandler = async() => {
       await authService.logout().then(
            () => {
                dispatch(logout())
                navigate('/login');
            }
        )
    }

    return (
        <button
        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logouthandler}>logout</button>
    )
}

export default LogoutBtn