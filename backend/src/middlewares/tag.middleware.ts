import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

// Interface for strategy validation
interface ValidationStrategy {
  validate(req: Request, res: Response, next: NextFunction): void
}

const baseTagSchema = {
  id: Joi.string().optional().messages({ 'string.base': 'ID must be a string' }),
  name: Joi.string().trim().required().messages({
    'string.empty': 'Tag name cannot be empty',
    'string.min': 'Tag name must be at least 1 character',
  }),
}

//CREATING
class CreateTagValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    ...baseTagSchema,
    name: baseTagSchema.name.required().messages({
      'any.required': 'Tag name is required',
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

export const tagValidationMiddleware = (strategy: ValidationStrategy) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    strategy.validate(req, res, next)
  }
}

// Export
export const createTagMiddleware = tagValidationMiddleware(new CreateTagValidationStrategy())
