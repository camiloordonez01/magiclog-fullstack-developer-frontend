import { FC, useEffect, useState } from 'react'
import { Button, Label, Select } from 'flowbite-react'
import { AllProductsByFilter } from '../../../services/products'
import { Product } from '../../../services/types/product'
import { User } from '../../../services/types/auth'
import { getSellers } from '../../../services/auth'

interface Filter {
    sellerId: string
}

const ProductsPage: FC = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [sellers, setSellers] = useState<User[]>([])
    const [filters, setFilters] = useState<Filter>({
        sellerId: '',
    })

    const fetchProducts = async (filters: Filter) => {
        const { sellerId } = filters
        const responseAllProducts = await AllProductsByFilter(
            undefined,
            undefined,
            undefined,
            undefined,
            sellerId,
        )
        if (responseAllProducts && responseAllProducts.message === 'Success') {
            setProducts(responseAllProducts.data)
        }
    }

    useEffect(() => {
        fetchProducts(filters)
        getSellers().then((result) => {
            if (result && result.message === 'Success') {
                setSellers(result.data)
            }
        })
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const handleFilter = () => {
        fetchProducts(filters)
    }

    const handleClearFilter = () => {
        setFilters({
            sellerId: '',
        })
        fetchProducts({
            sellerId: '',
        })
    }

    return (
        <div className='p-4 bg-white dark:bg-gray-600 rounded-lg shadow'>
            <h1 className='dark:text-white  text-2xl font-bold'>Lista de productos</h1>
            <p className='text-gray-500 dark:text-gray-200'>Aquí puedes ver todos los productos.</p>

            {/* Filtros */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
                <div>
                    <Label htmlFor='sellerId'>Vendedor</Label>
                    <Select name='sellerId' value={filters.sellerId} onChange={handleChange}>
                        <option value=''>Todos</option>
                        {sellers.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </Select>
                </div>
            </div>

            <div className='flex'>
                <Button className='mr-2' onClick={handleFilter}>
                    Aplicar filtros
                </Button>
                <Button onClick={handleClearFilter} color='blue'>
                    Limpiar filtros
                </Button>
            </div>

            {/* Tabla de productos */}
            <div className='overflow-x-auto mt-6 dark:bg-gray-400'>
                <table className='w-full text-sm text-left text-gray-700'>
                    <thead className='text-xs uppercase bg-gray-100 dark:bg-gray-200 text-gray-700'>
                        <tr>
                            <th className='px-4 py-2'>Nombre</th>
                            <th className='px-4 py-2'>SKU</th>
                            <th className='px-4 py-2'>Precio</th>
                            <th className='px-4 py-2'>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id} className='border-b hover:bg-gray-50'>
                                    <td className='px-4 py-2'>{product.name}</td>
                                    <td className='px-4 py-2'>{product.sku}</td>
                                    <td className='px-4 py-2'>${product.price}</td>
                                    <td className='px-4 py-2'>{product.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className='text-center px-4 py-6 text-gray-500'>
                                    No hay productos que coincidan con los filtros.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductsPage
