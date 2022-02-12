const db = require("../models");
const User = db.users;
const fs = require("fs-extra");

exports.create = async (req, res) => {
  const { body } = req;
  try {
    console.log('create= ', body)

    const exist = await User.findOne({ email: body.email })
    if (!exist) {
      const result = await User.create(body);
      return res.status(201).send(result);
    } else {
      const filter = { email: body.email };
      const update = { name: body.name, walletAddress: body.walletAddress };
  
      const result = await User.findOneAndUpdate(filter, update);
      return res.status(201).send(result);
    }
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
      console.log(obj);
      return res.status(200).send(obj);
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Users.",
    });
  }
};

exports.upload = async (req, res) => {
  const PORT = process.env.PORT || 8080;
  req.pipe(req.busboy);
  req.busboy.on("file", function (fieldname, file, fileInfo) {
    const fileName = Date.now() + '-' + fileInfo.filename
    let fstream = fs.createWriteStream("./public/" + fileName);
    file.pipe(fstream);
    fstream.on("close", function () {
      console.log('upload succeeded!')
      const path = `http://localhost:${PORT}/${fileName}`
      console.log('path = ', path)
      return res.status(200).send({path: path});
    });
  });
};

exports.updateAvatar = async (req, res) => {
  const { body } = req;
  try {
    const filter = { walletAddress: body.walletAddress };
    const update = { avatar: body.avatar };

    const result = await User.findOneAndUpdate(filter, update);
    return res.status(201).send(result);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving Users.",
    });
  }
};
