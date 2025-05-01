import React from 'react'
import { Navigate } from 'react-router'
interface ProtectedRouteProps {
  isAuthenticated: boolean
  children: React.ReactNode
}
const ProtectedRoute = ({ children, isAuthenticated }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }
  return <>{children}</>
}

export default ProtectedRoute
