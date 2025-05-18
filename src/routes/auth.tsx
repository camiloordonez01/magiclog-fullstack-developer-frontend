import { RouteObject } from 'react-router-dom'
import AuthLayout from '../layout/templates/auth'
import { LoginPage, RegisterPage } from '../views/pages/auth'

import { BASE, LOGIN, REGISTER } from '../utils/constants'

const routesAuth: RouteObject = {
    path: BASE,
    element: <AuthLayout />,
    children: [
        {
            path: LOGIN,
            element: <LoginPage />,
        },
        {
            path: REGISTER,
            element: <RegisterPage />,
        },
    ],
}

export default routesAuth
