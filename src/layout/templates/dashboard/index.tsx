import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Flowbite, CustomFlowbiteTheme } from 'flowbite-react'
import { useDispatch } from 'react-redux'

import { LOGIN } from '../../../utils/constants'
import { isTokenExpired } from '../../../utils/auth'
import { AppDispatch } from '../../../store'
import { setUser } from '../../../store/slices/userState'
import { pushNotification } from '../../../store/slices/appState'

import Header from './header'
import Sidebar from './sidebar'
import Footer from './footer'
import BreadcrumbBody from './breadcrumb'

const customTheme: CustomFlowbiteTheme = {}

const DashboardLayout: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem('token')
            dispatch(setUser({ name: '', lastName: '', email: '' }))
            dispatch(pushNotification({ type: 'success', message: 'La sesión expiro.' }))
            navigate(LOGIN)
        }
    }, [])
    return (
        <Flowbite theme={{ theme: customTheme }}>
            <div className='bg-gray-50 dark:bg-gray-800'>
                <Header />
                <div className='flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900'>
                    <Sidebar />
                    <div
                        id='main-content'
                        className='relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900'
                    >
                        <main
                            className='grid content-between md:pt-6 md:pb-4 md:px-4'
                            style={{ minHeight: 'calc(100vh - 64px)' }}
                        >
                            <div className='p-5 md:p-0'>
                                <BreadcrumbBody />
                                <Outlet />
                            </div>
                            <Footer />
                        </main>
                    </div>
                </div>
            </div>
        </Flowbite>
    )
}

export default DashboardLayout
