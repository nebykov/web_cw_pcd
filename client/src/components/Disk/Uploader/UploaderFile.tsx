import React from 'react'
import { motion as m } from 'framer-motion'
import { IUploadFile } from '../../../types/types'


interface UploaderFileProps {
    file: IUploadFile
}

const UploaderFile: React.FC<UploaderFileProps> = ({file}) => {
    return (
        <m.div
        className='uploader__file'
        initial={{x: 100, opacity: 0}}
        animate={{x: 0, opacity: 100}}
        >
            <div className='fileDescription'>
            <span className='name'>{file.name.substring(0, 10)}</span>
            <span>{file.progress}%</span>
            </div>
            <div className="progress-bar">
                <m.div
                    className="progress-bar__fill"
                    initial={{ width: '0%' }}
                    animate={{ width: `${file.progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </m.div>
    )
}

export default UploaderFile