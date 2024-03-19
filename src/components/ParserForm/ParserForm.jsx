import React, { useEffect, useState } from 'react'
import { ParserFormContainer } from './ParserForm.styled'
import TextAreaBox from '../TextAreaBox/TextAreaBox'
import FormButton from '../FormButton/FormButton'
import Flowchart from '../Flowchart/Flowchart'
import { parseJsonToMermaid } from '../../utils/JsonParser'
import { fetchDependencyGraphNodes } from '../../utils/FetchDependencyGraphNodes'

const ParserForm = () => {
  const [swaggerSchema, setSwaggerSchema] = useState('')
  const [jsonResult, setJsonResult] = useState(null)
  const [flowchart, setFlowchart] = useState('')
  const [canShow, setCanShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const formHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true)
    const graphNodeData = await fetchDependencyGraphNodes(swaggerSchema)

    try {
        const json = JSON.parse(graphNodeData.swaggerJson)
        setJsonResult(json)
        setCanShow(false)
    } catch (error) {
        setIsLoading(false)
        setCanShow(false)
        setSwaggerSchema(error.message)
        setJsonResult(null)
    }
  }

  useEffect(() => {
    if(!jsonResult || !jsonResult.length) return
    
    const diagramDefinition = parseJsonToMermaid(jsonResult)
    setFlowchart(diagramDefinition)
    setCanShow(true)
    setIsLoading(false)
  }, [jsonResult])

  return (
    <ParserFormContainer>
        <form onSubmit={formHandler}>
            <TextAreaBox
                placeholder='Please enter the Swagger schema here...'
                required={true}
                value={swaggerSchema}
                setValue={setSwaggerSchema}
            />
            
            <FormButton isLoading={isLoading} />

            {canShow ? <Flowchart diagramDefinition={flowchart} /> : <div className='error-wrapper'>Please enter a valid JSON schema.</div>}
        </form>
    </ParserFormContainer>
  )
}

export default ParserForm