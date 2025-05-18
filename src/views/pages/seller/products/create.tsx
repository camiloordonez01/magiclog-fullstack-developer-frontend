import { Button, Label, TextInput } from 'flowbite-react'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { createProduct } from '../../../../services/products'
import { SELLER_PRODUCTS } from '../../../../utils/constants'
import { AppDispatch } from '../../../../store'
import { pushNotification } from '../../../../store/slices/appState'

interface ProductFormData {
    name: string
    sku: string
    amount: number
    price: number
}

const CreateProductPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ProductFormData>()

    const onSubmit = async (data: ProductFormData) => {
        const resultCreate = await createProduct(
            data.name,
            data.sku,
            Number(data.amount),
            Number(data.price),
        )
        if (resultCreate && resultCreate.message === 'Success') {
            dispatch(pushNotification({ type: 'success', message: 'Se creo un nuevo producto' }))
            navigate(SELLER_PRODUCTS)
        } else if (
            resultCreate &&
            resultCreate.message === 'Error' &&
            resultCreate.type === 'product.create.sku.exist'
        ) {
            setError('sku', { message: resultCreate.data })
            dispatch(pushNotification({ type: 'danger', message: resultCreate.data }))
        } else if (
            resultCreate &&
            resultCreate.message === 'Error' &&
            resultCreate.type === 'product.create.name.exist'
        ) {
            setError('name', { message: resultCreate.data })
            dispatch(pushNotification({ type: 'danger', message: resultCreate.data }))
        } else if (resultCreate) {
            dispatch(pushNotification({ type: 'danger', message: resultCreate.data }))
        }
    }

    return (
        <div className='w-full mx-auto p-6 bg-white dark:bg-gray-400 rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold text-gray-900 mb-4'>Agregar Producto</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div>
                    <Label htmlFor='name' value='Nombre del producto' />
                    <TextInput
                        id='name'
                        {...register('name', { required: 'Este campo es obligatorio' })}
                        placeholder='Ej: Hamburguesa Clásica'
                    />
                    {errors.name && (
                        <p className='text-red-600 text-sm mt-1'>{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor='sku' value='SKU' />
                    <TextInput
                        id='sku'
                        {...register('sku', { required: 'Este campo es obligatorio' })}
                        placeholder='Ej: HB001'
                    />
                    {errors.sku && (
                        <p className='text-red-600 text-sm mt-1'>{errors.sku.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor='amount' value='Cantidad' />
                    <TextInput
                        id='amount'
                        type='number'
                        {...register('amount', {
                            required: 'Este campo es obligatorio',
                            min: { value: 1, message: 'Debe ser mayor a 0' },
                        })}
                        placeholder='Ej: 20'
                    />
                    {errors.amount && (
                        <p className='text-red-600 text-sm mt-1'>{errors.amount.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor='price' value='Precio (COP)' />
                    <TextInput
                        id='price'
                        type='number'
                        {...register('price', {
                            required: 'Este campo es obligatorio',
                            min: { value: 100, message: 'Debe ser mayor a 100' },
                        })}
                        placeholder='Ej: 25000'
                    />
                    {errors.price && (
                        <p className='text-red-600 text-sm mt-1'>{errors.price.message}</p>
                    )}
                </div>

                <Button type='submit' className='w-full'>
                    Guardar producto
                </Button>
            </form>
        </div>
    )
}

export default CreateProductPage
