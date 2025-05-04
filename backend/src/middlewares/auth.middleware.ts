// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { AuthService } from '~/services/auth.service'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { AppDataSource } from '~/data-source'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret'

// Khởi tạo dependencies
const registeredUserRepository = new RegisteredUserRepository(AppDataSource)
const authService = new AuthService(registeredUserRepository)

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    let accessToken = token || ''

    if (!accessToken) {
      const refreshToken = req.cookies.refreshToken
      if (!refreshToken) {
        res.status(401).json({ message: 'No refresh token provided' })
        return
      }

      accessToken = await authService.refreshAccessToken(refreshToken)
      if (!accessToken) {
        res.status(403).json({ message: 'Invalid access token' })
        return
      }

      req.headers['authorization'] = `Bearer ${accessToken}`
    }

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.status(403).json({ message: 'Invalid or expired token' })
        return
      }

      res.locals.user = user
      next()
    })
  } catch (error) {
    console.error('Authentication error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
