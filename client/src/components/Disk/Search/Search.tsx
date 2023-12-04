import React from 'react'
import useInput from '../../../hooks/useInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { getFiles, searchFiles } from '../../../utils/api/fileApi'
import { motion as m, AnimatePresence } from 'framer-motion'
import { MdSearch } from 'react-icons/md'
import './search.scss'

const Search = () => {
    const [isSearch, setIsSearch] = React.useState(false)
    const search = useInput('')
    const {sortBy} = useAppSelector(state => state.app)
    const {currentDir} = useAppSelector(state => state.file)
    const dispatch = useAppDispatch()

    React.useEffect(() => {
        let timeoutId: any;

      if (search.value != '') {
        timeoutId = setTimeout(() => {
            dispatch(searchFiles(search.value))
           }, 500)
      } else {
        dispatch(getFiles(currentDir, sortBy))
      }

       return () => clearTimeout(timeoutId)
    }, [search.value])

  return (
    <div className='search'>
        <AnimatePresence>
            {isSearch && <m.input 
            type="text" 
            placeholder='Enter File Name' 
            value={search.value} 
            onChange={search.onChange}
            initial={{x: 30, opacity: 0}}
            animate={{x: 0, opacity: 100}}
            exit={{opacity: 0, x: 30}}
            />}
        </AnimatePresence>
        <MdSearch onClick={() => setIsSearch(prevState => !prevState)}/>
    </div>
  )
}

export default Search