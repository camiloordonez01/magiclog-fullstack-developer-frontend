import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import { useDispatch } from 'react-redux'

import { login } from '../../../services/auth'

import {
    ADMIN_PRODUCTS,
    SELLER_PRODUCTS,
    CUSTOMER_MARKET,
    REGISTER,
} from '../../../utils/constants'
import { setUser } from '../../../store/slices/userState'
import { getUser } from '../../../utils/auth'
import { AppDispatch } from '../../../store'
import { pushNotification } from '../../../store/slices/appState'

type Inputs = {
    email: string
    password: string
}

const LoginPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const [submit, setSubmit] = useState(false)
    const {
        handleSubmit,
        register,
        setError,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setSubmit(true)
        const resultLogin = await login(data.email, data.password)
        if (resultLogin && resultLogin.message === 'Error') {
            setError('password', { message: resultLogin.data })
            dispatch(pushNotification({ type: 'danger', message: 'No se pudo iniciar sesión.' }))
            setSubmit(false)
        } else if (resultLogin && resultLogin.message === 'Success') {
            const { token, role } = resultLogin.data
            localStorage.setItem('token', token)
            dispatch(setUser(getUser()))
            dispatch(
                pushNotification({ type: 'success', message: 'Se inicio sesión correctamente.' }),
            )
            if (role === 'admin') {
                navigate(ADMIN_PRODUCTS)
            }
            if (role === 'seller') {
                navigate(SELLER_PRODUCTS)
            }
            if (role === 'customer') {
                navigate(CUSTOMER_MARKET)
            }
        }
    }
    return (
        <>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Iniciar sesión</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <div>
                    <div className='mb-2 block'>
                        <Label htmlFor='email1' value='Tu email' />
                    </div>
                    <TextInput
                        id='email1'
                        type='email'
                        placeholder='name@mail.com'
                        disabled={submit}
                        required
                        {...register('email', { required: true })}
                    />
                </div>
                <div>
                    <div className='mb-2 block'>
                        <Label htmlFor='password1' value='Tu contraseña' />
                    </div>
                    <TextInput
                        id='password1'
                        type='password'
                        placeholder='••••••••'
                        disabled={submit}
                        required
                        {...register('password', { required: true })}
                    />
                </div>
                <div className='items-center gap-2 hidden'>
                    <Checkbox id='remember' />
                    <Label htmlFor='remember'>Recuérdeme</Label>
                </div>
                <Button disabled={submit} type='submit' isProcessing={submit}>
                    Iniciar sesión
                </Button>
                {errors.password && (
                    <div>
                        <span className='font-medium'>Oops!</span> {errors.password.message}
                    </div>
                )}
            </form>
            <div className='flex items-center justify-center mt-4'>
                <a
                    href={REGISTER}
                    className='text-sm text-center font-medium text-blue-600 hover:underline dark:text-blue-500'
                >
                    Crear cuenta
                </a>
            </div>
        </>
    )
}

export default LoginPage
