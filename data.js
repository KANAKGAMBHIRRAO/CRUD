const mongoose = require("mongoose");
const Gift = require("./model/gift");

mongoose
  .connect("mongodb://127.0.0.1:27017/Sanika")
  .then(() => {
    console.log("Connected to the mongoose");
  })
  .catch((err) => {
    console.log("Connection Error!!!");
  });

const p = new Gift({
  name: "5-fun",
  price: 35,
  manufacturing: "Sanika",
  category: "return_gift",
});
p.save()
  .then((p) => {
    console.log(p);
  })
  .catch("Error");
