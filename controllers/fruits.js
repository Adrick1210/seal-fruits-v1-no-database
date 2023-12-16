// import express
const express = require("express");
// create router
const router = express.Router();
// import fruits data
const fruits = require("../models/fruits.js")

// routes go below here:

// fruits index route
// get request to /fruits
// return all fruits
router.get("/", (req, res) => {
  // res.send(fruits)
  // "index.ejs" => "./views/index.ejs"
  // {fruits} => {fruits:fruits}
  res.render("fruits/index.ejs", { fruits });
});

// New Route - render a page with a form
//get request to /fruit/new
// allow us to have a form to create a new fruit
router.get("/new", (req, res) => {
  // render a template with our form
  // new.ejs => ./views/new.ejs
  res.render("fruits/new.ejs");
});

// Create route - receives form data, creates new fruit
// post request /fruits
// create a fruit from the form data, then redirect back to the index
router.post("/", (req, res) => {
  //get the form data from the request
  const body = req.body;
  //send back the form data as json
  //   res.send(body);
  // convert ready to eat to true or false
  if (body.readyToEat === "on") {
    body.readyToEat = true;
  } else {
    body.readyToEat = false;
  }

  // add fruit to the array
  fruits.push(body);

  // redirect to index page
  res.redirect("/fruits");
});

// Destroy route - deletes a fruit
// delete -> /fruits/:id
// deletes the specific
router.delete("/:id", (req, res) => {
  // get id from params
  const id = req.params.id;
  // then we'll splice it from the array
  // arr.splice(index, numOfItemToCut);
  fruits.splice(id, 1);
  // redirect back to index
  res.redirect("/fruits");
});

// edit route - render a form to edit a specific fruit
// get to /fruits/:id/edit
// render a form with the existing values filled in
router.get("/:id/edit", (req, res) => {
  // get id from params
  const id = req.params.id;
  // get the fruit being updated
  const fruit = fruits[id];
  // send the id and fruit over to the template
  //edit.ejs => ./views/edit.ejs
  res.render("fruits/edit.ejs", { fruit, id });
});

// Update route - receive the form data, updates the fruit
// put to fruits/:id
// update a specified fruit, then redirect to index
router.put("/:id", (req, res) => {
  // get the id
  const id = req.params.id;
  // get the body
  const body = req.body;
  // convert readyToEat to true or false
  if (body.readyToEat === "on") {
    body.readyToEat = true;
  } else {
    body.readyToEat = false;
  }
  // swap old version with new version
  fruits[id] = body;
  // redirect back to index page
  res.redirect("/fruits");
});

// fruits show route
// get request to /fruits/:id
// return a single fruit
router.get("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id;
  // get the fruit from the array
  const fruit = fruits[id];
  // send the fruit as the response
  // res.send(fruit)

  // render the show.ejs template
  // res.render(template, data)
  // for the template assume "/views/"
  // "show.ejs" =>  ./views/show.ejs
  res.render("fruits/show.ejs", { fruit, id });
  // {fruit} is the same as {fruit:fruit}
});

// export the router
module.exports = router;
