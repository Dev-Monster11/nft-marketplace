const db = require("../models");
const User = db.users;

exports.create = async (req, res) => {
  const { body } = req;
  try {
    // body.name = `User_${body.walletAddress}` // temporary solution for the user

    // let creatData
    // creatData.name = body.name
    // creatData.walletAddress = body.walletAddress
    // creatData.email = body.email

    console.log(body);
    const result = await User.create(body);
    console.log("create result= ", result);
    return res.status(201).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Users.",
    });
  }
};

exports.updateImage = async (req, res) => {
  const { body } = req;
  try {
    const filter = { walletAddress: body.walletAddress };
    const update = { image: body.image };

    const result = await User.findOneAndUpdate(filter, update);
    return res.status(201).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Users.",
    });
  }
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
  const query = req.query;

  try {
    const result = await User.find(query);
    return res.status(200).send({ data: result });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Users.",
    });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.findById(id);
    if (!result) {
      return res.status(400).send({ message: "record not found" });
    }
    return res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Users.",
    });
  }
};

exports.findOneByWalletAddress = async (req, res) => {
  const address = req.params.walletAddress;
  
  try {
    User.findOne({ walletAddress: address }, function (err, obj) {
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
