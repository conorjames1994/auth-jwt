import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import { Login } from './components/Login'
import { Protected } from './components/Protected'
import { Register } from './components/Register'

function App() {
  

  return (
    <div>
      <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login/>}/>
      <Route path="/protected" element={<Protected/>}/>
      <Route path='/register' element={<Register/>}/>
      </Routes>
    
      </BrowserRouter>
    </div>
     
  )
}

export default App
