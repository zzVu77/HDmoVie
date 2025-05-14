import { Navigate, useLocation } from 'react-router-dom'
import { jwtDecode, JwtPayload } from 'jwt-decode'

interface MyTokenPayload extends JwtPayload {
  id: string
  email: string
  role: string
}
const PrivateRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) => {
  const accessToken = localStorage.getItem('access-token')
  const location = useLocation()

  if (!accessToken) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />
  }

  try {
    const decoded = jwtDecode<MyTokenPayload>(accessToken)

    // If a specific role is required and doesn't match
    if (requiredRole && decoded.role !== requiredRole) {
      return <Navigate to='/' replace />
    }

    return <>{children}</>
  } catch {
    // Log the error using a custom logging function or handle it silently
    return <Navigate to='/login' replace />
  }
}

export default PrivateRoute
