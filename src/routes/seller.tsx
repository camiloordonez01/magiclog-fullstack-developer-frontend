import { RouteObject } from 'react-router-dom'
import DashboardLayout from '../layout/templates/dashboard'

import {
    BASE,
    SELLER_PRODUCTS,
    SELLER_PRODUCTS_CREATE,
    SELLER_PRODUCTS_EDIT,
} from '../utils/constants'
import { AllProductPage, CreateProductPage, EditProductPage } from '../views/pages/seller/products'

const routesSeller: RouteObject = {
    path: BASE,
    element: <DashboardLayout />,
    children: [
        {
            path: `${SELLER_PRODUCTS}`,
            element: <AllProductPage />,
        },
        {
            path: `${SELLER_PRODUCTS_CREATE}`,
            element: <CreateProductPage />,
        },
        {
            path: `${SELLER_PRODUCTS_EDIT}`,
            element: <EditProductPage />,
        },
    ],
}

export default routesSeller
