import React from 'react'
import { MdFileCopy, MdFolder } from 'react-icons/md'
import { motion as m } from 'framer-motion'
import { IFile } from '../../../../../types/types'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/useRedux'
import { pushToStack, setCurrentDir, setFolderName } from '../../../../../store/reducers/fileSlice'
import FileControl from '../../FileControl/FileControl'

interface ModuleItemProps {
    file: IFile
}

const ModuleItem: React.FC<ModuleItemProps> = ({file}) => {
  const { currentDir } = useAppSelector(state => state.file)
  const dispatch = useAppDispatch()

  const setDir = () => {
    dispatch(setCurrentDir(file.id))
    dispatch(setFolderName(file.name))
    dispatch(pushToStack(currentDir))
  }
  return (
    <m.article
    className='fileModule__item'
    onClick={file.type === 'dir' ? () => setDir() : () => { }}
    initial={{x:-10, opacity: 0}}
    animate={{x: 0, opacity: 100}}
    >
      <div className='fileModule__item__control'>
      {file.type === 'dir' ? <MdFolder /> : <MdFileCopy />}
      <FileControl file={file}/>
      </div>
      <span>{file.name.substring(0, 8)}</span>
      </m.article>
  )
}

export default ModuleItem