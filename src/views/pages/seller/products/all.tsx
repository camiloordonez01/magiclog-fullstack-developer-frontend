import { Button } from 'flowbite-react'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { SELLER_PRODUCTS_CREATE, SELLER_PRODUCTS_EDIT } from '../../../../utils/constants'
import { AllProducts } from '../../../../services/products'
import { resolvePathParams } from '../../../../utils'
import { deleteProduct } from '../../../../services/products'
import { AppDispatch } from '../../../../store'
import { pushNotification } from '../../../../store/slices/appState'

import DeleteProductModal from './delete'

interface Product {
    id: number
    name: string
    sku: string
    amount: number
    price: number
}

const ProductAllPage: FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [products, setProducts] = useState<Product[]>([])
    const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
    const [selectProduct, setSelectProduct] = useState<Pick<Product, 'id' | 'name' | 'sku'> | null>(
        null,
    )

    useEffect(() => {
        AllProducts().then((result) => {
            if (result && result.message === 'Success') {
                setProducts(result.data)
            }
        })
    }, [])

    const handleDelete = (id: number, name: string, sku: string) => {
        setSelectProduct({ id, name, sku })
        setModalDeleteOpen(true)
    }

    const confirmDelete = async () => {
        if (selectProduct) {
            const resultDeleteProduct = await deleteProduct(selectProduct.id)
            if (resultDeleteProduct && resultDeleteProduct.message === 'Success') {
                dispatch(
                    pushNotification({
                        type: 'success',
                        message: `Se elimino el producto con SKU ${selectProduct.sku}`,
                    }),
                )
                setProducts((oldProducts) =>
                    oldProducts.filter((product) => product.id !== selectProduct.id),
                )
            } else if (resultDeleteProduct) {
                dispatch(pushNotification({ type: 'danger', message: resultDeleteProduct.data }))
            }
            setModalDeleteOpen(false)
        }
    }

    return (
        <div className='w-svw md:w-auto'>
            <div className='block md:flex items-center justify-between mb-6'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Productos</h1>
                    <p className='text-gray-600 dark:text-gray-300'>
                        Aquí puedes gestionar tus productos.
                    </p>
                </div>
                <Button className='mt-2 md:mt-0' onClick={() => navigate(SELLER_PRODUCTS_CREATE)}>
                    Agregar producto
                </Button>
            </div>

            <div className='overflow-x-auto'>
                <table className='w-full text-sm text-left text-gray-700 bg-white dark:bg-gray-400 rounded-lg shadow-md'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-500'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>
                                Nombre
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                SKU
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Cantidad
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Precio
                            </th>
                            <th scope='col' className='px-6 py-3'>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product.id}
                                className='border-b hover:bg-gray-50 dark:text-white hover:dark:text-black'
                            >
                                <td className='px-6 py-4 font-medium '>{product.name}</td>
                                <td className='px-6 py-4'>{product.sku}</td>
                                <td className='px-6 py-4'>{product.amount}</td>
                                <td className='px-6 py-4'>${product.price.toLocaleString()}</td>
                                <td className='px-6 py-4 space-x-2 flex'>
                                    <Button
                                        size='xs'
                                        color='info'
                                        onClick={() =>
                                            navigate(
                                                resolvePathParams(SELLER_PRODUCTS_EDIT, {
                                                    id: product.id,
                                                }),
                                            )
                                        }
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        size='xs'
                                        color='failure'
                                        onClick={() =>
                                            handleDelete(product.id, product.name, product.sku)
                                        }
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && (
                            <tr>
                                <td colSpan={5} className='px-6 py-4 text-center text-gray-500'>
                                    No hay productos disponibles.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {selectProduct && (
                <DeleteProductModal
                    show={modalDeleteOpen}
                    onClose={() => setModalDeleteOpen(false)}
                    onConfirm={confirmDelete}
                    productName={selectProduct.name}
                />
            )}
        </div>
    )
}

export default ProductAllPage
