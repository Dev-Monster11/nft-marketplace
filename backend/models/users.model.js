module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: String,
      // image: {type: String, default: 'https://pbs.twimg.com/profile_images/1393399819213983746/2a8l5muc_400x400.png'}, //@TODO set this via an environment variable
      image: { type: String }, //@TODO set this via an environment variable
      avatar: String,
      published: Boolean,
      background: String,
      walletAddress: String,
      email: { type: String, unique: true },
      roles: { type: [String], default: "user" },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const User = mongoose.model("users", schema);
  return User;
};
