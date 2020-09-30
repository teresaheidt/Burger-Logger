var express = require("express");

var router = express.Router();

// import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  burger.all(function (data) {
    console.log("GET from db:", data)
      var hbsObject = {
          burger: data
      };
      res.render("index", { burger: hbsObject });
   console.log(hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create([
    "burger_name"
  ], [
    req.body.burger_name, 
  ], function(result) {
    // send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    name: req.body.burger_name
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // if no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Delete burger from db.
router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  
  console.log("condition", condition);

  burger.delete(condition, function(result) {
      if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404.
          return res.status(404).end();
      } else {
          res.status(200).end();
      }
  });
});

// export routes for server.js to use.
module.exports = router;
