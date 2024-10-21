import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/feature/authSlice'
import authService from '../../appwrite/auth.service'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logouthandler = () => {
        authService.logout().then(
            () => {
                dispatch(logout)
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