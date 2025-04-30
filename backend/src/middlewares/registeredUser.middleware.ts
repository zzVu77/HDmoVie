import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

const registeredUserSchema = Joi.object({
  email: Joi.string().trim().required().messages({
    'string.empty': 'Email is required and cannot be empty',
    'any.required': 'Email is required',
  }),
  password: Joi.string().trim().required().messages({
    'string.empty': 'Password is required and cannot be empty',
    'any.required': 'Password is required',
  }),
  repassword: Joi.string().trim().required().valid(Joi.ref('password')).messages({
    'any.only': 'Repassword must match Password',
    'string.empty': 'Repassword is required and cannot be empty',
    'any.required': 'Repassword is required',
  }),
  fullName: Joi.string().trim().required().messages({
    'string.empty': 'Fullname is required and cannot be empty',
    'any.required': 'Fullname is required',
  }),
  dateOfBirth: Joi.string().isoDate().required().messages({
    'string.isoDate': 'Date of Birth  must be a valid date (ISO format)',
    'any.required': 'Release year is required',
  }),
})

export const registeredUserMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = registeredUserSchema.validate(req.body, { abortEarly: false })
  if (error) {
    const messages = error.details.map((detail) => detail.message)
    res.status(400).json({ message: messages.join(', ') })
    return
  }
  next()
}
