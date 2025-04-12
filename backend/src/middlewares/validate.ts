import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

// Schema validate cho user
const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

// Schema validate cho admin (có thể tùy chỉnh nếu khác)
const adminSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

// Hàm middleware chung để validate
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.details.map((detail) => detail.message),
      })
    }
    next()
  }
}

// Middleware cụ thể cho user
export const validateUser = validate(userSchema)

// Middleware cụ thể cho admin
export const validateAdmin = validate(adminSchema)
