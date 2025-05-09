import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Login from './pages/Login'
import Movie from './pages/MovieDetail'
import NotFound404 from './pages/NotFound404'
import TestComponent from './pages/TestComponent'
import Explore from './pages/Explore'
import MainLayout from './components/shared/MainLayout'
import Blogs from './pages/Blogs'
import BlogDetail from './pages/BlogDetail'
import Profile from './pages/Profile'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes with Header */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/movie/:id' element={<Movie />} />
          <Route path='/test' element={<TestComponent />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/login' element={<Login />} />
          <Route path='/blog/:id' element={<BlogDetail />} />
          <Route path='/blog' element={<Blogs />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Route>

        {/* Admin route WITHOUT header */}
        <Route path='/admin' element={<Admin />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
