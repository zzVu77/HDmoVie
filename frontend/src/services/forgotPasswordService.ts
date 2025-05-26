import { apiPost } from '@/utils/axiosConfig'

interface ForgotPasswordResponse {
  success: boolean
  message?: string
  errorMessage?: string
  validTime?: number
}

interface VerifyOtpResponse {
  success: boolean
  message?: string
  errorMessage?: string
}

interface ResetPasswordResponse {
  success: boolean
  message?: string
  errorMessage?: string
}

export const ForgotPasswordService = {
  /**
   * Send OTP to user's email
   */
  sendOtp: (email: string) => {
    return apiPost<ForgotPasswordResponse>('/registeredUser/forgot-password', { email })
  },

  /**
   * Verify OTP code
   */
  verifyOtp: (email: string, otp: string) => {
    return apiPost<VerifyOtpResponse>('/registeredUser/verify-otp', { email, otp })
  },

  /**
   * Reset password with verified OTP
   */
  resetPassword: (email: string, otp: string, newPassword: string) => {
    return apiPost<ResetPasswordResponse>('/registeredUser/reset-password', {
      email,
      otp,
      password: newPassword,
    })
  },
}

export default ForgotPasswordService
