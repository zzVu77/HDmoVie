import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

// Interface strategy
interface ValidationStrategy {
  validate(req: Request, res: Response, next: NextFunction): void
}

// Strategy cho view notification
class ViewNotificationsValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    userId: Joi.string().required().messages({
      'string.base': 'User ID must be a string',
      'any.required': 'User ID is required',
    }),
  })

  validate(req: Request, res: Response, next: NextFunction): void {
    const { error } = this.schema.validate(req.body, { abortEarly: false })

    if (error) {
      const messages = error.details.map((detail) => detail.message)
      res.status(400).json({ message: messages.join(', ') })
      return
    }

    next()
  }
}

// Middleware creator
export const createValidationMiddleware = (strategy: ValidationStrategy) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    strategy.validate(req, res, next)
  }
}

// Export middleware cụ thể cho view notification
export const viewNotificationsMiddleware = createValidationMiddleware(new ViewNotificationsValidationStrategy())
