const app = require('./app.js');

const dotenv = require('dotenv');

const connectDatabase = require('./config/database');
//handling UNCAUGHT EXCEPTION
process.on('uncaughtException', (err) => {
  console.log(`Error:${err.message}`);
  console.log('Shutting down the server due to Uncaught Exception');
  process.exit(1);
});

//config
dotenv.config({ path: 'backend/config/config.env' });

//connecting to dataBase
connectDatabase();

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
