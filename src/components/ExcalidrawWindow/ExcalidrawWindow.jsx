import React from 'react'
import { Excalidraw } from '@excalidraw/excalidraw'
import { ExcalidrawWindowContainer } from './ExcalidrawWindow.styled'

const ExcalidrawWindow = ({ excalidrawDiagram }) => {
  return (
    <ExcalidrawWindowContainer>
        <Excalidraw
            initialData={{
            elements: excalidrawDiagram,
            appState: { zenModeEnabled: true, viewBackgroundColor: "#a5d8ff" },
            scrollToContent: true
            }}
        />
    </ExcalidrawWindowContainer>
  )
}

export default ExcalidrawWindow