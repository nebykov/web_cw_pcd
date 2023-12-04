import React from 'react'
import { IFile, VIEW_MODE } from '../../../../types/types'
import { MdDelete, MdDownload } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../../../hooks/useRedux'
import { deleteFile, downloadFile } from '../../../../utils/api/fileApi'
import { deleteFileAction } from '../../../../store/reducers/fileSlice'
import './modulecontrol.scss'
import ModuleControl from '../ModuleView/ModuleItem/ModuleControl'


interface FileControlProps {
    file: IFile
}

const FileControl: React.FC<FileControlProps> = ({ file }) => {
    const { viewMode } = useAppSelector(state => state.app)
    const [buttonLoading, setButtonLoading] = React.useState(false)
    const dispatch = useAppDispatch()

    const onDownlod = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        e.preventDefault()
        setButtonLoading(true)
        downloadFile(file).then(() => setButtonLoading(false))
    }

    const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        e.preventDefault()
        deleteFile(file).then(data => dispatch(deleteFileAction(data.id))).catch(e => alert(e))
    }
    return (
        <>
            {viewMode === VIEW_MODE.LIST ?
                <>
                    {file.type !== 'dir' && <button className='fileItem__btn fileItem__download' onClick={onDownlod}>
                        {!buttonLoading ? <>Donload <MdDownload /></> : 'Loading...'}
                    </button>}
                    <button className="fileItem__btn fileItem__delete" onClick={onDelete}>Delete <MdDelete /></button>
                </> :
                <>
                    <ModuleControl onDownlod={onDownlod} onDelete={onDelete} fileType={file.type}/>
                </>
            }
        </>
    )
}

export default FileControl