export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string; 
  gender: string;
  phone: string;
}

export interface AuthResponse {
  success?: boolean;
  status?: string;
  message: string;
  token?: string;
  user?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface VerifyCodeRequest {
  resetCode: string;
}

export interface ResendCodeRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}
