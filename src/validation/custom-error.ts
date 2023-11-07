export class DBError extends Error {
  code: string;
  constructor(message: string, code: string) {
    super(message);
    this.name = 'DBError';
    this.code = code;
  }
}
