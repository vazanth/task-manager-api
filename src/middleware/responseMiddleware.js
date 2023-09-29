class SuccessResponse {
  constructor(data, message) {
    this.status = 'success';
    this.data = data;
    this.message = message;
  }
}

class ErrorResponse {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith('4') ? 'failed' : 'error';
  }
}

function responseMiddleware(req, res, next) {
  res.sendSuccess = (data = null, message = 'Success', statusCode) => {
    const response = new SuccessResponse(data, message);
    res.status(statusCode).json(response);
  };

  res.sendError = (message = 'Error', statusCode) => {
    const response = new ErrorResponse(message, statusCode);
    res.status(statusCode).json(response);
  };

  next();
}

module.exports = responseMiddleware;
