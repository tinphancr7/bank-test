import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader
} from '@nextui-org/react'
import { ReactNode, useState } from 'react'
import { MdOutlineArrowRightAlt } from 'react-icons/md'

interface Props {
  children: ReactNode
  width?: 'full' | '80-screen' | '40-screen' | string
  title?: string
}

const NextDrawer = ({ children, width = '40-screen', title }: Props) => {
  const widthDrawer =
    width === 'full'
      ? 'max-w-[100%]'
      : width === '80-screen'
      ? 'max-w-[80%]'
      : width === '40-screen'
      ? 'max-w-[40%]'
      : width
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        backdrop='opaque'
        motionProps={{
          initial: { x: '100%' },
          animate: { x: '0%' },
          exit: { x: '100%' },
          transition: { duration: 0.3 }
        }}
        classNames={{
          wrapper: 'w-full overflow-hidden !justify-end',
          base: `max-h-[100vh] !shadow-card-project min-w-[30%] v-max ${widthDrawer} h-full !my-0 !mr-0 rounded-none border-l-1 border-default-300`,
          header: 'justify-end border-b-1 border-default-200',
          body: 'overflow-y-auto rounded-tr-none !rounded-none p-0',
          closeButton: 'right-5 z-10 text-lg'
        }}
        hideCloseButton
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex items-center justify-between gap-1'>
                <p>{title}</p>
                <div className='flex justify-end'>
                  <MdOutlineArrowRightAlt
                    size={24}
                    className='text-grayNormal cursor-pointer'
                    onClick={onClose}
                  />
                </div>
              </ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default NextDrawer
