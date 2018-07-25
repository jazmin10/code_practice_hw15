// ============== GLOBAL VARIABLES ==============
	var express = require("express");
	var bodyParser = require("body-parser");
	var exphbs = require("express-handlebars");
	var methodOverride = require("method-override");
	var db = require("./models/index.js");
	var routes = require("./controllers/burgers_controller.js");

	var PORT = 3000;
	var app = express();

	// Middleware
	app.use(express.static("public"));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.text());
	app.use(bodyParser.json({ type: "application/vnd.api+json"}));

	// Using handlebars as template
	app.engine("handlebars", exphbs({ defaultLayout: "main" }));
	app.set("view engine", "handlebars");

	// Method override
	app.use(methodOverride("_method"));

// ============== MAIN PROCESSES ==============
	db.sequelize.sync().then(function() {
		app.listen(PORT, function() {
			console.log("listening on PORT:", PORT);
		});
	});

	app.use("/", routes);