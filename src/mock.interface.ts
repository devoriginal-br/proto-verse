export type MockRequestType =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'all';

export interface MockRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'ALL';
  response: {
    code: number;
    body: any;
  };
}

export interface Mock {
  [key: string]: MockRequest;
}
