import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

// Interface for strategy validation
interface ValidationStrategy {
  validate(req: Request, res: Response, next: NextFunction): void
}
const baseUserSchema = {
  id: Joi.string().optional().messages({ 'string.base': 'ID must be a string' }),
  email: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Email is required and cannot be empty',
    'string.min': 'Email is required',
  }),
  password: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Password is required and cannot be empty',
    'string.min': 'Password is required',
  }),
  repassword: Joi.string().trim().min(1).required().valid(Joi.ref('password')).messages({
    'any.only': 'Repassword must match Password',
    'string.min': 'Repassword is required and cannot be empty',
  }),
  fullName: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Fullname is required and cannot be empty',
    'string.min': 'Fullname is required',
  }),
  dateOfBirth: Joi.string().isoDate().required().messages({
    'string.isoDate': 'Date of Birth  must be a valid date (ISO format)',
    'any.required': 'Date of Birth  is required',
  }),
}

//Strategy validation for CREATING
class LoginUserValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    email: baseUserSchema.email.required().messages({
      'any.required': 'Email is required',
    }),
    password: baseUserSchema.password.required().messages({
      'any.required': 'Password is required',
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

//Strategy validation for CREATING
class RegisterUserValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    ...baseUserSchema,
    email: baseUserSchema.email.required().messages({
      'any.required': 'Email is required',
    }),
    password: baseUserSchema.email.required().messages({
      'any.required': 'Password is required',
    }),
    repassword: baseUserSchema.repassword.required().valid(Joi.ref('password')).messages({
      'any.only': 'Repassword must match Password',
      'string.empty': 'Repassword is required and cannot be empty',
      'any.required': 'Repassword is required',
    }),
    fullName: baseUserSchema.fullName.required().messages({
      'string.empty': 'Fullname is required and cannot be empty',
      'any.required': 'Fullname is required',
    }),
    dateOfBirth: baseUserSchema.dateOfBirth.isoDate().required().messages({
      'string.isoDate': 'Date of Birth  must be a valid date (ISO format)',
      'any.required': 'Release year is required',
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

class UpdateUserInfoValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    fullName: baseUserSchema.fullName.required().messages({
      'any.required': 'Fullname is required',
    }),
    dateOfBirth: baseUserSchema.dateOfBirth.required().messages({
      'any.required': 'Date of Birth is required',
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

export const userValidationMiddleware = (strategy: ValidationStrategy) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    strategy.validate(req, res, next)
  }
}

class ChangePasswordValidationStrategy implements ValidationStrategy {
  private schema = Joi.object({
    oldPassword: Joi.string().trim().min(1).required().messages({
      'string.empty': 'Old password is required',
      'any.required': 'Old password is required',
    }),
    newPassword: Joi.string().trim().min(8).required().messages({
      'string.min': 'New password must be at least 8 characters',
      'any.required': 'New password is required',
    }),
    repassword: Joi.string().trim().required().valid(Joi.ref('newPassword')).messages({
      'any.only': 'Passwords do not match',
      'any.required': 'Repassword is required',
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

// Export  middlewares
export const loginUserMiddleware = userValidationMiddleware(new LoginUserValidationStrategy())
export const registerUserMiddleware = userValidationMiddleware(new RegisterUserValidationStrategy())
export const updateUserInfoMiddleware = userValidationMiddleware(new UpdateUserInfoValidationStrategy())
export const changePasswordMiddleware = userValidationMiddleware(new ChangePasswordValidationStrategy())
