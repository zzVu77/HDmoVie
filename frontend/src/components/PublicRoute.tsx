// src/components/route/PublicRoute.tsx
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const accessToken = localStorage.getItem('access-token')

  // Nếu đã login thì chuyển hướng về trang chủ
  if (accessToken) {
    return <Navigate to='/' replace />
  }

  return <>{children}</>
}

export default PublicRoute
