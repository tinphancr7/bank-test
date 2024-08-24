import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react'

const CustomModal = ({
  title,
  children,
  isOpen,
  onOpenChange,
  onSubmit,
  size
}) => {
  return (
    <Modal
      scrollBehavior={'inside'}
      backdrop='opaque'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={size || '5xl'}
      placement='top-center'
      classNames={{
        wrapper: '!items-center',
        body: 'py-6 bg-white  ',
        backdrop: 'bg-[#292f46]/50 backdrop-opacity-40',
        base: 'border-gray-200 bg-white dark:bg-[#19172c] text-black ',
        header: 'border-b-[1px] border-gray-200 bg-white rounded-t-xl',
        footer: 'border-t-[1px] border-gray-200 bg-white rounded-b-xl',
        closeButton: 'hover:bg-gray-500/5 active:bg-white/10'
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut'
            }
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: 'easeIn'
            }
          }
        }
      }}
    >
      <form onSubmit={onSubmit}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1 uppercase'>
                {title}
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button className='bg-blue-600 text-white' type='submit'>
                  Xác nhận
                </Button>
                <Button color='danger' onPress={onClose}>
                  Hủy
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  )
}

export default CustomModal
