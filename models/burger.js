// import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  all: function(cb) {
    orm.all("burgers", function(res) {
      cb(res);
    });
  },
  // variables cols and vals are arrays.
  create: function(name, cb) {
    orm.create("burgers", ["burger_name"],
    [name], cb); 
   
  },
  update: function(objColVals, cb) {
    orm.update("burgers", objColVals, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = burger;
