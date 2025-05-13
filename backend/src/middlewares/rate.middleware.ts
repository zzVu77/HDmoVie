import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

// Interface for strategy validation
interface ValidationStrategy {
  validate(req: Request, res: Response, next: NextFunction): void
}

// Strategy validation for basic rate
class CreateRateValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    movieId: Joi.number().integer().required().messages({
      'number.base': 'Movie ID must be a number',
      'any.required': 'Movie ID is required',
    }),
    score: Joi.number().min(0).max(10).required().messages({
      'number.base': 'Score must be a number',
      'number.min': 'Score must be at least 0',
      'number.max': 'Score must not exceed 10',
      'any.required': 'Score is required',
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

// Higher-order middleware
export const rateValidationMiddleware = (strategy: ValidationStrategy) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    strategy.validate(req, res, next)
  }
}

// Exported middleware instances
export const createRateMiddleware = rateValidationMiddleware(new CreateRateValidationStrategy())
