import { FC } from 'react'
import { Modal, Button } from 'flowbite-react'

interface DeleteProductModalProps {
    show: boolean
    onClose: () => void
    onConfirm: () => void
    productName: string
}

const DeleteProductModal: FC<DeleteProductModalProps> = ({
    show,
    onClose,
    onConfirm,
    productName,
}) => {
    return (
        <Modal show={show} size='md' popup onClose={onClose}>
            <Modal.Header />
            <Modal.Body>
                <div className='text-center'>
                    <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                        ¿Estás seguro que deseas eliminar <strong>{productName}</strong>?
                    </h3>
                    <div className='flex justify-center gap-4'>
                        <Button color='failure' onClick={onConfirm}>
                            Sí, eliminar
                        </Button>
                        <Button color='gray' onClick={onClose}>
                            Cancelar
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteProductModal
