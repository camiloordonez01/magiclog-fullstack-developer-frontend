import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Label, Radio, TextInput } from 'flowbite-react'

import { signUp } from '../../../services/auth'

import { ADMIN_PRODUCTS, CUSTOMER_MARKET, LOGIN, SELLER_PRODUCTS } from '../../../utils/constants'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../store'
import { setUser } from '../../../store/slices/userState'
import { getUser } from '../../../utils/auth'
import { pushNotification } from '../../../store/slices/appState'

type Inputs = {
    name: string
    lastName: string
    email: string
    password: string
    role: string
}

const RegisterPage: FC = () => {
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
        const resultRegister = await signUp(
            data.name,
            data.lastName,
            data.role,
            data.email,
            data.password,
        )
        if (resultRegister && resultRegister.message === 'Error') {
            setError('email', { message: resultRegister.data })
            setSubmit(false)
        } else if (resultRegister && resultRegister.message === 'Success') {
            const { token, role } = resultRegister.data
            localStorage.setItem('token', token)
            if (role === 'admin') {
                navigate(ADMIN_PRODUCTS)
            }
            if (role === 'seller') {
                navigate(SELLER_PRODUCTS)
            }
            if (role === 'customer') {
                navigate(CUSTOMER_MARKET)
            }
            dispatch(setUser(getUser()))
            dispatch(
                pushNotification({ type: 'success', message: 'Se registro correctamente.' }),
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
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>Registrarse</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <div>
                    <div className='mb-2 block'>
                        <Label htmlFor='name' value='Tu nombre' />
                    </div>
                    <TextInput
                        id='name'
                        type='string'
                        placeholder='Tu nombre'
                        disabled={submit}
                        required
                        {...register('name', { required: true })}
                    />
                </div>
                <div>
                    <div className='mb-2 block'>
                        <Label htmlFor='lastName' value='Tu apellido' />
                    </div>
                    <TextInput
                        id='lastName'
                        type='string'
                        placeholder='Tu apellido'
                        disabled={submit}
                        required
                        {...register('lastName', { required: true })}
                    />
                </div>
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
                    {errors.email && (
                        <div className='text-red-500 text-sm mt-1'>{errors.email.message}</div>
                    )}
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
                <div>
                    <div className='mb-2 block'>
                        <Label htmlFor='password1' value='Tu perfil' />
                    </div>
                    <div className='flex items-center justify-between max-w-md gap-4'>
                        <div className='flex items-center gap-2'>
                            <Radio
                                id='customer'
                                value='customer'
                                defaultChecked
                                {...register('role')}
                            />
                            <Label htmlFor='customer'>Cliente</Label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Radio id='seller' value='seller' {...register('role')} />
                            <Label htmlFor='seller'>Vendedor</Label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Radio id='admin' value='admin' {...register('role')} />
                            <Label htmlFor='admin'>Administrador</Label>
                        </div>
                    </div>
                </div>
                <Button disabled={submit} type='submit' isProcessing={submit}>
                    Registrarse
                </Button>
            </form>
            <div className='flex items-center justify-center mt-4'>
                <a
                    href={LOGIN}
                    className='text-sm text-center font-medium text-blue-600 hover:underline dark:text-blue-500'
                >
                    Iniciar sesión
                </a>
            </div>
        </>
    )
}

export default RegisterPage
