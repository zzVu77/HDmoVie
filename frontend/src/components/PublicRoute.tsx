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
  // // Permission
  if (accessToken) {
    const decodedToken = jwtDecode<MyTokenPayload>(accessToken)
    if (decodedToken.role == 'ADMIN') {
      return <Navigate to='/admin' replace />
    }
    return <Navigate to='/' replace />
  }
  return <>{children}</>
}

export default PublicRoute
