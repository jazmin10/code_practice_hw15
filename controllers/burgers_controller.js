// ============== GLOBAL VARIABLES ==============
	var express = require("express");
	var burger = require("../models/burger.js");

	var router = express.Router();

// ============== MAIN PROCESSES ==============

	// Add the following methods to the router object:

	// Display list of burgers
	router.get("/", function(allReq, allResp) {
		displayBurgers(allResp);
	});

	// Add a new burger
	router.post("/", function(newReq, newResp) {
		addBurger(newReq, newResp);
	});

	// "Devour" a burger
	router.put("/:id", function(updtReq, updtResp) {
		devourBurger(updtResp, updtReq.params.id);
	});
	module.exports = router;

// ============== FUNCTIONS ==============

	function displayBurgers(response) {
		
		// Grab all the burgers saved in the database and then...
		burger.selectAll(function(results) {

			// render the burgers to the page
			response.render("index", {burgers: results});
		});
	}

	function addBurger(request, response) {

		// Insert the new burger to the table and then...
		burger.insertOne(request.body.burgerName, function() {

			// Redirect the page to re-display the list of burgers
			response.redirect("/");
		});
	}

	function devourBurger(response, id) {

		// When a burger is devoured, change the devoured value of the burger
		// to true in the database and then...
		burger.updateOne(true, parseInt(id), function() {

			// Redirect the page to re-display the list of burgers
			response.redirect("/");
		});
	}