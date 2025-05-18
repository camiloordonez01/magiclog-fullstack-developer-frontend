import { createSlice } from '@reduxjs/toolkit'
import { Role, UserState } from '../types/slices'
import { getUser } from '../../utils/auth'

const user = getUser()

const initialState: UserState = {
    name: user ? user.name : '',
    lastName: user ? user.lastName : '',
    email: user ? user.email : '',
    role: user ? Role[user.role] : Role['customer'],
}

export const userStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name
            state.lastName = action.payload.lastName
            state.email = action.payload.email
            state.role = Role[action.payload.role as keyof typeof Role]
        },
    },
})

const { reducer, actions } = userStateSlice

export const { setUser } = actions
export default reducer
