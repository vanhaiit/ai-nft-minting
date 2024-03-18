export interface APIErrorResponse<T = any> {
  status: number;
  data: {
    code: number;
    data: T;
    message: string;
  };
}

export interface APIResponse<T, M = APIMetadata> {
  code: number;
  data: T | null;
  message: string;
  metadata?: M;
}

export interface APIMetadata {
  currentPageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  page: string;
  total: number;
  totalCurrentPage: number;
}
