import React, { useState } from 'react'
import authService from '../../appwrite/auth.service'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login } from '../../store/feature/authSlice'
import { Button, Input, Logo } from '../index'
import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const { register, handlesubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const Signup = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data.email, data.password, data.name)
            if (userData) {
                const user = await authService.getCurrentUser()
                dispatch(login(user))
                navigate("/")
            }

        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span
                    className='inline-block w-full max-w-[100px]'>
                        <Logo width="100%"/>
                    </span>
                </div>
                <h2 className='text-2xl font-bold leading-tight text-center'>Sign in to your Account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account ?&nbsp;
                    <Link to={"/signup"}
                    className='font font-medium text primary transition-all duration-200 hover:underline'>
                    Sign up
                    </Link>
                </p>
                {
                    error && <p className='text-center text-red-600 mt-8'>{error}</p>
                }
                <form className='mt-8' onSubmit={handlesubmit(login)}> 
                    <div className='space-y-5'>
                        <Input
                        type="name"
                        placeholder="Enter your name"
                        label ="Name: "
                        {...register("namae", {
                            required: true,
                        })}
                        />
                        <Input
                        type="email"
                        placeholder="Enter your email"
                        label ="Email: "
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        type="password"
                        placeholder="Enter your password"
                        label ="Password: "
                        {...register("password", {
                            required: true,
                        })}
                        />
                        <Button type='submit' classname='w-full'>
                            Create Account
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Signup