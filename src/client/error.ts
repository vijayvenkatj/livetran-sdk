export class SDKError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500,) {
    super(message);
    this.name = "SDKError";
    this.statusCode = statusCode;
  }
}
