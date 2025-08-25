export interface ErrorData {
  title?: string;
  message?: string;
  response?: {
    status?: number;
    data?: {
      title?: string;
      message?: string;
    };
  };
}

export interface SuccessData {
  title?: string;
  message?: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface ChangePasswordVariables {
  currentPassword: string;
  newPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  title: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    fullName: string;
    [key: string]: unknown;
  };
}
export interface PlayerRegistrationData {
  fullName: string;
  email: string;
  contactNumber: string;
  category: string;
  image: string;
}

export interface PaginationData {
  current: number;
  pageSize: number;
  total: number;
}

export interface PlayerType {
  _id: string;
  fullName: string;
  SN: string;
  createdAt: string;
  category: string;
  basePrice: number;
  image: string;
}

export interface TeamType {
  _id: string;
  fullName: string;
  email: string;
  contact: string;
  image: string;

  //more data
}

export interface TeamRequest {
  fullName: string;
  email: string;
  contact: string;
  image: string;
}
export interface TeamUpdateRequest {
  fullName: string;
  contact: string;
  image: string;
}
