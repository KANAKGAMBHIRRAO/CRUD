const mongoose = require("mongoose");

const giftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  manufacturing: {
    type: String,
  },
  category: {
    type: String,
    enum: ["return_gift", "soft_toys", "board_game"],
  },
});

const Gift = mongoose.model("Gift", giftSchema);
module.exports = Gift;
