const app = require('./app.js');
const cloudinary = require('cloudinary');
// const dotenv = require('dotenv');

const connectDatabase = require('./config/database');

// Handling Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: 'backend/config/config.env' });
}

//connecting to dataBase
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`SERVER IS WORKING ON http://localhost:${process.env.PORT}`);
});

//unhandle promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error:${err.message}`);
  console.log('Shutting down the server due to Unhandled Promise Rejection');
  server.close(() => {
    process.exit(1);
  });
});
