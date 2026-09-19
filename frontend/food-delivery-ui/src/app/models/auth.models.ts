export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  email: string;
  message: string;
  token: string;
}

export interface JwtPayload {
  sub: string;
  role: string;
  iat: number;
  exp: number;
}