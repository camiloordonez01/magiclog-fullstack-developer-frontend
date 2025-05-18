import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useSelector } from 'react-redux'

import router from './routes'
import { Reducers } from './store'
import ToastNotification from './components/toastNotification'

const App: FC = () => {
    const { notifications } = useSelector((state: Reducers) => state.appState)
    return (
        <div className='App'>
            <RouterProvider router={router} />
            <div className='absolute right-5 bottom-5'>
                {notifications.map((notification, index) => (
                    <ToastNotification key={`toastNotification${index}`} {...notification} />
                ))}
            </div>
        </div>
    )
}

export default App
