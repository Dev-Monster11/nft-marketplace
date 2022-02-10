const { SchemaTypes } = require("mongoose");

module.exports = mongoose => {
  const schema = mongoose.Schema({
    id: String,
    owner: String,
    mint: String,
    name: String,
    symbol: String,
    uri: String,
    sellerFeeBasisPints: Number,
    creators: Array,
    description: String,
    seller_fee_basis_points: Number,
    image: String,
    external_url: String,
    properties: Object
  }, {
    timestamps: true
  })

  const NFTMetadata = mongoose.model("NFTMetadata", schema);  
  return NFTMetadata;
}