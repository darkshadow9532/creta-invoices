const { deliveryStatuss } = require("../models");
const db = require("../models");
const DeliveryStatus = db.deliveryStatuss;

// Create and Save a new Action
exports.create = (req, res) => {
    // Validate request
    // console.log(req.body);
    if (!req.body.invoiceCode || !req.body.crDeliveryStatus){
        res.status(400).send({message: "Content cannot be empty"});
        return;
    }

    switch (req.body.crDeliveryStatus){
        case 1: {
            var crDeliveryStatusText = "Mới lên đơn";
            break;
        } 
        case 2: {
            var crDeliveryStatusText = "Đã soạn hàng";
            break;
        }
        case 3: {
            var crDeliveryStatusText = "Đã đóng hàng";
            break;
        }
        case 4: {
            var crDeliveryStatusText = "Đã giao hàng";
            break;
        }
        case 5: {
            var crDeliveryStatusText = "Khách đã nhận";
            break;
        }
        default: {
            var crDeliveryStatusText = "Mới lên đơn";
            break;
        }
    }

    const deliveryStatus = new DeliveryStatus({
        invoiceCode: req.body.invoiceCode,
        crDeliveryStatus: req.body.crDeliveryStatus,
        crDeliveryStatusText: crDeliveryStatusText
    });

    deliveryStatus
        .save(deliveryStatus)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Action."
            });
        });
}

// Find deliveryStatus by Attributes

exports.findByAttributes = (req, res) => {
    const invoiceCode = req.query.invoiceCode;
    
    var condition = invoiceCode ? { invoiceCode : invoiceCode } : {};
      
    DeliveryStatus.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving delivertyStatus."
        });
      });
  };

// Find a single dStatus with an id

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    DeliveryStatus.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Action with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Action with id=" + id });
      });
  };

// Update a dStatus by the id in the request

exports.update = (req, res) => {
  if (!req.body){
    res.status(400).send({message: "Content cannot be empty"});
    return;
  }

  switch (req.body.crDeliveryStatus){
    case 1: {
        var crDeliveryStatusText = "Mới lên đơn";
        break;
    } 
    case 2: {
        var crDeliveryStatusText = "Đã soạn hàng";
        break;
    }
    case 3: {
        var crDeliveryStatusText = "Đã đóng hàng";
        break;
    }
    case 4: {
        var crDeliveryStatusText = "Đã giao hàng";
        break;
    }
    case 5: {
        var crDeliveryStatusText = "Khách đã nhận";
        break;
    }
    default: {
        var crDeliveryStatusText = "Mới lên đơn";
        break;
    }
  }

    const id = req.params.id;
    
    req.body.crDeliveryStatusText = crDeliveryStatusText;

    DeliveryStatus.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Action with id=${id}. Maybe Action was not found!`
          });
        } else res.send({ message: "Action was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Action with id=" + id
        });
      });
  };

// Delete a Action with the specified id in the request

exports.delete = (req, res) => {
    const id = req.params.id;
  
    DeliveryStatus.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Action with id=${id}. Maybe Action was not found!`
          });
        } else {
          res.send({
            message: "Action was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Action with id=" + id
        });
      });
  };


exports.deleteAll = (req, res) => {
    DeliveryStatus.deleteMany({})
    .then(data => {
    res.send({
        message: `${data.deletedCount} Actions were deleted successfully!`
    });
    })
    .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while removing all actions."
    });
    });
};
// Delete all Actions from the database.
