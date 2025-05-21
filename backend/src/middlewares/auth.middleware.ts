// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express'
import jwt, { TokenExpiredError } from 'jsonwebtoken'
import { AuthService } from '~/services/auth.service'
import { RegisteredUserRepository } from '~/repositories/registeredUser.repository'
import { AppDataSource } from '~/data-source'
import { JwtPayload } from 'jsonwebtoken'

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string

if (!ACCESS_TOKEN_SECRET) {
  throw new Error('JWT secrets are not defined in environment variables')
}
// Khởi tạo dependencies
const registeredUserRepository = new RegisteredUserRepository(AppDataSource)
const authService = new AuthService(registeredUserRepository)

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const accessToken = req.headers['authorization']?.split(' ')[1]
  const refreshToken = req.cookies.refreshToken

  try {
    if (!accessToken && !refreshToken) {
      res.status(401).json({ message: 'No token provided' })
      return
    }

    if (accessToken) {
      try {
        const user = jwt.verify(accessToken, ACCESS_TOKEN_SECRET)
        res.locals.user = user
        return next()
      } catch (err) {
        // Nếu token hết hạn, sẽ tiếp tục xử lý phía dưới
        if (!(err instanceof TokenExpiredError)) {
          res.status(403).json({ message: 'Invalid access token' })
          return
        }
      }
    }

    // Access token không còn hoặc đã hết hạn, thử cấp lại bằng refresh token
    if (refreshToken) {
      const newAccessToken = await authService.refreshAccessToken(refreshToken)

      if (!newAccessToken) {
        res.status(403).json({ message: 'Invalid refresh token' })
        return
      }

      try {
        const user = jwt.verify(newAccessToken, ACCESS_TOKEN_SECRET)
        res.locals.user = user
        console.log(newAccessToken)

        // Gửi token mới về client để lưu trữ (tuỳ frontend xử lý)
        res.setHeader('Access-Control-Expose-Headers', 'x-access-token')
        res.setHeader('x-access-token', newAccessToken)

        return next()
      } catch {
        res.status(403).json({ message: 'Invalid token after refresh' })
        return
      }
    }

    res.status(403).json({ message: 'Authentication failed' })
  } catch (error) {
    console.error('Authentication error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

// Middleware to check for Admin role
export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (res.locals.user && res.locals.user.role === 'ADMIN') {
    next()
  } else {
    res.status(403).json({ message: 'Access denied: Admin role required' })
  }
}

// Middleware để xác thực token nhưng không bắt buộc
export const optionalAuthenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const accessToken = req.headers['authorization']?.split(' ')[1]
  const refreshToken = req.cookies.refreshToken

  try {
    if (!accessToken && !refreshToken) {
      // Không có token → tiếp tục như guest
      return next()
    }

    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as JwtPayload
        const user = await registeredUserRepository.findOne(decoded.id)
        if (user) {
          res.locals.user = user
        }
        return next()
      } catch (err) {
        if (!(err instanceof TokenExpiredError)) {
          // Token không hợp lệ nhưng không chặn
          return next()
        }
      }
    }

    // Access token hết hạn hoặc không có, thử refresh
    if (refreshToken) {
      const newAccessToken = await authService.refreshAccessToken(refreshToken)

      if (!newAccessToken) {
        return next() // Không lấy được token mới → tiếp tục như guest
      }

      try {
        const decoded = jwt.verify(newAccessToken, ACCESS_TOKEN_SECRET) as JwtPayload
        const user = await registeredUserRepository.findOne(decoded.id)
        if (user) {
          res.locals.user = user

          // Gửi token mới về cho client (nếu frontend cần lưu lại)
          res.setHeader('Access-Control-Expose-Headers', 'x-access-token')
          res.setHeader('x-access-token', newAccessToken)
        }
        return next()
      } catch {
        return next()
      }
    }

    return next()
  } catch (error) {
    console.error('Optional authentication error:', error)
    return next()
  }
}
