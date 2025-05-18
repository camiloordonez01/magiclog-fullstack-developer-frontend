import { jwtDecode } from 'jwt-decode'
import { UserRole } from '../services/types/auth'

interface DataToken {
    exp: number
    name: string
    lastName: string
    email: string
    role: UserRole
}
export const getUser = () => {
    const token = localStorage.getItem('token')
    if (!token) return false

    const decoded = jwtDecode<DataToken>(token)
    return decoded
}

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<DataToken>(token)
        const currentTime = Date.now() / 1000
        return decoded.exp < currentTime
    } catch (error) {
        return true
    }
}
