export interface Body {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const errorCode = {
  NOT_FOUND: 'NOT_FOUND',
  INVALID: 'INVALID',
  CONNECTION: 'CONNECTION',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};
