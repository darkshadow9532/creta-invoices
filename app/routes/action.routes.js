module.exports = app => {
    const actions = require("../controllers/action.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", actions.create);
  
    // Retrieve all Tutorials
    router.get("/", actions.findByAttributes);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", actions.findOne);

    // Update a Tutorial with id
    router.put("/:id", actions.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", actions.delete);
  
    // Create a new Tutorial
    router.delete("/", actions.deleteAll);
  
    app.use('/api/actions', router);
  };