import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

// Interface for strategy validation
interface ValidationStrategy {
  validate(req: Request, res: Response, next: NextFunction): void
}

const baseCastSchema = {
  id: Joi.string().optional().messages({ 'string.base': 'ID must be a string' }),
  name: Joi.string().trim().required().messages({
    'string.empty': 'Cast cannot be empty',
    'string.min': 'Cast must be at least 1 character',
  }),
  profilePath: Joi.string().trim().required().messages({
    'string.empty': 'Cast cannot be empty',
    'string.min': 'Cast must be at least 1 character',
  }),
}

//Strategy validation for CREATING
class CreateCastValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    ...baseCastSchema,
    name: baseCastSchema.name.required().messages({
      'any.required': 'Genre Name is required',
    }),
    profilePath: baseCastSchema.name.required().messages({
      'any.required': 'Profile Path is required',
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
class UpdateCastValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    ...baseCastSchema,
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
export const castValidationMiddleware = (strategy: ValidationStrategy) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    strategy.validate(req, res, next)
  }
}

// Export  middlewares
export const createCastMiddleware = castValidationMiddleware(new CreateCastValidationStrategy())
export const updateCastMiddleware = castValidationMiddleware(new UpdateCastValidationStrategy())
