import { Outlet } from 'react-router-dom'
import Header from '../Header'
import { Footer } from '../Footer'
const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer></Footer>
    </>
  )
}

export default MainLayout
