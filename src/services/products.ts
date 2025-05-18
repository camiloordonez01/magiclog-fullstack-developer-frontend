import Axios, { AxiosError } from 'axios'
import { ErrorResponse, Response } from './types'
import { Product } from './types/product'

const { REACT_APP_DEV_ENDPOINT_API } = process.env

export const getProduct = async (productId: string) => {
    try {
        const { data } = await Axios.get<Response<Product | null>>(
            `${REACT_APP_DEV_ENDPOINT_API}/products/${productId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
            },
        )

        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data as ErrorResponse
        }
    }
}

export const AllProducts = async () => {
    try {
        const { data } = await Axios.get<Response<Product[]>>(
            `${REACT_APP_DEV_ENDPOINT_API}/products`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
            },
        )

        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data as ErrorResponse
        }
    }
}

export const AllProductsByFilter = async (
    name?: string,
    sku?: string,
    minPrice?: string,
    maxPrice?: string,
    sellerId?: string,
) => {
    try {
        const params = new URLSearchParams()

        if (name) params.append('name', name)
        if (sku) params.append('sku', sku)
        if (minPrice) params.append('minPrice', minPrice.toString())
        if (maxPrice) params.append('maxPrice', maxPrice.toString())
        if (sellerId) params.append('sellerId', sellerId.toString())

        const { data } = await Axios.get<Response<Product[]>>(
            `${REACT_APP_DEV_ENDPOINT_API}/products/all?${params.toString()}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
            },
        )

        return data
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return error.response.data as ErrorResponse
        }
    }
}

export const createProduct = async (name: string, sku: string, amount: number, price: number) => {
    try {
        const { data } = await Axios.post<Response<Product>>(
            `${REACT_APP_DEV_ENDPOINT_API}/products`,
            {
                name,
                sku,
                amount,
                price,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
            },
        )

        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data as ErrorResponse
        }
    }
}

export const editProduct = async (
    productId: string,
    name: string,
    sku: string,
    amount: number,
    price: number,
) => {
    try {
        const { data } = await Axios.put<Response<Product>>(
            `${REACT_APP_DEV_ENDPOINT_API}/products/${productId}`,
            {
                name,
                sku,
                amount,
                price,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
            },
        )

        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data as ErrorResponse
        }
    }
}

export const deleteProduct = async (productId: number) => {
    try {
        const { data } = await Axios.delete<Response<void>>(
            `${REACT_APP_DEV_ENDPOINT_API}/products/${productId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
            },
        )

        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            return error.response?.data as ErrorResponse
        }
    }
}
