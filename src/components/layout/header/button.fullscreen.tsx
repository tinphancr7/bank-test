import { Button } from '@nextui-org/react'
import { GoScreenFull } from 'react-icons/go'

const ButtonFullscreen = () => {

  const handleToggleFullscreen = () => {
    const element = document.documentElement
    element.requestFullscreen()
  }
  return (
    <Button
      isIconOnly
      className='size-[42px] flex items-center justify-center bg-transparent hover:bg-[#f3f3f9] rounded-full'
      onPress={() => handleToggleFullscreen()}
    >
      <GoScreenFull className='text-2xl' />
    </Button>
  )
}

export default ButtonFullscreen
