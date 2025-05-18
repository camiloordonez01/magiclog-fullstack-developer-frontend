import { FC, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Breadcrumb } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'

import { mathRoute } from '../../../routes'

interface Items {
    type: 'link' | 'text'
    href?: string
    title: string
}
const BreadcrumbBody: FC = () => {
    const { pathname } = useLocation()
    const [items, setItems] = useState<Items[]>([])
    useEffect(() => {
        const data = pathname.split('/')
        data.shift()

        let link = ''
        const newItems: Items[] = data.map((item) => {
            const isExists = mathRoute(`${link}/${item}`)
            link += `/${item}`
            return {
                type: isExists ? 'link' : 'text',
                href: link,
                title: item.replace(/^\w/, (c) => c.toUpperCase()),
            }
        })

        setItems(newItems)
    }, [pathname])
    return (
        <div id='breadCrumb' className='mb-4 col-span-full xl:mb-2 max-w-10'>
            <Breadcrumb className='mb:mb-5'>
                <Breadcrumb.Item href='/' icon={HiHome}>
                    Inicio
                </Breadcrumb.Item>
                {items.map((item, index) =>
                    item.type === 'link' ? (
                        <Breadcrumb.Item key={`itemBreadcrumb${index}`} href={item.href}>
                            {item.title}
                        </Breadcrumb.Item>
                    ) : (
                        <Breadcrumb.Item key={`itemBreadcrumb${index}`}>
                            {item.title}
                        </Breadcrumb.Item>
                    ),
                )}
            </Breadcrumb>
        </div>
    )
}

export default BreadcrumbBody
