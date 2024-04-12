import React, { useRef, useState } from 'react'
import { HomeContainer } from './Home.styled'
import Graph from '../Graph/Graph'
import { parseJson } from '../../utils/Parser'
import { fetchJob, getJobStatus } from '../../utils/FetchData'
import ParseImage from '../../assets/parse.svg'
import UploadImage from '../../assets/download.svg'
import { validate } from '../../utils/OpenAPIValidator'

const Home = () => {
  const defaultError = 'Your dependency graph will be shown here.'
  const [value, setValue] = useState('')
  const [nodes, setNodes] = useState(null)
  const [edges, setEdges] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(defaultError)
  const inputRef = useRef(null)

  const handleOnUploadClick = () => {
    inputRef.current?.click()
  }

  const onFileDrop = (event) => {
    event.preventDefault()

    const file = event.dataTransfer.files[0]
    const reader = new FileReader()

    reader.readAsText(file)
    reader.onload = () => {
        setValue(reader.result)
    }
    reader.onerror = () => {
        setError(reader.error)
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.readAsText(file)
    reader.onload = () => {
        setValue(reader.result)
    }
    reader.onerror = () => {
        setError(reader.error)
    }
  }

  const handleOnParserClick = async () => {
    setNodes(null)
    setEdges(null)
    setError(defaultError)

    if(!value.trim()) {
        setError("Please enter a valid OpenAPI schema. (JSON or YAML)")
        return
    }

    setIsLoading(true)
    
    const validSchema = await validate(value)
    
    if(validSchema.error) {
        setError(validSchema.error)
        setIsLoading(false)
        return
    }

    const jobId = await fetchJob(validSchema, setError)
    if(jobId == null && !error) {
        setError("Something went wrong!")
        setIsLoading(false)
        return
    }
//    const jobId = value
    
    let data = undefined
    let i = 0
    const jobInterval = setInterval(async () => {
        i++
        data = await getJobStatus(jobId, setError)
        
        if(data === 'Invalid schema') {
            setError(data)
            clearInterval(jobInterval)
            setIsLoading(false)
            return
        } else if(data === 'NOT_FOUND') {
            setError(data)
            clearInterval(jobInterval)
            setIsLoading(false)
            return
        }

        if(data && data.dependencyGraph) {
            setError(null)
            clearInterval(jobInterval)
            parseJson(data.dependencyGraph, setNodes, setEdges, setError)
            setIsLoading(false)
            return
        }

        if(i >= 6) {
            setError("Graph Not Found")
            clearInterval(jobInterval)
            setIsLoading(false)
            return
        }
    }, 5000)
  }

  return (
    <HomeContainer>

        <div className='form-container'>
            <div className='input-container'>
                <div className='input-container-title'>
                    OpenAPI
                </div>

                <div className="input-content" onDrop={onFileDrop}>
                    <div className='upload-wrapper'>
                        <button className='upload-button' onClick={handleOnUploadClick}>
                            <input type='file' ref={inputRef} onChange={handleFileUpload} hidden />
                            <img className='upload-img' src={UploadImage} alt="Upload-Button" />
                        </button>
                    </div>
                    <textarea
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        className='openapi-inputbox'
                        placeholder='Enter your OpenAPI schema (JSON or YAML) here.'
                        name="swagger-schema" />
                </div>
            </div>

            <button className={`parse-btn ${isLoading ? 'noClick' : ""}`} onClick={handleOnParserClick}>
                <img className={`${isLoading ? 'isLoading' : ""}`} src={ParseImage} alt="Parse-Button" />
            </button>

            <div className='input-container'>
                <div className='input-container-title'>
                    Dependency Graph
                </div>

                <div id='graph-place' className="input-content">
                    { error ?
                        <textarea className='error-wrapper' value={error} disabled /> :
                            nodes && edges ?
                                <Graph nodes={nodes} edges={edges} /> : 
                                "Your dependency graph will be shown here."
                    }
                </div>
            </div>
        </div>

    </HomeContainer>
  )
}

export default Home
