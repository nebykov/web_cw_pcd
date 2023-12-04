import { useAppSelector } from '../../../../hooks/useRedux'
import ModuleItem from './ModuleItem/ModuleItem'
import './fileModule.scss'

const FileModule = () => {
    const { files } = useAppSelector(state => state.file)

    return (
        <div className='fileModule'>
            {files &&
                files.map((file) => (
                    <ModuleItem file={file} key={file.id}/>
                ))
            }
        </div>
    )
}

export default FileModule