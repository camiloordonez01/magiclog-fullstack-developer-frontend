import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Label, TextInput } from 'flowbite-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { editProduct, getProduct } from '../../../../services/products'
import { AppDispatch } from '../../../../store'
import { pushNotification } from '../../../../store/slices/appState'
import { SELLER_PRODUCTS } from '../../../../utils/constants'

interface FormData {
    name: string
    sku: string
    amount: number
    price: number
}

const EditProductPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { id } = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, setError, reset } = useForm<FormData>()

    useEffect(() => {
        if (id) {
            getProduct(id).then((result) => {
                if (result && result.message === 'Success' && result.data) {
                    reset(result.data)
                } else if (result && result.message === 'Success' && result.data === null) {
                    dispatch(pushNotification({ type: 'danger', message: 'El producto no existe' }))
                    navigate(SELLER_PRODUCTS)
                }
            })
        }
    }, [id, reset])

    const onSubmit = async (data: FormData) => {
        const resultEdit = await editProduct(
            String(id),
            data.name,
            data.sku,
            Number(data.amount),
            Number(data.price),
        )
        if (resultEdit && resultEdit.message === 'Success') {
            dispatch(
                pushNotification({
                    type: 'success',
                    message: `Se actualizo el producto con SKU ${data.sku}`,
                }),
            )
            navigate(SELLER_PRODUCTS)
        } else if (
            resultEdit &&
            resultEdit.message === 'Error' &&
            resultEdit.type === 'product.update.sku.exist'
        ) {
            setError('sku', { message: resultEdit.data })
            dispatch(pushNotification({ type: 'danger', message: resultEdit.data }))
        } else if (
            resultEdit &&
            resultEdit.message === 'Error' &&
            resultEdit.type === 'product.update.name.exist'
        ) {
            setError('name', { message: resultEdit.data })
            dispatch(pushNotification({ type: 'danger', message: resultEdit.data }))
        } else if (resultEdit) {
            dispatch(pushNotification({ type: 'danger', message: resultEdit.data }))
        }
    }

    return (
        <div className='w-full mx-auto mt-10 bg-white dark:bg-gray-400 p-6 rounded-md shadow-md'>
            <h2 className='text-2xl font-bold mb-4 text-gray-900'>Editar producto</h2>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div>
                    <Label htmlFor='name' value='Nombre del producto' />
                    <TextInput id='name' {...register('name', { required: true })} />
                </div>
                <div>
                    <Label htmlFor='sku' value='SKU' />
                    <TextInput id='sku' {...register('sku', { required: true })} />
                </div>
                <div>
                    <Label htmlFor='amount' value='Cantidad' />
                    <TextInput
                        id='amount'
                        type='number'
                        {...register('amount', { required: true, valueAsNumber: true })}
                    />
                </div>
                <div>
                    <Label htmlFor='price' value='Precio' />
                    <TextInput
                        id='price'
                        type='number'
                        {...register('price', { required: true, valueAsNumber: true })}
                    />
                </div>

                <div className='flex justify-end'>
                    <Button type='submit'>Guardar cambios</Button>
                </div>
            </form>
        </div>
    )
}

export default EditProductPage
