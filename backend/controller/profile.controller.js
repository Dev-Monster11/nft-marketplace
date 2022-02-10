const Profile = require('../models/profile.model')
exports.create = async (req, res) => {
  const profile = req.body;
  

  try {
    const data = await Profile.create(profile);
    data.save();
    console.log(data);
    return res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating profile.",
    });
  }
};
