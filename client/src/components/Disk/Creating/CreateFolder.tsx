import React from 'react'
import useInput from '../../../hooks/useInput'
import { MdCreateNewFolder, MdDoneOutline } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { createDir } from '../../../utils/api/fileApi'
import { addFile } from '../../../store/reducers/fileSlice'
import { hideCreateFolder, showCreateFolder } from '../../../store/reducers/appSlice'
import { motion as m, AnimatePresence } from 'framer-motion'

const CreateFolder = () => {
  const { currentDir } = useAppSelector(state => state.file)
  const { isCreateFolder } = useAppSelector(state => state.app)
  const dispatch = useAppDispatch()
  const folder = useInput('')

  const addDir = () => {
    if (folder.value && currentDir) {
      createDir(folder.value, currentDir).then(data => dispatch(addFile(data)))
      folder.onClear()
      dispatch(hideCreateFolder())
    }
    if (!currentDir) {
      alert('You can`t create new folder here')
      folder.onClear()
    }
  }


  return (
    <div className="diskControl__creating" onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
      <button className="diskControl__btn" onClick={() => dispatch(showCreateFolder())}>
        <MdCreateNewFolder /> New Folder
      </button>
      <AnimatePresence>
        {isCreateFolder &&
          <m.div
            className="creatingForm"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 100 }}
            exit={{ x: -50, opacity: 0 }}
          >
            <input type="text" placeholder='Enter Folder Name' value={folder.value} onChange={folder.onChange} />
            <span className="done" onClick={() => addDir()}>
              <MdDoneOutline />
            </span>
          </m.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default CreateFolder