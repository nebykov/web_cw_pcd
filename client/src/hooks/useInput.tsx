import React from 'react'


const useInput = (initialValue: string) => {
  const [value, setValue] = React.useState(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onClear = () => {
         setValue('')
  }
  return {
    value, 
    onChange,
    onClear
  }
}

export default useInput