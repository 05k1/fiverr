export interface Pagination {
  total: number;
  page: number;
  pageSize: number;
}

export interface ParamsGetList {
  pageIndex?: number;
  pageSize?: number;
  keyword?: string;
}

export interface JwtRequest extends Request {
  user: {
    data: {
      userId: number;
    };
    iat: number;
    exp: number;
  };
}
