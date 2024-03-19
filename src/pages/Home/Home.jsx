import React from 'react'
import { HomeContainer } from './Home.styled'
import ParserForm from '../../components/ParserForm/ParserForm'

const Home = () => {
  return (
    <HomeContainer>
        <div className="heading-wrapper">
            <h1 className='header-txt'>JSON Parser</h1>
            <p>by Akto.io</p>
        </div>

        <ParserForm />
    </HomeContainer>
  )
}

export default Home