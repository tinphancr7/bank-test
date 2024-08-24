import { twMerge } from 'tailwind-merge'
import { useController } from 'react-hook-form'

const MyInput = ({
  control,
  errorMessage,
  className,
  isRequired = false,
  horizontal = false,
  ...props
}) => {
  const { field } = useController({
    name: props.name || '',
    control,
    defaultValue: ''
  })

  return (
    <div className={`${horizontal ? 'items-center gap-1' : 'flex-col'} flex  `}>
      <label
        htmlFor={props.id || props.name}
        className=' mb-2 text-sm  text-black flex items-center gap-1'
      >
        {props.label} {horizontal && <>:</>}
        {isRequired && <span className='text-red-500 font-normal'>*</span>}
      </label>
      <div className='flex-1'>
        <input
          {...field}
          {...props}
          className={twMerge(
            'bg-white rounded-lg  border-gray-300 w-full p-2 text-xs lg:text-sm  font-light border  focus:border-none',
            className
          )}
        />
      </div>

      {errorMessage && (
        <div className='text-sm text-red-500'>{errorMessage}</div>
      )}
    </div>
  )
}

export default MyInput
