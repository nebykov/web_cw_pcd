import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { logOut } from '../../../store/reducers/userSlice'
import { motion as m, AnimatePresence } from 'framer-motion'
import './userblock.scss'
import useImage from '../../../hooks/useImage'
import ChangeAvatar from './ChangeAvatar'

const UserBlock = () => {
    const [visibleDropdown, setVisibleDropdown] = React.useState(false)
    const { user } = useAppSelector(state => state.user)
    const image = user && useImage({userId: user?.id, initialImage: user?.avatar})
    console.log(user?.avatar)
    const dispatch = useAppDispatch()
    return (
        <div className="userSection">
            <img src={image?.imgSrc} onError={image?.onError} alt="avatar" onClick={() => setVisibleDropdown(prevState => !prevState)} />
            <AnimatePresence>
                {visibleDropdown &&
                    <m.ul className="dropdown-content"
                        initial={{ x: -120, opacity: 0 }}
                        animate={{ x: -80, opacity: 100 }}
                        exit={{ x: -60, opacity: 0 }}
                    >
                        <li className='userTitle'>{user?.email}</li>
                        <ChangeAvatar/>
                        <li onClick={() => dispatch(logOut())}>Log Out</li>
                    </m.ul>
                }
            </AnimatePresence>
        </div>
    )
}

export default UserBlock