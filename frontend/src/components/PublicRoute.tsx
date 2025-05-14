// src/components/route/PublicRoute.tsx
import { Navigate } from 'react-router-dom'
import { jwtDecode, JwtPayload } from 'jwt-decode'

interface MyTokenPayload extends JwtPayload {
  id: string
  email: string
  role: string
}
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const accessToken = localStorage.getItem('access-token')

  if (accessToken) {
    try {
      const decoded = jwtDecode<MyTokenPayload>(accessToken)

      // Redirect based on role
      if (decoded.role === 'ADMIN') {
        return <Navigate to='/admin' replace />
      }
      return <Navigate to='/' replace />
    } catch {
      // Token is invalid
      localStorage.removeItem('access-token')
    }
  }

  return <>{children}</>
}

export default PublicRoute
