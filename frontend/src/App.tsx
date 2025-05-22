import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Movie from './pages/MovieDetail'
import NotFound404 from './pages/NotFound404'
import Explore from './pages/Explore'
import MainLayout from './components/shared/MainLayout'
import Blogs from './pages/Blogs'
import BlogDetail from './pages/BlogDetail'
import Profile from './pages/Profile'
import RegisterForm from './pages/Register'
import TestComponent from './pages/TestComponent'
import Home from './pages/Home'
import PublicRoute from './components/PublicRoute'
import PrivateRoute from './components/PrivateRoute'
import { Toaster } from '@/components/ui/sonner' // hoặc từ "sonner" nếu dùng trực tiếp

function App() {
  return (
    <BrowserRouter>
      <Toaster
        richColors
        position='bottom-right'
        closeButton
        duration={4000} // thời gian toast hiển thị, tính bằng mili-giây
      />
      <Routes>
        {/* Routes with Header */}
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/movie/:id' element={<Movie />} />
          <Route path='/test' element={<TestComponent />} />
          <Route path='/explore' element={<Explore />} />
          <Route
            path='/blog/:id'
            element={
              <PrivateRoute>
                <BlogDetail />
              </PrivateRoute>
            }
          />
          <Route path='/blog' element={<Blogs />} />
          <Route
            path='/profile/'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path='/profile/:id'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path='/test' element={<TestComponent />} />
        </Route>

        {/* Admin route WITHOUT header */}
        <Route
          path='/admin'
          element={
            <PrivateRoute requiredRole='ADMIN'>
              <Admin />
            </PrivateRoute>
          }
        />

        {/* Public routes - only for users not logged in */}
        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/register'
          element={
            <PublicRoute>
              <RegisterForm />
            </PublicRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
