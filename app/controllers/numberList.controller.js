const db = require("../models");
const NumberList = db.numberLists;

const getPagination = (page, size) => {
    const limit = size ? +size : 100;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Tutorial
    const numberList = new NumberList({
      name: req.body.name,
      numberList: req.body.numberList
    });
  
    // Save Tutorial in the database
    numberList
      .save(numberList)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the NumberList."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const { page, size, name } = req.query;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);

  NumberList.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        numberLists: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    NumberList.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found NumberList with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving NumberList with id=" + id });
      });
  };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    NumberList.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update NumberList with id=${id}. Maybe NumberList was not found!`
          });
        } else res.send({ message: "NumberList was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating NumberList with id=" + id
        });
      });
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    NumberList.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete NumberList with id=${id}. Maybe NumberList was not found!`
          });
        } else {
          res.send({
            message: "NumberList was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete NumberList with id=" + id
        });
      });
  };
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    NumberList.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} NumberLists were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
};

// Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//     const { page, size } = req.query;
//     const { limit, offset } = getPagination(page, size);
  
//     NumberList.paginate({ published: true }, { offset, limit })
//       .then((data) => {
//         res.send({
//           totalItems: data.totalDocs,
//           tutorials: data.docs,
//           totalPages: data.totalPages,
//           currentPage: data.page - 1,
//         });
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials.",
//         });
//       });
//   };