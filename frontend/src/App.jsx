import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './components/Form'
import Response from './components/Response'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path='/response/:id' element={<Response />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
