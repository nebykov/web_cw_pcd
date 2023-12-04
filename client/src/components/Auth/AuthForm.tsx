import React from 'react'
import Input from '../../utils/input/Input'
import useInput from '../../hooks/useInput'
import { login, registration } from '../../utils/api/userApi'
import { useAppDispatch } from '../../hooks/useRedux'
import { setUser } from '../../store/reducers/userSlice'
import { motion as m } from 'framer-motion'
import './authform.scss'
import ErrorMessage from './ErrorMessage'

interface AuthFormProps {
    title: string,
    buttonTitle: string,
    isLogin?: boolean
}

const AuthForm: React.FC<AuthFormProps> = ({ title, buttonTitle, isLogin }) => {
    const [errors, setErrors] = React.useState([])
    const email = useInput('')
    const password = useInput('')
    const dispatch = useAppDispatch()

    const authHandler = () => {
        if (isLogin) {
            login(email.value, password.value).then((data) => dispatch(setUser(data.user))).catch(e => { console.log(e.response.data); setErrors(e.response.data) })
        } else {
            registration(email.value, password.value).then((data) => dispatch(setUser(data.user)))
        }
    }
    return (
        <m.article
            className='authform'
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
        >
            <m.h3 initial={{y: 10}} animate={{y: 0}}>{title}</m.h3>
            <Input onChange={email.onChange}
                placeholder='Enter your email'
                value={email.value}
                error={errors.length > 0 && true} />
            {errors.length > 0 &&
                <ErrorMessage title={errors[0]} />
            }
            <Input
                onChange={password.onChange}
                placeholder='Enter your password'
                value={password.value} error={errors.length > 0 && true}
                password={true}
            />

            {errors.length > 0 &&
                <ErrorMessage title={errors[1]} />
            }
            <button className='authform__btn' onClick={() => authHandler()}>{buttonTitle}</button>
        </m.article>
    )
}

export default AuthForm