import React from 'react'
import Home from './pages/Home/Home'

import './App.css'
import mermaid from 'mermaid'

const App = () => {

  mermaid.initialize({
    startOnLoad: true,
    theme: 'forest',
  })

  return (
    <Home />
  )
}

export default App