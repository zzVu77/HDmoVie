import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

// Interface for strategy validation
interface ValidationStrategy {
  validate(req: Request, res: Response, next: NextFunction): void
}

// Base blog schema
const baseBlogSchema = {
  content: Joi.string().trim().min(1).messages({
    'string.empty': 'Content cannot be empty',
    'string.min': 'Content must be at least 1 character',
  }),
  tags: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required().messages({ 'string.base': 'Tag ID must be a string' }),
        name: Joi.string().optional(),
      }),
    )
    .min(1)
    .messages({
      'array.min': 'At least one tag is required',
    }),
  images: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required().messages({
          'string.uri': 'Image URL must be a valid URL',
          'any.required': 'Image URL is required',
        }),
      }),
    )
    .optional(),
}

// Strategy validation for CREATING blog
class CreateBlogValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    ...baseBlogSchema,
    content: baseBlogSchema.content.required().messages({
      'any.required': 'Content is required',
    }),
    tags: baseBlogSchema.tags.required().messages({
      'any.required': 'Tags are required',
    }),
  })

  validate(req: Request, res: Response, next: NextFunction): void {
    const { error } = this.schema.validate(req.body, { abortEarly: false })
    if (error) {
      const messages = error.details.map((detail) => detail.message)
      res.status(400).json({ status: 'failed', message: messages.join(', ') })
      return
    }
    next()
  }
}

// Strategy validation for UPDATING blog
// class UpdateBlogValidationStrategy implements ValidationStrategy {
//   private schema = Joi.object({
//     ...baseBlogSchema,
//     // All fields are optional for updating
//   })

//   validate(req: Request, res: Response, next: NextFunction): void {
//     const { error } = this.schema.validate(req.body, { abortEarly: false })
//     if (error) {
//       const messages = error.details.map((detail) => detail.message)
//       res.status(400).json({ status: 'failed', message: messages.join(', ') })
//       return
//     }
//     next()
//   }
// }

export const blogValidationMiddleware = (strategy: ValidationStrategy) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    strategy.validate(req, res, next)
  }
}

// Export middlewares
export const createBlogMiddleware = blogValidationMiddleware(new CreateBlogValidationStrategy())
// export const updateBlogMiddleware = blogValidationMiddleware(new UpdateBlogValidationStrategy())
