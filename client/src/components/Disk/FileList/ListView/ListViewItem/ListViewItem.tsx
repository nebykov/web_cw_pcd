import React from "react";
import { motion as m } from "framer-motion";
import './file.scss'
import { IFile } from "../../../../../types/types";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/useRedux";
import { pushToStack, setCurrentDir, setFolderName } from "../../../../../store/reducers/fileSlice";
import FileControl from "../../FileControl/FileControl";
import ListItemInfo from "./ListViewIInfo";

interface ListViewItemProps {
  file: IFile,
  count: number
}

const ListViewItem: React.FC<ListViewItemProps> = ({ file, count }) => {
  const { currentDir } = useAppSelector(state => state.file)
  const dispatch = useAppDispatch()

  const setDir = () => {
    dispatch(setCurrentDir(file.id))
    dispatch(setFolderName(file.name))
    dispatch(pushToStack(currentDir))
  }


  return (
      <m.div className="fileItem"
        onClick={file.type === 'dir' ? () => setDir() : () => { }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 100, y: 0 }}
        whileHover={{ scale: 1.01 }}
      >
        <ListItemInfo count={count} file={file}/>
        <FileControl file={file} />
      </m.div>
  )
}

export default ListViewItem