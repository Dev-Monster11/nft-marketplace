const db = require("../models");
const Registeration = db.registeration;

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
  const query = req.query;

  try {
    const result = await Registeration.find(query);
    return res.status(200).send({ data: result });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Users.",
    });
  }
};

exports.findOne = async (req, res) => {
  const email = req.params.email;
  
  console.log('registeration email = ', email)  
  try {
    Registeration.findOne({ email: email }, function (err, obj) {
      if (err) {
        return res.status(400).send({ message: "something went wrong" });
      }
      console.log(obj)
      return res.status(200).send(obj);
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Users.",
    });
  }
};
