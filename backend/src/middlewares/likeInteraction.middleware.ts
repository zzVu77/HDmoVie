import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

// Interface strategy
interface ValidationStrategy {
  validate(req: Request, res: Response, next: NextFunction): void
}

// Base schema
const baseLikeInteractionSchema = {
  blogId: Joi.string().required().messages({
    'string.base': 'blog ID must be a string',
    'any.required': 'blog ID is required',
  }),
}

// Strategy dùng chung cho Like/Unlike
class LikeOrUnlikeValidationStrategy implements ValidationStrategy {
  private schema = Joi.object(baseLikeInteractionSchema)

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

// Middleware áp dụng strategy
export const likeValidationMiddleware = (strategy: ValidationStrategy) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    strategy.validate(req, res, next)
  }
}

// Export middleware dùng chung
export const likeOrUnlikeMiddleware = likeValidationMiddleware(new LikeOrUnlikeValidationStrategy())
