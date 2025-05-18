import { Card } from 'flowbite-react'
import { Outlet, useNavigate } from 'react-router'
import { FC, useEffect, useState } from 'react'
import { ADMIN_PRODUCTS, SELLER_PRODUCTS, CUSTOMER_MARKET } from '../../../utils/constants'
import { isTokenExpired } from '../../../utils/auth'
import { Reducers } from '../../../store'
import { useSelector } from 'react-redux'
import { Role } from '../../../store/types/slices'

const AuthLayout: FC = () => {
    const { role } = useSelector((state: Reducers) => state.userState)
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token && !isTokenExpired(token)) {
            if (role === Role.admin) {
                navigate(ADMIN_PRODUCTS)
            }
            if (role === Role.seller) {
                navigate(SELLER_PRODUCTS)
            }
            if (role === Role.customer) {
                navigate(CUSTOMER_MARKET)
            }
        }
        setIsLogin(false)
    }, [])
    return (
        <>
            {!isLogin && (
                <div className='flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900'>
                    <a
                        href='https://flowbite-admin-dashboard.vercel.app/'
                        className='flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white'
                    >
                        <span>Marketplace</span>
                    </a>
                    <Card className='w-full max-w-sm'>
                        <Outlet />
                    </Card>
                </div>
            )}
        </>
    )
}

export default AuthLayout
