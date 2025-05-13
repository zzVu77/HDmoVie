import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

// Interface for strategy validation
interface ValidationStrategy {
  validate(req: Request, res: Response, next: NextFunction): void
}

// Base schema for Comment
const baseCommentSchema = {
  content: Joi.string().trim().min(1).required().messages({
    'string.base': 'Content must be a string',
    'string.empty': 'Content cannot be empty',
    'string.min': 'Content must be at least 1 character',
    'any.required': 'Content is required',
  }),
  parentCommentId: Joi.string().uuid().allow(null).optional().messages({
    'string.guid': 'Parent Comment must be a valid UUID',
  }),
}

// Strategy validation for MovieComment
class CreateMovieCommentValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    ...baseCommentSchema,
    movieId: Joi.string().required().messages({
      'string.base': 'Movie ID must be a string',
      'any.required': 'Movie ID is required',
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

// Strategy validation for BlogComment
class CreateBlogCommentValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    ...baseCommentSchema,
    blogId: Joi.number().integer().required().messages({
      'number.base': 'Blog ID must be a number',
      'any.required': 'Blog ID is required',
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
export const commentValidationMiddleware = (strategy: ValidationStrategy) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    strategy.validate(req, res, next)
  }
}

// Exported middleware instances
export const createMovieCommentMiddleware = commentValidationMiddleware(new CreateMovieCommentValidationStrategy())
export const createBlogCommentMiddleware = commentValidationMiddleware(new CreateBlogCommentValidationStrategy())
