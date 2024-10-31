import { useState, useEffect} from 'react'
import { Header,Footer } from './components/index.js'
import {Outlet} from 'react-router-dom'
import { TabGroup } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth.service'
import { login , logout } from './store/feature/authSlice'

function App() {
  const [isLoading , setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(
    () => {
      authService.getCurrentUser()
      .then((userData) => {
        if(userData)
        {
          dispatch(login({userData}))
        }
        else{
          dispatch(logout())
        }
      })
      .finally(() => setIsLoading(false))
    }, []
  )
  return !isLoading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header/>
      <main>
       <Outlet />
      </main>
      <Footer />
    </div>
  </div>
  ):null
}

export default App
