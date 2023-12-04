import { MdViewList, MdViewModule } from 'react-icons/md'
import './changeview.scss'
import { useAppDispatch } from '../../../../hooks/useRedux'
import { setViewMode } from '../../../../store/reducers/appSlice'
import { VIEW_MODE } from '../../../../types/types'

const ChangeView = () => {
  const dispatch = useAppDispatch()
  return (
    <div className='changeView' >
        <MdViewList title='change view' onClick={() => dispatch(setViewMode(VIEW_MODE.LIST))}/>
        <MdViewModule title='change view' onClick={() => dispatch(setViewMode(VIEW_MODE.MODULE))}/>
    </div>
  )
}

export default ChangeView