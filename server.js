var express = require("express");
// var bodyParser = require("body-parser");

var PORT = process.env.PORT || 8090;

var app = express();

// serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application body
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser,urlencoded({ extended: true }));
app.use(express.json());

// set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// import routes and give the server access to them.
var routes = require("./controllers/burgers_controllers.js");

app.use(routes);

// start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
