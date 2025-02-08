import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './components/Form'
import Response from './components/Response'
import Alldata from './components/Alldata'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path='/response/:id' element={<Response />} />
        <Route path='/all-submitted-data' element={<Alldata />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
