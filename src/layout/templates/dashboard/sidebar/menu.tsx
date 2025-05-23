import { FC } from 'react'
import { Sidebar } from 'flowbite-react'
import { IconType } from 'react-icons'
import { HiOutlineFolder } from 'react-icons/hi'
import { HiOutlineBuildingStorefront } from 'react-icons/hi2'
import { useLocation, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { Reducers } from '../../../../store'
import { Role } from '../../../../store/types/slices'

const listMenu: Record<Role, Menu[]> = {
    [Role.seller]: [
        {
            type: 'page',
            title: 'Productos',
            path: 'vendedor/productos',
            icon: HiOutlineFolder,
        },
    ],
    [Role.customer]: [
        {
            type: 'page',
            title: 'Tienda',
            path: 'cliente/marketplace',
            icon: HiOutlineBuildingStorefront,
        },
    ],
    [Role.admin]: [
        {
            type: 'page',
            title: 'Productos',
            path: 'administrador/productos',
            icon: HiOutlineFolder,
        },
    ],
}

const theme = {
    root: {
        inner: 'h-full overflow-y-auto overflow-x-hidden rounded px-3 pt-2 pb-4 dark:bg-gray-800',
    },
}

type typeMenu = 'dynamicForm' | 'page' | 'inherit'
interface Item {
    type: typeMenu
    title: string
    path: string
}
interface Menu {
    type: typeMenu
    title: string
    path: string
    icon: IconType
    items?: Item[]
}
const Menu: FC = () => {
    const navigate = useNavigate()
    const { role } = useSelector((state: Reducers) => state.userState)
    const { pathname } = useLocation()
    const getItemSidebar = (item: Menu, key: string) => {
        switch (item.type) {
            case 'page':
                return (
                    <li className='' key={key}>
                        <button
                            onClick={() => navigate(`${item.path}`)}
                            aria-labelledby='flowbite-sidebar-item-:rp:'
                            className={`flex items-center justify-center rounded-lg p-2 text-base text-left font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group w-full transition duration-75 ${pathname === `/${item.path}` && 'bg-gray-100'}`}
                        >
                            <item.icon
                                className='h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                                size={24}
                            />
                            <span
                                data-testid='flowbite-sidebar-item-content'
                                id='flowbite-sidebar-item-:rp:'
                                className='flex-1 whitespace-nowrap dark:text-black px-3'
                            >
                                {item.title}
                            </span>
                        </button>
                    </li>
                )
            case 'inherit':
                if (item.items) {
                    return (
                        <Sidebar.Collapse
                            className={`${pathname.includes(item.path) && 'bg-gray-100'}`}
                            icon={item.icon}
                            label={item.title}
                            key={key}
                        >
                            {item.items.map((element, index) => (
                                <li className='' key={`itemMenu${index}`}>
                                    <button
                                        onClick={() => navigate(`${item.path}/${element.path}`)}
                                        aria-labelledby='flowbite-sidebar-item-:rp:'
                                        className={`flex items-center justify-center rounded-lg p-2 text-base text-left font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 group w-full pl-5 transition duration-75 ${pathname === `/${item.path}/${element.path}` && 'bg-gray-100'}`}
                                    >
                                        <span
                                            data-testid='flowbite-sidebar-item-content'
                                            id='flowbite-sidebar-item-:rp:'
                                            className='flex-1 whitespace-nowrap px-3'
                                        >
                                            {element.title}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </Sidebar.Collapse>
                    )
                } else {
                    throw new Error('Hace falta datos')
                }
        }
    }
    return (
        <Sidebar theme={theme} aria-label='Sidebar with multi-level dropdown example'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {listMenu[role] &&
                        listMenu[role].map((item, index) =>
                            getItemSidebar(item, `itemGroup${index}`),
                        )}
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default Menu
