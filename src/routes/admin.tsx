import { RouteObject } from 'react-router-dom'

import ProductsPage from '../views/pages/admin/products'
import DashboardLayout from '../layout/templates/dashboard'

import { BASE, ADMIN_PRODUCTS } from '../utils/constants'

const routesAdmin: RouteObject = {
    path: BASE,
    element: <DashboardLayout />,
    children: [
        {
            path: `${ADMIN_PRODUCTS}`,
            element: <ProductsPage />,
        },
    ],
}

export default routesAdmin
