import React from 'react'
import { MdDelete, MdDownload } from "react-icons/md"

interface ModuleControlProps {
  onDownlod: Function,
  onDelete: Function,
  fileType: string
}

const ModuleControl: React.FC<ModuleControlProps> = ({onDownlod, onDelete, fileType}) => {
  return (
    <div className="moduleControl">
      {fileType !== 'dir' &&  <MdDownload onClick={onDownlod}/>}
      <MdDelete onClick={onDelete}/>
    </div>
  )
}

export default ModuleControl