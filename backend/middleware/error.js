const ErrorHnadler = require('../utils/errorhander');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'INTERNAL SERVER ERROR';

  //wrong mongo db string
  if (err.name === 'CastError') {
    const message = `Resource not found .INVALID:${err.path}`;
    err = new ErrorHnadler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
