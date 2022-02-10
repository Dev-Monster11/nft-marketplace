const Profile = require("../models/profile.model");
exports.create = async (req, res) => {
  const profile = req.body;
  let user = await Profile.findOne({ publicKey: profile.publicKey });
  if (!user) {
    try {
      console.log("create");
      const data = await Profile.create(profile);
      data.save();
      console.log(data);
      return res.status(200).send(data);
    } catch (error) {
      res.status(500).send({
        message: error.message || "Some error occurred while updating profile.",
      });
    }
  } else {
    console.log("update");
    const data = Profile.findOneAndUpdate(
      { publicKey: profile.publicKey },
      profile,
      {new : true},
      (err, doc, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(doc);
        }
      }
    );
  }
};
