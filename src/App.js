const express= require("express");

const app=express();
const cors = require("cors")
const fileupload = require('express-fileupload');

// require ("dotenv").config();
// const cloudinary = require ("cloudinary").v2;
// if (typeof (process.env.CLOUDINARY_URL) === 'undefined') {
//     console.warn('!! cloudinary config is undefined !!');
//     console.warn('export CLOUDINARY_URL or set dotenv file');
//   } else {
//     // console.log('cloudinary config:');
//     // console.log(cloudinary.config());
//   }
  console.log('-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --');
  app.use(fileupload({
    useTempFiles:true
}))
  app.use(cors({
    origin:"*"
}))
// app.use(formidable());
const datarouter=require("./routes");
app.use("/posts",datarouter)
module.exports=app;
