import React, { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { FlowchartContainer } from './Flowchart.styled'
import ExcalidrawWindow from '../ExcalidrawWindow/ExcalidrawWindow';
import { downloadAsImage } from '../../utils/DownloadElement';
import { convertMermaidToExcalidraw } from '../../utils/MermaidToExcalidraw';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

const Flowchart = ({ diagramDefinition }) => {
  const svgRef = useRef(null)
  const [toggleExcalidraw, setToggleExcalidraw] = useState(false)
  const [excalidrawDiagram, setExcalidrawDiagram] = useState(null)

  const handleNullDiagram = () => {
    setToggleExcalidraw(false)
  }

  useEffect(() => {
    mermaid.init(undefined, document.querySelectorAll('.mermaid'));
    convertMermaidToExcalidraw(diagramDefinition, 16, setExcalidrawDiagram, toggleExcalidraw, handleNullDiagram)
  }, [])

  const toggleExcalidrawHandler = () => {
    setToggleExcalidraw(excalidrawDiagram == null ? false : !toggleExcalidraw)
  }

  const downloadImageHandler = () => {
    downloadAsImage(svgRef)
  }

    return (
        <FlowchartContainer>
          <button className='excalidraw-toggle-btn' onClick={toggleExcalidrawHandler} type='button'>
            ↺
          </button>
          
          {toggleExcalidraw && <ExcalidrawWindow excalidrawDiagram={excalidrawDiagram} /> }
          
          <div className={`mermaid-wrapper ${toggleExcalidraw ? 'hidden' : ''}`}>
            <TransformWrapper
              smooth={true}
              initialScale={2}
              initialPositionX={-300}
              initialPositionY={-200}
              maxScale={30}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <>
                  <div className={`controls-option-wrapper ${toggleExcalidraw ? "hidden" : ""}`}>
                    <button className='zoom-control-btn' type='button' onClick={() => zoomIn(1)}>+</button>
                    <button className='zoom-control-btn' type='button' onClick={() => zoomOut()}>-</button>
                    <button className='zoom-control-btn' type='button' onClick={() => resetTransform()}>Reset</button>
                  </div>

                  <TransformComponent>
                  <div
                    ref={svgRef}
                    id='mermaid-flowchart'
                    className='mermaid'
                  >
                    {diagramDefinition}
                  </div>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>

            <button className={`download-flowchart-btn ${toggleExcalidraw ? "hidden" : ""}`} onClick={downloadImageHandler} type="button">download</button>
          </div>
        </FlowchartContainer>
    );
  };
  
  export default Flowchart