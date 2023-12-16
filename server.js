// import express
const express = require("express");
//import morgan
const morgan = require("morgan");
//import method override
const methodOverride = require("method-override");
// import fruits router
const fruitsRouter = require("./controllers/fruits.js");

// create our app object
const app = express();

// middleware
app.use(express.static("public")); // use a "public" folder for files
// public/style.css -> /style.css
// public/app.js -> /app.js
// express.urlencoded (prase url encoded bodies)
//add the data to req.body
app.use(express.urlencoded({ extended: true }));
// morgan - log data and each request for debugging
app.use(morgan("dev"));
// method override - allows to override form post requests
// as a different method like put or delete
app.use(methodOverride("_method"));

// register fruits router
app.use("/fruits", fruitsRouter);

// server listener to turn our server
app.listen(3000, () => {
  console.log("listening on port 3000");
});
