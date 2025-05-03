import { BrowserRouter, Route, Routes } from 'react-router'
import About from './pages/About'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Login from './pages/Login'
import Movie from './pages/Movie'
import NotFound404 from './pages/NotFound404'
import TestComponent from './pages/TestComponent'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/movie' element={<Movie />} />
        <Route path='/test' element={<TestComponent />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
