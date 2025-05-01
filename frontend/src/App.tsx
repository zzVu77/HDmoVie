import { BrowserRouter, Route, Routes } from 'react-router'
import About from './pages/About'
import Home from './pages/Home'
import Register from './pages/Register'
import NotFound404 from './pages/NotFound404'
import TestComponent from './pages/TestComponent'
import GenresPage from './pages/Genre'
import Login from './pages/Login'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/register' element={<Register />} />
        <Route path='/test' element={<TestComponent />} />
        <Route path='/genre' element={<GenresPage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
