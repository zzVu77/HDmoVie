import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

// Interface for strategy validation
interface ValidationStrategy {
  validate(req: Request, res: Response, next: NextFunction): void
}

// base schemaa
const baseMovieSchema = {
  id: Joi.string().optional().messages({ 'string.base': 'ID must be a string' }),
  title: Joi.string().trim().min(1).messages({
    'string.empty': 'Title cannot be empty',
    'string.min': 'Title must be at least 1 character',
  }),
  description: Joi.string().trim().min(1).messages({
    'string.empty': 'Description cannot be empty',
    'string.min': 'Description must be at least 1 character',
  }),
  releaseYear: Joi.string().isoDate().messages({
    'string.isoDate': 'Release year must be a valid date (ISO format)',
  }),
  trailerSource: Joi.string().uri().allow('').messages({
    'string.uri': 'Trailer source must be a valid URL',
  }),
  posterSource: Joi.string().uri().min(1).messages({
    'string.uri': 'Poster source must be a valid URL',
    'string.min': 'Poster source cannot be empty',
  }),
  backdropSource: Joi.string().uri().min(1).messages({
    'string.uri': 'Backdrop source must be a valid URL',
    'string.min': 'Backdrop source cannot be empty',
  }),
  voteAvg: Joi.number().min(0).max(10).messages({
    'number.min': 'Vote average must be at least 0',
    'number.max': 'Vote average must not exceed 10',
  }),
  voteCount: Joi.number().integer().min(0).messages({
    'number.min': 'Vote count must be non-negative',
  }),
  genres: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required().messages({ 'string.base': 'Genre ID must be a string' }),
        name: Joi.string().optional(),
      }),
    )
    .min(1)
    .messages({
      'array.min': 'At least one genre is required',
    }),
  casts: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().required().messages({ 'string.base': 'Cast ID must be a string' }),
        name: Joi.string().optional(),
        profilePath: Joi.string().uri().optional().allow('').messages({
          'string.uri': 'Profile path must be a valid URL',
        }),
      }),
    )
    .min(1)
    .messages({
      'array.min': 'At least one cast member is required',
    }),
}

//Strategy validation for CREATING
class CreateMovieValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    ...baseMovieSchema,
    title: baseMovieSchema.title.required().messages({
      'any.required': 'Title is required',
    }),
    description: baseMovieSchema.description.required().messages({
      'any.required': 'Description is required',
    }),
    releaseYear: baseMovieSchema.releaseYear.required().messages({
      'any.required': 'Release year is required',
    }),
    posterSource: baseMovieSchema.posterSource.required().messages({
      'any.required': 'Poster source is required',
    }),
    backdropSource: baseMovieSchema.backdropSource.required().messages({
      'any.required': 'Backdrop source is required',
    }),
    voteAvg: baseMovieSchema.voteAvg.required().messages({
      'any.required': 'Vote average is required',
    }),
    voteCount: baseMovieSchema.voteCount.required().messages({
      'any.required': 'Vote count is required',
    }),
    genres: baseMovieSchema.genres.required().messages({
      'any.required': 'Genres are required',
    }),
    casts: baseMovieSchema.casts.required().messages({
      'any.required': 'Casts are required',
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
class UpdateMovieValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    ...baseMovieSchema,
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

export const movieValidationMiddleware = (strategy: ValidationStrategy) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    strategy.validate(req, res, next)
  }
}

// Export  middlewares
export const createMovieMiddleware = movieValidationMiddleware(new CreateMovieValidationStrategy())
export const updateMovieMiddleware = movieValidationMiddleware(new UpdateMovieValidationStrategy())
