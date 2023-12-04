import React, { useRef } from 'react'
import { setAvatar } from '../../../utils/api/fileApi'
import { useAppDispatch } from '../../../hooks/useRedux'

const ChangeAvatar = () => {
  const ref = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const dispatch = useAppDispatch()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          const file = e.target.files[0]
          dispatch(setAvatar(file, setIsLoading))
        }
    }

  return (
    <div className='changeAvatar' onClick={() => ref?.current?.click()}>
     <input
     type='file' 
     ref={ref}
     onChange={onChange}
     accept='image/*'
     />
     <li>
      <>
       {!isLoading ? 
        'Add YouFile'
       :
       'Just a second...'
       }
     </>
     </li>
    </div>
  )
}

export default ChangeAvatar