const express = require('express');
const app=express();

const errorMiddleWare=require("./middleware/error");

app.use(express.json());

//Route import 
const product =require("./routes/productRoute");

app.use("/api/v1",product);

// MIddleware for errors
app.use(errorMiddleWare);



module.exports=app;