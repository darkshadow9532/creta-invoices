module.exports = app => {
    const numberLists = require("../controllers/numberList.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", numberLists.create);
  
    // Retrieve all Tutorials
    router.get("/", numberLists.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", numberLists.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", numberLists.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", numberLists.delete);
  
    // Create a new Tutorial
    router.delete("/", numberLists.deleteAll);
  
    app.use('/api/numberLists', router);
  };