import { MdOutlineSubdirectoryArrowLeft } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { popFromStack, setCurrentDir } from '../../../store/reducers/fileSlice'
import CreateFolder from '../Creating/CreateFolder'
import FileUpload from '../Creating/FileUpload'
import { SORT_BY } from '../../../types/types'
import { setSortBy } from '../../../store/reducers/appSlice'
import Search from '../Search/Search'
import './diskControl.scss'
import ChangeView from './ChangeView/ChangeView'

const DiskControl = () => {
  const { stack } = useAppSelector(state => state.file)
  const dispatch = useAppDispatch()

  const backDir = () => {
    if (stack.length > 0) {
      const dirPop = String(stack.slice(-1))
      dispatch(setCurrentDir(dirPop))
      dispatch(popFromStack())
    }
  }
  return (
    <article className="diskControl">
      <div className="diskControl__header">
      <MdOutlineSubdirectoryArrowLeft className={`arrow ${stack.length <= 0 ? 'disable' : ''}`} onClick={() => backDir()} />
      <ChangeView/>
      </div>
      <div className="createPanel">
        <CreateFolder />
        <span className='createPanel__nav'>
        <Search/>
          <select className='sort' onChange={(e) => dispatch(setSortBy(e.target.value))}>
            <option value={SORT_BY.TYPE}>type</option>
            <option value={SORT_BY.NAME}>name</option>
            <option value={SORT_BY.SIZE}>size</option>
          </select>
          <FileUpload />
        </span>
      </div>
    </article>
  )
}

export default DiskControl