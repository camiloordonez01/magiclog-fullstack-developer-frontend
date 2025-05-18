import { FC } from 'react'
import { Footer } from 'flowbite-react'

const FooterA: FC = () => {
    return (
        <Footer className='mt-4'>
            <div className='w-full'>
                <div className='w-full px-4 py-6 sm:flex sm:items-center sm:justify-between'>
                    <Footer.Copyright href='#' by='Magiclog™' year={2025} />
                </div>
            </div>
        </Footer>
    )
}

export default FooterA
