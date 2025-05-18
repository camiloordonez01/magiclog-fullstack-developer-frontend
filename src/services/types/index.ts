export interface SuccessResponse<T> {
    status: number
    message: 'Success'
    timestamp: Date
    data: T
}

export interface ErrorResponse {
  status: number;
  message: 'Error';
  type: string;
  timestamp: string;
  data: string;
}

export type Response<T> = SuccessResponse<T> | ErrorResponse
