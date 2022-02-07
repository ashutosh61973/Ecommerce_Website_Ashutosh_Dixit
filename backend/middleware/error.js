const ErrorHnadler = require('../utils/errorhander');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'INTERNAL SERVER ERROR';

  //wrong mongo db string
  if (err.name === 'CastError') {
    const message = `Resource not found .INVALID:${err.path}`;
    err = new ErrorHnadler(message, 400);
  }

  //mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${object.keys(err.keyValue)} Entered`;
    err = new ErrorHander(message, 400);
  }

  //WRONG jwt ERRORS
  if (err.name === 'JsonWebTokenError') {
    const messGE = `Json Web Token is invalid,try again`;
    err = new ErrorHander(message, 400);
  }

  //JWT EXPIRE ERROR
  if (err.name == 'TokenExpireedError') {
    const message = `Json Web Token is Expired ,try again`;
    err = new ErrorHander(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
