import React from 'react'
import { MdOutlineFileUpload } from 'react-icons/md'
import { uploadFile } from '../../../utils/api/fileApi'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'


const FileUpload = () => {
  const {currentDir} = useAppSelector(state => state.file)
  const dispatch = useAppDispatch()
  const ref = React.useRef<HTMLInputElement>(null)


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadFiles = Array.from(e.target.files);
      uploadFiles.map(file => {
        dispatch(uploadFile(file, currentDir))
      })
    }
  }

  return (
    <div onClick={() => ref.current?.click()}>
      <input type="file" ref={ref} style={{ display: 'none' }} onChange={onChange} multiple={true}/>
        <button className='diskControl__btn'><MdOutlineFileUpload /> Add your File</button>
    </div>
  )
}

export default FileUpload