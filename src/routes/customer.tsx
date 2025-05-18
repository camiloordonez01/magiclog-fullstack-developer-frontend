import { RouteObject } from 'react-router-dom'
import DashboardLayout from '../layout/templates/dashboard'

import { BASE, CUSTOMER_MARKET } from '../utils/constants'
import { MarketPage } from '../views/pages/customer'

const routesCustomer: RouteObject = {
    path: BASE,
    element: <DashboardLayout />,
    children: [
        {
            path: `${CUSTOMER_MARKET}`,
            element: <MarketPage />,
        },
    ],
}

export default routesCustomer
