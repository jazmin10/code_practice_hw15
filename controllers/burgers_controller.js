// ============== GLOBAL VARIABLES ==============
	var express = require("express");
	var db = require("../models");

	var Burger = db.burger;
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
		
		Burger.findAll().then(function(results) {
			response.render("index", {burgers: results});
		});
	}

	function addBurger(request, response) {

		var newBurger = {
			burger_name: request.body.burgerName
		};

		Burger.create(newBurger).then(function() {
			response.redirect("/");
		});
	}

	function devourBurger(response, id) {

		var values = {
			devoured: true
		};

		var condition = {
			where: {
				id: parseInt(id)
			}
		};

		Burger.update(values, condition).then(function() {
			response.redirect("/");
		});
	}