import { FC, useEffect, useState } from 'react'
import { Button, TextInput, Label } from 'flowbite-react'
import { AllProductsByFilter } from '../../../services/products'
import { Product } from '../../../services/types/product'

interface Filter {
    name: string
    sku: string
    minPrice: string
    maxPrice: string
}

const CustomerProductPage: FC = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [filters, setFilters] = useState<Filter>({
        name: '',
        sku: '',
        minPrice: '',
        maxPrice: '',
    })

    const fetchProducts = async (filters: Filter) => {
        const { name, sku, minPrice, maxPrice } = filters
        const responseAllProducts = await AllProductsByFilter(name, sku, minPrice, maxPrice)
        if (responseAllProducts && responseAllProducts.message === 'Success') {
            setProducts(responseAllProducts.data)
        }
    }

    useEffect(() => {
        fetchProducts(filters)
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value })
    }

    const handleFilter = () => {
        fetchProducts(filters)
    }

    const handleClearFilter = () => {
        setFilters({
            name: '',
            sku: '',
            minPrice: '',
            maxPrice: '',
        })
        fetchProducts({
            name: '',
            sku: '',
            minPrice: '',
            maxPrice: '',
        })
    }

    return (
        <div className='p-4 bg-white dark:bg-gray-600 rounded-lg shadow'>
            <h1 className='dark:text-white  text-2xl font-bold'>Marketplace</h1>
            <p className='text-gray-500 dark:text-gray-200'>Aquí puedes comprar tus productos.</p>

            {/* Filtros */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
                <div>
                    <Label htmlFor='name'>Nombre</Label>
                    <TextInput name='name' value={filters.name} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor='sku'>SKU</Label>
                    <TextInput name='sku' value={filters.sku} onChange={handleChange} />
                </div>
                <div>
                    <Label htmlFor='minPrice'>Precio mínimo</Label>
                    <TextInput
                        name='minPrice'
                        value={filters.minPrice}
                        onChange={handleChange}
                        type='number'
                    />
                </div>
                <div>
                    <Label htmlFor='maxPrice'>Precio máximo</Label>
                    <TextInput
                        name='maxPrice'
                        value={filters.maxPrice}
                        onChange={handleChange}
                        type='number'
                    />
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

export default CustomerProductPage
