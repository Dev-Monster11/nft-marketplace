const mongoose = require("mongoose");

var schema = new mongoose.Schema(
  {
    Display_name: String,
    Custom_Url: String,
    Bio: String,
    Twitter_Username: String,
    Personal_site: String,
    Email: String,
    Profile_URL: String,
    Banner_URL: String,
 
    
  },
  { timestamps: true }
);

const Profile = mongoose.model("profile", schema);
module.exports = Profile;
