import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const accessToken = localStorage.getItem('access-token')
  const location = useLocation()

  // If user is not logged in, redirect to login with return path
  if (!accessToken) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />
  }

  // If user is logged in, show the protected content
  return <>{children}</>
}

export default PrivateRoute
