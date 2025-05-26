import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

// Interface for strategy validation
interface ValidationStrategy {
  validate(req: Request, res: Response, next: NextFunction): void
}

// Strategy validation for basic rate
class CreateRateValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    score: Joi.number().min(0).max(10).required().messages({
      'number.base': 'Score must be a number',
      'number.min': 'Score must be at least 0',
      'number.max': 'Score must not exceed 10',
      'any.required': 'Score is required',
    }),
  })

  validate(req: Request, res: Response, next: NextFunction): void {
    // Validate movieId from params
    if (!req.params.movieId) {
      res.status(400).json({ message: 'Movie ID is required in URL parameters' })
      return
    }

    const { error } = this.schema.validate(req.body, { abortEarly: false })
    if (error) {
      const messages = error.details.map((detail) => detail.message)
      res.status(400).json({ message: messages.join(', ') })
      return
    }
    next()
  }
}

// Strategy validation for rate with comment
class CreateRateWithCommentValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    score: Joi.number().min(0).max(10).required().messages({
      'number.base': 'Score must be a number',
      'number.min': 'Score must be at least 0',
      'number.max': 'Score must not exceed 10',
      'any.required': 'Score is required',
    }),
    content: Joi.string().trim().min(1).required().messages({
      'string.base': 'Content must be a string',
      'string.empty': 'Content cannot be empty',
      'string.min': 'Content must be at least 1 character',
      'any.required': 'Content is required',
    }),
  })

  validate(req: Request, res: Response, next: NextFunction): void {
    // Validate movieId from params
    if (!req.params.movieId) {
      res.status(400).json({ message: 'Movie ID is required in URL parameters' })
      return
    }

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
export const createRateWithCommentMiddleware = rateValidationMiddleware(new CreateRateWithCommentValidationStrategy())
