import { MdOutlineClose } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux';
import { clearUploader, hideUploader } from '../../../store/reducers/uploadSlice';
import { motion as m, AnimatePresence } from 'framer-motion';
import UploaderFile from './UploaderFile';
import './uploader.scss';

const Uploader = () => {
    const { files, isVisble } = useAppSelector(state => state.upload)
    const dispatch = useAppDispatch()

    const handleUploader = () => {
        dispatch(hideUploader())
        dispatch(clearUploader())
    }
    return (
        <AnimatePresence>
              {isVisble &&
                <m.div className='uploader' initial={{x: 100, opacity: 0}} animate={{x: 0, opacity: 100}} exit={{x: 100, opacity: 0}}>
                    <span className="uploader__close" onClick={handleUploader}><MdOutlineClose /></span>
                    {files.map((file) => (
                        <UploaderFile key={file.id} file={file} />
                    ))}
                </m.div>
            }
        </AnimatePresence>
    )
}

export default Uploader