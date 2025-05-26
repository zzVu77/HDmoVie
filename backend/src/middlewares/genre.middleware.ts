import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

// Interface for strategy validation
interface ValidationStrategy {
  validate(req: Request, res: Response, next: NextFunction): void
}

const baseGenreSchema = {
  id: Joi.string().optional().messages({ 'string.base': 'ID must be a string' }),
  name: Joi.string().trim().required().messages({
    'string.empty': 'Genre cannot be empty',
    'string.min': 'Genre must be at least 1 character',
  }),
}

//Strategy validation for CREATING
class CreateGenreValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    ...baseGenreSchema,
    name: baseGenreSchema.name.required().messages({
      'any.required': 'Genre Name is required',
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
//Strategy validation for UPDATING
class UpdateGenreValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    ...baseGenreSchema,
    // Tất cả các trường đều tùy chọn, không có required()
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
export const genreValidationMiddleware = (strategy: ValidationStrategy) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    strategy.validate(req, res, next)
  }
}

// Export  middlewares
export const createGenreMiddleware = genreValidationMiddleware(new CreateGenreValidationStrategy())
export const updateGenreMiddleware = genreValidationMiddleware(new UpdateGenreValidationStrategy())
