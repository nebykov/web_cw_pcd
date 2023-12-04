import React from 'react'
import { MdFileCopy, MdFolder } from 'react-icons/md'
import sizeFormat from '../../../../../utils/sizeFormat'
import { IFile } from '../../../../../types/types'

interface FileInfoProps {
    count: number,
    file: IFile
}

const ListItemInfo: React.FC<FileInfoProps> = ({ count, file }) => {
    return (
        <>
            <div className="fileName">
                <span>{count}</span>
                {file.type === 'dir' ? <MdFolder /> : <MdFileCopy />}
                <span className="name">{file.name.slice(0, 15) || 'folder'}</span>
            </div>
            <span className={`date ${file.type !== 'dir' && 'dateHover'}`}>{file.date.slice(0, 10)}</span>
            {file.type !== 'dir' && <span className="size">{sizeFormat(file.size)}</span>}
        </>
    )
}

export default ListItemInfo