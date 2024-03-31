import React from 'react'
import './App.css'
import Home from './components/Home/Home'

const App = () => {
  return (
    <>
      <div className='header-wrapper'>
        <h1 className='header'><span>OpenAPI</span> <br className='separator'/>to<br className='separator'/> Dependency Graph</h1>
      </div>

      <Home />
    </>
  )
}

export default App