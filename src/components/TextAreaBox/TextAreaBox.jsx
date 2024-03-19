import React from 'react'
import { TextAreaBoxContainer } from './TextAreaBox.styled'

const TextAreaBox = ({ placeholder, required, value, setValue }) => {

  return (
    <TextAreaBoxContainer
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={e => setValue(e.target.value)}
    />
  )
}

export default TextAreaBox