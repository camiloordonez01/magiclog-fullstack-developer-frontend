import Axios, { AxiosError } from 'axios'
import { ErrorResponse, Response } from './types'
import { LoginResponse, User } from './types/auth'

const { REACT_APP_DEV_ENDPOINT_API } = process.env

export const login = async (email: string, password: string) => {
    try {
        const { data } = await Axios.post<Response<LoginResponse>>(
            `${REACT_APP_DEV_ENDPOINT_API}/users/login`,
            {
                email,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
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

export const signUp = async (
    name: string,
    lastName: string,
    role: string,
    email: string,
    password: string,
) => {
    try {
        const { data } = await Axios.post<Response<LoginResponse>>(
            `${REACT_APP_DEV_ENDPOINT_API}/users/register`,
            {
                name,
                lastName,
                role,
                email,
                password,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
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

export const getSellers = async () => {
    try {
        const { data } = await Axios.get<Response<User[]>>(
            `${REACT_APP_DEV_ENDPOINT_API}/users/sellers`,
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
