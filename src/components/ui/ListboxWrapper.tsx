import { ReactNode } from 'react'

const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  <div className='border-small rounded-small border-default-200 dark:border-default-100'>
    {children}
  </div>
)

export default ListboxWrapper
