import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const genreSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Genre Name is required and cannot be empty',
    'any.required': 'Genre Name is required',
  }),
})

export const genreMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = genreSchema.validate(req.body, { abortEarly: false })
  if (error) {
    const messages = error.details.map((detail) => detail.message)
    res.status(400).json({ message: messages.join(', ') })
    return
  }
  next()
}
