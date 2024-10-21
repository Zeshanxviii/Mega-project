import { TabList, Tab } from '@headlessui/react'
import { Logo, Container, LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.auth.status)

    const navItems = [
        {
            name: Home,
            slug: '/',
            Active: true
        },
        {
            name: Login,
            slug: '/login',
            Active: !authStatus
        },
        {
            name: SignUp,
            slug: '/signup',
            Active: !authStatus
        },
        {
            name: AllPOST,
            slug: '/allpost',
            Active: !authStatus
        }
    ]
    return (
        <header className='p-3'>
            <Container>
                <TabList>
                    <nav className='flex'>
                        <div className='mr-4'>
                            <Link to='/'>
                                <Logo width="70px" />
                            </Link>
                        </div>
                        <ul className='flex ml-auto'>
                            {navItems.map((value) =>
                            (
                                value.Active ?
                                    (<li key={value.name}>
                                        <Tab onClick={() => navigate(value.slug)}>{value.name}</Tab>
                                    </li>)
                                    : (null)
                            ))}
                            {
                                authStatus && (
                                    <Tab>
                                        <LogoutBtn/>
                                    </Tab>
                                )
                            }
                        </ul>
                    </nav>
                </TabList>
            </Container>
        </header>
    )
}

export default Header