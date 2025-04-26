import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const movieSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.empty': 'Title is required and cannot be empty',
    'any.required': 'Title is required',
  }),
  description: Joi.string().trim().required().messages({
    'string.empty': 'Description is required and cannot be empty',
    'any.required': 'Description is required',
  }),
  releaseYear: Joi.string().isoDate().required().messages({
    'string.isoDate': 'Release year must be a valid date (ISO format)',
    'any.required': 'Release year is required',
  }),
  trailerSource: Joi.string().uri().optional().allow('').messages({
    'string.uri': 'Trailer source must be a valid URL',
  }),
  posterSource: Joi.string().uri().required().messages({
    'string.uri': 'Poster source must be a valid URL',
    'any.required': 'Poster source is required',
  }),
  backdropSource: Joi.string().uri().required().messages({
    'string.uri': 'Backdrop source must be a valid URL',
    'any.required': 'Backdrop source is required',
  }),
  voteAvg: Joi.number().min(0).max(10).required().messages({
    'number.min': 'Vote average must be at least 0',
    'number.max': 'Vote average must not exceed 10',
    'any.required': 'Vote average is required',
  }),
  voteCount: Joi.number().min(0).required().messages({
    'number.min': 'Vote count must be non-negative',
    'any.required': 'Vote count is required',
  }),
  genres: Joi.array()
    .items(Joi.object({ id: Joi.string().required(), name: Joi.string().required() }))
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one genre is required',
      'any.required': 'Genres are required',
    }),
  casts: Joi.array()
    .items(Joi.object({ id: Joi.string().required(), name: Joi.string().required() }))
    .min(1)
    .required()
    .messages({
      'array.min': 'At least one cast member is required',
      'any.required': 'Casts are required',
    }),
})

export const movieMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = movieSchema.validate(req.body, { abortEarly: false })
  if (error) {
    const messages = error.details.map((detail) => detail.message)
    res.status(400).json({ message: messages.join(', ') })
    return
  }
  next()
}
