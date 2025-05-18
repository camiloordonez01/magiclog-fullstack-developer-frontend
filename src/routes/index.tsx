import { RouteObject, createBrowserRouter } from 'react-router-dom'

import routesAuth from './auth'
import routesAdmin from './admin'
import routesSeller from './seller'
import routesCustomer from './customer'

import { NotFoundPage } from '../views/pages/custom'

const routesCustom: RouteObject = {
    path: '*',
    element: <NotFoundPage />,
}

const routes = [routesCustom, routesAuth, routesAdmin, routesSeller, routesCustomer]
export default createBrowserRouter(routes)

export const mathRoute = (path: string) => {
    let math = false
    const searchPath = (routesSearch: RouteObject[]) =>
        routesSearch.forEach((route) => {
            if (route.path === path) {
                math = true
            } else if (route.children && route.children.length > 0) {
                searchPath(route.children)
            }
        })
    searchPath(routes)

    return math
}
