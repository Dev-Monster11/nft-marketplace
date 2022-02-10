const db = require("../models");
const Metadata = db.nftMetadata;

exports.create = async (req, res) => {
  try {
    const response = new Metadata(req.body ?? req);
    return response.save().then((result, err) => {
      if (err) {
        res.status(200).send({ message: "Database error", type: "error" });
      }
      else {
        if (req.body) {
          res.status(200).send({ message: "New metadata added", type: "success", data: result });
        } else {
          const response = { message: "New metadata added", type: "success", data: result };
          return response;
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
}