import { BrowserRouter, Route, Routes } from 'react-router'
import About from './pages/About'
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound404 from './pages/NotFound404'
import TestComponent from './pages/TestComponent'
import BlogPage from './pages/Blog'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/login' element={<Login />} />
        <Route path='/test' element={<TestComponent />} />
        <Route path='/blog' element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
