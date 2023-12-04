import { useAppSelector } from "../../../../hooks/useRedux"
import { motion as m } from "framer-motion"
import './filelist.scss'
import ListViewItem from "./ListViewItem/ListViewItem"


const FileList = () => {
  const {files} = useAppSelector(state => state.file)
  return (
    <div className="fileList">
      <m.div
      className="fileList__header"
      initial={{opacity: 0}}
      animate={{opacity: 100}}
      >
        <span>#</span>
        <span className="name">file name</span>
        <span className="date">date</span>
        <span className="size">size</span>
      </m.div>
        {files &&
         files.map((file, id) => (
          <ListViewItem key={file.id} file={file} count={id+1}/>
         ))
        }
    </div>
  )
}

export default FileList