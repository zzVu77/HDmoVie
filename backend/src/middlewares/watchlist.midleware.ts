import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

// Interface for strategy validation
interface ValidationStrategy {
  validate(req: Request, res: Response, next: NextFunction): void
}

const baseWatchlistSchema = {
  title: Joi.string(),
  description: Joi.string(),
  isPublic: Joi.boolean(),
  ownerId: Joi.string(),
}

//CREATING
class CreateWatchlistValidationStrategy implements ValidationStrategy {
  // Override schema for this strategy
  private schema = Joi.object({
    ...baseWatchlistSchema,

    // title is required and not empty
    title: baseWatchlistSchema.title.trim().required().messages({
      'string.empty': 'Title cannot be empty',
      'any.required': 'Title is required',
    }),

    // Allow empty string for description
    description: baseWatchlistSchema.description.allow('').optional(),

    isPublic: baseWatchlistSchema.isPublic.required().messages({
      'any.required': 'Privacy is required',
    }),

    // Make sure ownerId is required
    ownerId: baseWatchlistSchema.ownerId.required().messages({
      'any.required': 'Owner ID is required',
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

class UpdateWatchlistValidationStrategy implements ValidationStrategy {
  // Override schema for this strategy
  private schema = Joi.object({
    ...baseWatchlistSchema,

    //  title is required and not empty
    title: baseWatchlistSchema.title.trim().required().messages({
      'string.empty': 'Title cannot be empty',
      'any.required': 'Title is required',
    }),

    // Allow empty string for description
    description: baseWatchlistSchema.description.allow('').optional(),

    isPublic: baseWatchlistSchema.isPublic.required().messages({
      'any.required': 'Privacy is required',
    }),

    // Make sure ownerId is required
    ownerId: Joi.forbidden().messages({
      'any.unknown': 'Cannot modify the owner of a watchlist',
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

export const watchlistValidationMiddleware = (strategy: ValidationStrategy) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    strategy.validate(req, res, next)
  }
}

// Export
export const createWatchlistMiddleware = watchlistValidationMiddleware(new CreateWatchlistValidationStrategy())
export const updateWatchlistMiddleware = watchlistValidationMiddleware(new UpdateWatchlistValidationStrategy())
