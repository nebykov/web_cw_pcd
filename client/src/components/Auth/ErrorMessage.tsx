import React from 'react'
import { motion as m } from 'framer-motion'

interface ErrorMessageProps {
    title: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({title}) => {
  return (
    <m.span className='authform__error' initial={{y: -10}} animate={{y: 0}}>{title}</m.span>
  )
}

export default ErrorMessage