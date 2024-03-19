import React from 'react'
import { FormButtonContainer } from './FormButton.styled'
import { ClipLoader } from 'react-spinners'

const FormButton = ({ isLoading }) => {
  return (
    <FormButtonContainer>
      <button type="submit">
        Parse

        <ClipLoader loading={isLoading} color='#ffffff' size={16} />
      </button>
    </FormButtonContainer>
  )
}

export default FormButton