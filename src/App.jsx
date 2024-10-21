import { useState, useEffect} from 'react'
import { Header,Footer } from './components/'
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
    <TabGroup>
      <Header />
      <Outlet />
    </TabGroup>
  ):(<h1 className='text-center'>No users are register</h1>)
}

export default App
