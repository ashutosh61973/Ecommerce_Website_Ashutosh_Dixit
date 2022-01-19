const Product = require('../models/productModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');

// ashutosh dixit

//create product
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get all product
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const apiFeature = new ApiFeatures(Product.find(), req.query);

  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      success: true,
      product,
    });
  } catch {
    // if(!product){
    // return res.status(500).json({
    //     success:false,
    //     message:"Product not found"
    // })
    return next(new ErrorHander('product not found', 404));
    // }
  }
});

// Update Product -- admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = Product.findById(req.param.id);
  if (!product) {
    return res.status(500).json({
      succes: false,
      message: 'Product not found',
    });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAandModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});
//delete product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: true,
      message: 'Product not found',
    });
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});
