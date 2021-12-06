module.exports = app => {
    const deliveryStatuss = require("../controllers/deliveryStatus.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", deliveryStatuss.create);
  
    // Retrieve all Tutorials
    router.get("/", deliveryStatuss.findByAttributes);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", deliveryStatuss.findOne);

    // Update a Tutorial with id
    router.put("/:id", deliveryStatuss.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", deliveryStatuss.delete);
  
    // Create a new Tutorial
    router.delete("/", deliveryStatuss.deleteAll);
  
    app.use('/api/deliveryStatuss', router);
  };