const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');

//Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'this  is sample Id',
      url: 'profilepicUrl',
    },
  });
  sendToken(user, 201, res);
  // const token = user.getJWTToken();

  // res.status(201).json({
  //   success: true,
  //   token,
  // });
});

//login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHander('Please Enter password or email', 401));
  }
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHander('invalid email or password', 401));
  }

  const isPasswordMatched = user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander('invalid email  password'));
  }
  sendToken(user, 201, res);
  // const token = user.getJWTToken();
  // res.status(201).json({
  //   success: true,
  //   token,
  // });
});
